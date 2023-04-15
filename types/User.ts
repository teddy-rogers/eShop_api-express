import { Article, Civility, Country } from '@prisma/database';

export type LoginInputs = {
  email: string;
  password: string;
};

export type UserInputs = LoginInputs & {
  firstName: string;
  lastName: string;
  storeCountry: string;
};

export type UserFields = Omit<UserInputs, 'storeCountry'> & {
  id: string;
  storeCountry: Country;
};

export type UserResponse = Omit<UserFields, 'password'> & {
  civility: Civility;
  cart: Article[];
};
