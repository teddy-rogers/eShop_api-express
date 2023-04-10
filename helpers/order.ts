import { ArticleResponse } from '../types';

export class OrderHelper {
  getOrderTotal(articles: ArticleResponse[]): number {
    return articles.reduce((acc, cur) => {
      const price = cur.sku.product.price || 0;
      const sale = cur.sku.product.sale;
      const actualPrice = sale ? price - price * sale : price;
      return acc + actualPrice;
    }, 0);
  }
}
