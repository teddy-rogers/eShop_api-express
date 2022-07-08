import { v4 as createUniqueId } from 'uuid';
import { ArticleService, CacheService, SkuService } from '../services';
import { ArticleResponse, CacheStoreField, SessionType } from '../types';

export class ArticleReslover {
  private articleService = new ArticleService();
  private skuService = new SkuService();
  private cacheService = new CacheService();

  async getAllArticlesFromCart(session: SessionType) {
    const { guestSession, userSession } = session;
    if (guestSession) {
      return (await this.cacheService.getListFromCache({
        field: CacheStoreField.cart,
        id: guestSession.guestId,
      })) as ArticleResponse[];
    }
    if (userSession)
      return await this.articleService.findManyArticlesByUserId(
        userSession.userId,
      );
  }

  async addToCart(skuId: string, session: SessionType) {
    const { guestSession, userSession } = session;
    const sku = await this.skuService.findSkuById(skuId);
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
      return (await this.cacheService.addToListFromCache({
        field: CacheStoreField.cart,
        id: guestSession.guestId,
        data: guestCartArticle,
      })) as ArticleResponse[];
    }
    if (userSession) {
      return await this.articleService.createOneArticle({
        skuId,
        userId: userSession.userId,
        sale: sku.product.sale,
      });
    }
  }

  async removeFromCart(articleId: string, session: SessionType) {
    const { guestSession, userSession } = session;
    if (guestSession) {
      const articles = (await this.cacheService.getListFromCache({
        field: CacheStoreField.cart,
        id: guestSession.guestId,
      })) as ArticleResponse[];
      return (await this.cacheService.removeFromListFromCache({
        field: CacheStoreField.cart,
        id: guestSession.guestId,
        data: articles.find((x) => x.id === articleId),
      })) as ArticleResponse[];
    }
    if (userSession) {
      return await this.articleService.removeOneArticle(
        userSession.userId,
        articleId,
      );
    }
  }

  async resetCart(session: SessionType) {
    const { guestSession, userSession } = session;
    if (guestSession) {
      await this.cacheService.removeFromCache({
        field: CacheStoreField.cart,
        id: guestSession.guestId,
      });
      return (await this.cacheService.getListFromCache({
        field: CacheStoreField.cart,
        id: guestSession.guestId,
      })) as ArticleResponse[];
    }
    if (userSession) {
      return await this.articleService.removeAllArticles(userSession.userId);
    }
  }

  async transferGuestCartToUserCart(
    userId: string,
    guestCart: ArticleResponse[],
  ) {
    guestCart.forEach(async (article) => {
      return await this.articleService.createOneArticle({
        userId,
        skuId: article.skuId,
      });
    });
    return;
  }
}
