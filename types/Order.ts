import { OrderStatus } from '@prisma/database';
import { AddressResponse, ArticleResponse } from '../types';

export type OrderInputs = {
  creditCardId: string;
  shippingAddressId: string;
  billingAddressId: string;
};

export type OrderFields = {
  id: string;
  orderNumber: string;
  total: number;
  userId: string;
} & OrderInputs;

export type OrderResponse = {
  id: string;
  orderNumber: string;
  total: number;
  trackingNumber: string;
  createdAt: Date;
  updatedAt: Date;
  status: OrderStatus;
  billingAddress: AddressResponse | null;
  shippingAddress: AddressResponse | null;
  articles: ArticleResponse[];
};
