export const partialProductResponse = {
  id: true,
  name: true,
  price: true,
  sale: true,
  gender: true,
  imageUrl: true,
  backgroundColor: true,
};

export const productResponse = {
  ...partialProductResponse,
  description: true,
  skus: {
    select: {
      id: true,
      ref: true,
      size: true,
      quantity: true,
    },
  },
};

export const createProductResponse = {
  ...partialProductResponse,
  description: true,
  isVisible: true,
  category: true,
  color: true,
  season: true,
  keywords: true,
  skus: {
    select: {
      id: true,
      ref: true,
      quantity: true,
      productId: true,
      size: true,
    },
  },
};
