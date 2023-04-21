import { Civility } from '@prisma/database';

export type CreateAddressInputs = {
  civility: Civility;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  zipCode: string;
  country: string;
  email: string;
  prefixPhone: string;
  phone: string;
};

export type CreateAddressFields = CreateAddressInputs;

export type UpdateAddressInputs = CreateAddressInputs & {
  id: string;
};

export type UpdateAddressFields = UpdateAddressInputs;
