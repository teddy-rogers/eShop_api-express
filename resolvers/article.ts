import { Article, Country } from '@prisma/database';
import { v4 as createUniqueId } from 'uuid';
import { ArticleService } from '../services/article';
import { CacheService } from '../services/cache';
import { SkuService } from '../services/sku';
import { CacheStore, SessionType } from '../types/Cache';

export class ArticleReslover {
  private articleService = new ArticleService();
  private skuService = new SkuService();
  private cacheService = new CacheService();

  async getAllArticlesFromCart(session: SessionType, lang: Country) {
    const { guestSession, userSession } = session;
    if (guestSession) {
      return await this.cacheService.getList({
        store: CacheStore.cart,
        id: guestSession.guestId,
      });
    }
    if (userSession)
      return await this.articleService.findManyByUserId(
        userSession.userId,
        lang,
      );
  }

  async addToCart(skuId: string, session: SessionType, lang: Country) {
    const { guestSession, userSession } = session;
    if (guestSession) {
      const sku = await this.skuService.findById(skuId, lang);
      const guestCartArticle = {
        id: createUniqueId(),
        guestId: guestSession.guestId,
        userId: null,
        orderId: null,
        skuId: sku.id,
        sku: { ...sku },
        sale: sku.product.sale,
      };
      return await this.cacheService.updateList({
        store: CacheStore.cart,
        id: guestSession.guestId,
        data: guestCartArticle,
      });
    }
    if (userSession) {
      const sku = await this.skuService.findById(skuId, lang);
      return await this.articleService.create(
        {
          id: createUniqueId(),
          skuId,
          userId: userSession.userId,
          sale: sku.product.sale,
        },
        lang,
      );
    }
  }

  async removeFromCart(articleId: string, session: SessionType, lang: Country) {
    const { guestSession, userSession } = session;
    if (guestSession) {
      const articles = await this.cacheService.getList({
        store: CacheStore.cart,
        id: guestSession.guestId,
      });
      return await this.cacheService.deleteList({
        store: CacheStore.cart,
        id: guestSession.guestId,
        data: articles.find((x) => x.id === articleId),
      });
    }
    if (userSession) {
      return await this.articleService.delete(
        userSession.userId,
        articleId,
        lang,
      );
    }
  }

  async resetCart(session: SessionType, lang: Country) {
    const { guestSession, userSession } = session;
    if (guestSession) {
      await this.cacheService.delete({
        store: CacheStore.cart,
        id: guestSession.guestId,
      });
      return await this.cacheService.getList({
        store: CacheStore.cart,
        id: guestSession.guestId,
      });
    }
    if (userSession) {
      return await this.articleService.deleteMany(userSession.userId, lang);
    }
  }

  async transferGuestCartToUserCart(
    userId: string,
    guestCart: any,
    lang: Country,
  ) {
    let userCart: Article[] = [];
    for (let i = 0; i < guestCart.length; i++) {
      const updatedArticles = await this.articleService.create(
        {
          userId,
          id: guestCart[i].id,
          skuId: guestCart[i].skuId,
          sale: guestCart[i].sale,
        },
        lang,
      );
      userCart = updatedArticles;
    }
    return userCart;
  }
}
