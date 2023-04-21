import { Category, Color, Gender, Season, Text } from '@prisma/database';
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

export type CreateProductInputs = {
  title: Omit<Text, 'id'>;
  description: Omit<Text, 'id'>;
  color: string;
  gender: string;
  category: string;
  season: string;
  price: number;
  sale: number;
  image: UploadedFile;
};

export type CreateProductFields = Omit<
  CreateProductInputs,
  'title' | 'description' | 'gender' | 'category' | 'color' | 'season' | 'image'
> & {
  id: string;
  title: Text;
  description: Text;
  gender: Gender;
  category: Category;
  color: Color;
  season: Season;
  imageUrl: string;
  foregroundColor: string;
  backgroundColor: string;
};

export type UpdateProductInputs = {
  id: string;
  isActive: boolean;
  title: Text;
  description: Text;
  gender: Gender;
  category: Category;
  color: Color;
  season: Season;
  price: number;
  sale: number;
  image?: UploadedFile;
  imageUrl: string;
  foregroundColor: string;
  backgroundColor: string;
};

export type UpdateProductFields = Omit<UpdateProductInputs, 'image'>;
