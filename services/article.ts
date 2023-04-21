import { PrismaClient } from '@prisma/database';
import { CreateArticleFields, UpdateArticleFields } from '../types';
import { articleResponse } from './response';

export class ArticleService {
  private db = new PrismaClient();

  async findManyById(articlesId: string[]) {
    try {
      return await this.db.article.findMany({
        where: { id: { in: [...articlesId] } },
        select: articleResponse,
      });
    } catch (error) {
      throw error;
    }
  }

  async findManyByUserId(userId: string) {
    try {
      return await this.db.article
        .findMany({
          where: { userId },
          select: articleResponse,
        })
        .then((articles) => {
          return articles.map((article) => {
            return {
              ...article,
              sku: {
                ...article.sku,
                product: {
                  ...article.sku.product,
                  price: article.sku.product.price.toNumber(),
                  sale: article.sku.product.sale.toNumber(),
                },
              },
            };
          });
        });
    } catch (error) {
      throw error;
    }
  }

  async create(article: CreateArticleFields) {
    const { skuId, userId, sale } = article;
    try {
      return await this.db.article
        .create({
          data: {
            sale,
            sku: {
              connect: {
                id: skuId,
              },
            },
            user: {
              connect: {
                id: userId !== null ? userId : undefined,
              },
            },
          },
          select: {
            user: {
              include: { cart: true },
            },
          },
        })
        .then(({ user }) => {
          if (!user?.cart) throw `Something went wrong when adding article.`;
          return user?.cart;
        });
    } catch (error) {
      throw error;
    }
  }

  async delete(userId: string, articleId: string) {
    try {
      return await this.db.user
        .update({
          where: { id: userId },
          data: {
            cart: {
              deleteMany: [{ id: articleId }],
            },
          },
          select: {
            cart: { select: articleResponse },
          },
        })
        .then(({ cart }) => cart);
    } catch (error) {
      throw error;
    }
  }

  async deleteMany(userId: string) {
    try {
      return await this.db.user
        .update({
          where: { id: userId },
          data: {
            cart: {
              deleteMany: {},
            },
          },
          select: {
            cart: { select: articleResponse },
          },
        })
        .then(({ cart }) => cart);
    } catch (error) {
      throw error;
    }
  }

  async update(article: UpdateArticleFields) {
    try {
      return await this.db.article.update({
        where: { id: article.id },
        data: {
          id: article.id,
          userId: article.userId,
          skuId: article.skuId,
          orderId: article.orderId,
          sale: article.sale,
        },
        select: articleResponse,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateMany(articlesId: string[], article: CreateArticleFields) {
    try {
      return await this.db.article.updateMany({
        where: { id: { in: [...articlesId] } },
        data: { ...article },
      });
    } catch (error) {
      throw error;
    }
  }
}
