import { Gender, Size, Text } from '@prisma/database';

export type SkuResponse = {
  id: string;
  ref: string;
  size: Size;
  quantity: number;
  product: {
    id: string;
    title: Text;
    price: number;
    sale: number;
    gender: Gender;
    imageUrl: string;
  };
};
