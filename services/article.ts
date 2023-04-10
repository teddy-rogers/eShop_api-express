import { PrismaClient } from '@prisma/database';
import { ArticleFields } from '../types';
import { articleResponse } from './response';

export class ArticleService {
  private db = new PrismaClient();

  async findManyArticlesById(articlesId: string[]) {
    try {
      return await this.db.article.findMany({
        where: { id: { in: [...articlesId] } },
        select: articleResponse,
      });
    } catch (error) {
      throw error;
    }
  }

  async findManyArticlesByUserId(userId: string) {
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

  async createOneArticle(article: ArticleFields) {
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
              select: {
                cart: { select: articleResponse },
              },
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

  async removeOneArticle(userId: string, articleId: string) {
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

  async removeAllArticles(userId: string) {
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

  async updateOneArticle(article: ArticleFields) {
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

  async updateManyArticlesById(articlesId: string[], article: ArticleFields) {
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
