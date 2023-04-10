import { SkuResponse } from './Sku';

export type ArticleInputs = {
  skuId: string;
};

export type ArticleFields = {
  id?: string;
  sale?: number;
  orderId?: string;
  userId?: string | null;
} & ArticleInputs;

export type ArticleResponse = {
  id?: string;
  orderId: string | null;
  userId: string | null;
  guestId: string | null;
  skuId: string;
  sku: SkuResponse;
  sale: number;
};
