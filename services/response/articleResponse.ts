export const partialArticleResponse = {
  id: true,
  orderId: true,
  userId: true,
  guestId: true,
  skuId: true,
  sku: {
    select: {
      product: true,
      id: true,
      ref: true,
      size: true,
      quantity: true,
    },
  },
  sale: true,
};

export const articleResponse = {
  ...partialArticleResponse,
  sku: {
    select: {
      id: true,
      ref: true,
      size: true,
      quantity: true,
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          sale: true,
          gender: true,
          imageUrl: true,
        },
      },
    },
  },
};
