import {
  addressResponse,
  articleResponse,
  partialArticleResponse
} from '../response';

export const partialOrderResponse = {
  id: true,
  orderNumber: true,
  total: true,
  createdAt: true,
  status: true,
  articles: { select: partialArticleResponse },
};

export const orderResponse = {
  ...partialOrderResponse,
  trackingNumber: true,
  updatedAt: true,
  billingAddress: { select: addressResponse },
  shippingAddress: { select: addressResponse },
  articles: { select: articleResponse },
};
