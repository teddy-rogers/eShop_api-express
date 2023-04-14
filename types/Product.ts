import { Category, Color, Gender, Season } from '@prisma/database';
import { UploadedFile } from 'express-fileupload';

export type Filters = {
  price?: number;
  sale?: number;
  color?: string;
  size?: string;
  category?: string;
  gender?: string;
  season?: string;
};

export type SearchProductInputs = {
  keywords?: string;
  filters: {
    price?: string;
    color?: string;
    size?: string;
    category?: string;
    gender?: string;
    season?: string;
    sale?: string;
  };
  lastId?: string;
};

export type SearchProductFields = {
  keywords?: string[];
  filters: Filters;
  lastId?: string;
};

export type ProductInputs = {
  id?: string;
  keywords?: string[];
  name: string;
  description: string;
  color: string;
  gender: string;
  category: string;
  season: string;
  price: number;
  sale: number;
  image: UploadedFile;
  backgroundColor?: string;
  imageUrl?: string;
};

export type CreateProductFields = {
  id: string;
  name: string;
  description: string;
  price: number;
  sale: number;
  gender: Gender;
  category: Category;
  color: Color;
  season: Season;
  imageUrl: string;
  backgroundColor: string;
};

export type UpdateProductFields = CreateProductFields & {
  isActive: boolean;
};
