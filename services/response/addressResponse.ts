export const partialAddressResponse = {
  id: true,
  title: true,
  address1: true,
  city: true,
  zipCode: true,
};

export const addressResponse = {
  ...partialAddressResponse,
  civility: true,
  firstName: true,
  lastName: true,
  address2: true,
  country: true,
  email: true,
  prefixPhone: true,
  phone: true,
};
