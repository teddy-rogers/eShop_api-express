import { Article, Product, Sku } from '@prisma/database';

export class OrderHelper {
  getTotal(articles: GetTotalProps): number {
    return articles.reduce((acc, cur) => {
      const price = cur.sku?.product.price || 0;
      const sale = cur.sku?.product.sale;
      const actualPrice = sale
        ? Number(price) - Number(price) * Number(sale)
        : Number(price);
      return acc + actualPrice;
    }, 0);
  }
}

type GetTotalProps = Partial<
  Article & {
    sku: Sku & {
      product: Partial<
        Omit<Product, 'price' | 'sale'> & { price: number; sale: number }
      >;
    };
  }
>[];
