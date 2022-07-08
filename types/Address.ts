import { Civility } from '@prisma/database';

export type AddressInputs = {
  title: string;
  civility?: Civility;
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

export type AddressFields = {
  id?: string;
} & AddressInputs;

export type AddressResponse = {
  id: string;
  title: string;
  civility: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  zipCode: string;
  country: string;
  email: string;
  prefixPhone: string;
  phone: string;
};
