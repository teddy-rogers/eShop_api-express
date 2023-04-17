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
