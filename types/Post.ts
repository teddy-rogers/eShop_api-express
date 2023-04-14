import { Country } from '@prisma/database';
import { UploadedFile } from 'express-fileupload';

export type CreatePostInputs = {
  title: string;
  description?: string;
  dateStart: Date;
  dateEnd: Date;
  countries: Country[];
  image: UploadedFile;
};

export type CreatePostFields = {
  id: string;
  title: string;
  description?: string;
  foregroundColor: string;
  backgroundColor: string;
  imageUrl: string;
  dateStart: Date;
  dateEnd: Date;
  countries: Country[];
};

export type UpdatePostInputs = Omit<CreatePostInputs, 'image'> & {
  id: string;
  image?: UploadedFile;
  imageUrl: string;
  foregroundColor: string;
  backgroundColor: string;
  isActive: boolean;
};

export type UpdatePostFields = CreatePostFields & { isActive: boolean };
