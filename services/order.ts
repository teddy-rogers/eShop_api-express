import { PrismaClient } from '@prisma/database';
import { OrderFields } from '../types';
import { orderResponse, partialOrderResponse } from './response';

export class OrderService {
  private db = new PrismaClient();

  async findManyOrdersByUserId(userId: string) {
    try {
      return await this.db.order.findMany({
        where: { userId },
        select: partialOrderResponse,
      });
    } catch (error) {
      throw error;
    }
  }

  async findOrderById(id: string) {
    try {
      return await this.db.order
        .findFirst({
          where: { id },
          select: orderResponse,
        })
        .then((order) => {
          if (!order) throw `Unable to find order ${id}`;
          return order;
        });
    } catch (error) {
      throw error;
    }
  }

  async createOrder(order: OrderFields) {
    try {
      return await this.db.order
        .create({
          data: { ...order },
          select: orderResponse,
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
