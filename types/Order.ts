export type OrderInputs = {
  creditCardId: string;
  shippingAddressId: string;
  billingAddressId: string;
};

export type OrderFields = OrderInputs & {
  id: string;
  orderNumber: string;
  total: number;
  userId: string;
};
