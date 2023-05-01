import { Country, PrismaClient } from '@prisma/database';
import { Utils } from '../helpers/utils';

export class SkuService {
  private db = new PrismaClient();
  private utils = new Utils();

  async findById(id: string, lang: Country) {
    try {
      return await this.db.sku
        .findFirst({
          where: { id },
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
