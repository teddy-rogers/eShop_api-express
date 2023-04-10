import { Gender, Size } from '@prisma/database';

export type SkuResponse = {
  id: string;
  ref: string;
  size: Size;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    sale: number;
    gender: Gender;
    imageUrl: string;
  };
};
