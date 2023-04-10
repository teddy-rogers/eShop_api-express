import { PrismaClient } from '@prisma/database';
import { skuResponse } from './response/skuResponse';

export class SkuService {
  private db = new PrismaClient();

  async findSkuById(id: string) {
    try {
      return await this.db.sku
        .findFirst({
          where: { id },
          select: skuResponse,
        })
        .then((sku) => {
          if (!sku) throw `Unable to find the sku ${id}`;
          return {
            ...sku,
            product: {
              ...sku.product,
              price: sku.product.price.toNumber(),
              sale: sku.product.sale.toNumber(),
            },
          };
        });
    } catch (error) {
      throw error;
    }
  }
}
