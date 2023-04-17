import { Country, PrismaClient } from '@prisma/database';
import { Utils } from '../helpers';
import { CreateArticleFields, UpdateArticleFields } from '../types';

export class ArticleService {
  private db = new PrismaClient();
  private utils = new Utils();

  async findManyById(articlesId: string[], lang: Country) {
    try {
      return await this.db.article.findMany({
        where: { id: { in: [...articlesId] } },
        include: {
          sku: {
            include: {
              product: {
                select: {
                  title: this.utils.selectLanguage(lang),
                  id: true,
                  price: true,
                  sale: true,
                  gender: true,
                  imageUrl: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findManyByUserId(userId: string, lang: Country) {
    try {
      return await this.db.article
        .findMany({
          where: { userId },
          include: {
            sku: {
              include: {
                product: {
                  select: {
                    title: this.utils.selectLanguage(lang),
                    id: true,
                    price: true,
                    sale: true,
                    gender: true,
                    imageUrl: true,
                  },
                },
              },
            },
          },
        })
        .then((articles) => {
          return articles.map((article) => {
            return {
              ...article,
              sku: {
                ...article.sku,
                product: {
                  ...article.sku.product,
                  price: Number(article.sku.product.price),
                  sale: Number(article.sku.product.sale),
                },
              },
            };
          });
        });
    } catch (error) {
      throw error;
    }
  }

  async create(article: CreateArticleFields, lang: Country) {
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
              include: {
                cart: {
                  include: {
                    sku: {
                      include: {
                        product: {
                          select: {
                            title: this.utils.selectLanguage(lang),
                            id: true,
                            price: true,
                            sale: true,
                            gender: true,
                            imageUrl: true,
                          },
                        },
                      },
                    },
                  },
                },
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

  async delete(userId: string, articleId: string, lang: Country) {
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
            cart: {
              include: {
                sku: {
                  include: {
                    product: {
                      select: {
                        title: this.utils.selectLanguage(lang),
                        id: true,
                        price: true,
                        sale: true,
                        gender: true,
                        imageUrl: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })
        .then(({ cart }) => cart);
    } catch (error) {
      throw error;
    }
  }

  async deleteMany(userId: string, lang: Country) {
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
            cart: {
              include: {
                sku: {
                  include: {
                    product: {
                      select: {
                        title: this.utils.selectLanguage(lang),
                        id: true,
                        price: true,
                        sale: true,
                        gender: true,
                        imageUrl: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })
        .then(({ cart }) => cart);
    } catch (error) {
      throw error;
    }
  }

  async update(article: UpdateArticleFields, lang: Country) {
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
        select: {
          user: {
            include: {
              cart: {
                include: {
                  sku: {
                    include: {
                      product: {
                        select: {
                          title: this.utils.selectLanguage(lang),
                          id: true,
                          price: true,
                          sale: true,
                          gender: true,
                          imageUrl: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
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
