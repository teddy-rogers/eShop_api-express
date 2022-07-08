import { Article, Civility, Country } from '@prisma/database';

export type LoginInputs = {
  email: string;
  password: string;
};

export type UserInputs = {
  id?: string;
  firstName: string;
  lastName: string;
  storeCountry?: string;
} & LoginInputs;

export type UserFields = UserInputs & {
  storeCountry: Country;
};

export type UserResponse = {
  id: string;
  email: string;
  civility: Civility;
  firstName: string;
  lastName: string;
  storeCountry: Country;
  cart: Article[];
};
