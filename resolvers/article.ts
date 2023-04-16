import { Article } from '@prisma/database';
import { v4 as createUniqueId } from 'uuid';
import { ArticleService, CacheService, SkuService } from '../services';
import { ArticleResponse, CacheStore, SessionType } from '../types';

export class ArticleReslover {
  private articleService = new ArticleService();
  private skuService = new SkuService();
  private cacheService = new CacheService();

  async getAllArticlesFromCart(session: SessionType) {
    const { guestSession, userSession } = session;
    if (guestSession) {
      return (await this.cacheService.getList({
        store: CacheStore.cart,
        id: guestSession.guestId,
      })) as ArticleResponse[];
    }
    if (userSession)
      return await this.articleService.findManyByUserId(userSession.userId);
  }

  async addToCart(skuId: string, session: SessionType) {
    const { guestSession, userSession } = session;
    const sku = await this.skuService.findById(skuId);
    if (guestSession) {
      const guestCartArticle: ArticleResponse = {
        id: createUniqueId(),
        guestId: guestSession.guestId,
        userId: null,
        orderId: null,
        skuId: sku.id,
        sku: { ...sku },
        sale: sku.product.sale,
      };
      return (await this.cacheService.updateList({
        store: CacheStore.cart,
        id: guestSession.guestId,
        data: guestCartArticle,
      })) as ArticleResponse[];
    }
    if (userSession) {
      return await this.articleService.create({
        id: createUniqueId(),
        skuId,
        userId: userSession.userId,
        sale: sku.product.sale,
      });
    }
  }

  async removeFromCart(articleId: string, session: SessionType) {
    const { guestSession, userSession } = session;
    if (guestSession) {
      const articles = (await this.cacheService.getList({
        store: CacheStore.cart,
        id: guestSession.guestId,
      })) as ArticleResponse[];
      return (await this.cacheService.deleteList({
        store: CacheStore.cart,
        id: guestSession.guestId,
        data: articles.find((x) => x.id === articleId),
      })) as ArticleResponse[];
    }
    if (userSession) {
      return await this.articleService.delete(userSession.userId, articleId);
    }
  }

  async resetCart(session: SessionType) {
    const { guestSession, userSession } = session;
    if (guestSession) {
      await this.cacheService.delete({
        store: CacheStore.cart,
        id: guestSession.guestId,
      });
      return (await this.cacheService.getList({
        store: CacheStore.cart,
        id: guestSession.guestId,
      })) as ArticleResponse[];
    }
    if (userSession) {
      return await this.articleService.deleteMany(userSession.userId);
    }
  }

  async transferGuestCartToUserCart(
    userId: string,
    guestCart: ArticleResponse[],
  ) {
    let userCart: Article[] = [];
    for (let i = 0; i < guestCart.length; i++) {
      const updatedArticles = await this.articleService.create({
        userId,
        id: guestCart[i].id,
        skuId: guestCart[i].skuId,
        sale: guestCart[i].sale,
      });
      userCart = updatedArticles;
    }
    return userCart;
  }
}
