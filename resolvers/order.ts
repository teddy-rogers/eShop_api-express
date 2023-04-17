import { Country } from '@prisma/database';
import { v4 as createUniqueId } from 'uuid';
import { OrderHelper } from '../helpers';
import { ArticleService, OrderService } from '../services';
import { OrderInputs, SessionType } from '../types';

export class OrderResolver {
  private orderService = new OrderService();
  private articleService = new ArticleService();
  private orderHelper = new OrderHelper();

  async getAllOrders(session: SessionType, lang: Country) {
    if (!session.userSession) throw 'User must be connected first!';
    return await this.orderService.findManyByUserId(
      session.userSession.userId,
      lang,
    );
  }

  async getOneOrder(id: string, session: SessionType, lang: Country) {
    if (!session.userSession) throw 'User must be connected first!';
    return await this.orderService.findById(id, lang);
  }

  async createOneOrder(
    order: OrderInputs,
    session: SessionType,
    lang: Country,
  ) {
    if (!session.userSession) throw 'User must be connected first';
    const userCartArticles = await this.articleService.findManyByUserId(
      session.userSession.userId,
      lang,
    );
    if (!userCartArticles.length) throw "No articles in user's cart";
    const orderResponse = await this.orderService.create({
      ...order,
      id: createUniqueId(),
      orderNumber: createUniqueId().split('-')[0],
      userId: session.userSession.userId,
      total: this.orderHelper.getTotal(userCartArticles),
    });
    const orderArticles = await Promise.all(
      userCartArticles.map(async (article) => {
        return await this.articleService.update(
          {
            id: article.id,
            skuId: article.skuId,
            orderId: orderResponse.id,
            sale: article.sku?.product?.sale!,
            userId: null,
          },
          lang,
        );
      }),
    );
    if (orderArticles.length === userCartArticles.length)
      return await this.orderService.findById(orderResponse.id, lang);
  }
}
