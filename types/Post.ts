import { Country, Text } from '@prisma/database';
import { UploadedFile } from 'express-fileupload';

export type CreatePostInputs = {
  title: Omit<Text, 'id'>;
  description: Omit<Text, 'id'>;
  dateStart: Date;
  dateEnd: Date;
  countries: Country[];
  image: UploadedFile;
};

export type CreatePostFields = Omit<
  CreatePostInputs,
  'title' | 'description' | 'image'
> & {
  id: string;
  title: Text;
  description: Text;
  foregroundColor: string;
  backgroundColor: string;
  imageUrl: string;
};

export type UpdatePostInputs = {
  id: string;
  isActive: boolean;
  title: Text;
  description: Text;
  dateStart: Date;
  dateEnd: Date;
  countries: Country[];
  image?: UploadedFile;
  imageUrl: string;
  foregroundColor: string;
  backgroundColor: string;
};

export type UpdatePostFields = Omit<UpdatePostInputs, 'image'>;
