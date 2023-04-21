export const skuResponse = {
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
};
