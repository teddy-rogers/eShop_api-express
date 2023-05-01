import { Country, PrismaClient } from '@prisma/database';
import { Utils } from '../helpers/utils';
import { OrderFields } from '../types/Order';

export class OrderService {
  private db = new PrismaClient();
  private utils = new Utils();

  async findManyByUserId(userId: string) {
    try {
      return await this.db.order.findMany({
        where: { userId },
        include: {
          articles: {
            include: {
              sku: {
                include: {
                  product: {
                    select: {
                      imageUrl: true,
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

  async findById(id: string, lang: Country) {
    try {
      return await this.db.order
        .findFirst({
          where: { id },
          include: {
            articles: {
              include: {
                sku: {
                  include: {
                    product: {
                      include: {
                        title: this.utils.selectLanguage(lang),
                      },
                    },
                  },
                },
              },
            },
            billingAddress: true,
            shippingAddress: true,
          },
        })
        .then((order) => {
          if (!order) throw `Unable to find order ${id}`;
          return order;
        });
    } catch (error) {
      throw error;
    }
  }

  async create(order: OrderFields) {
    try {
      return await this.db.order
        .create({
          data: {
            id: order.id,
            orderNumber: order.orderNumber,
            total: order.total,
            userId: order.userId,
            creditCardId: order.creditCardId,
            shippingAddressId: order.shippingAddressId,
            billingAddressId: order.billingAddressId,
          },
        })
        .then((orderRes) => {
          if (!orderRes)
            throw `Something went wrong while creating order ${order.id}`;
          return orderRes;
        });
    } catch (error) {
      throw error;
    }
  }
}
