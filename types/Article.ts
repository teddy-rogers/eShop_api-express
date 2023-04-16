import { SkuResponse } from './Sku';

export type CreateArticleInputs = {
  skuId: string;
};

export type CreateArticleFields = {
  id: string;
  sale: number;
  userId: string;
} & CreateArticleInputs;

export type UpdateArticleFields = Omit<CreateArticleFields, 'userId'> & {
  orderId: string;
  userId: null;
};

export type ArticleResponse = Omit<CreateArticleFields, 'userId'> & {
  sku: SkuResponse;
  orderId: string | null;
  userId: string | null;
  guestId: string | null;
};
