import { Country } from '@prisma/database';
import { UploadedFile } from 'express-fileupload';

export type CreatePostFields = {
  id: string;
  title: string;
  description: string;
  foregroundColor: string;
  backgroundColor: string;
  imageUrl: string;
  dateStart: Date;
  dateEnd: Date;
  countries: Country[];
};

export type PostInputs = {
  id: string;
  title: string;
  description: string;
  foregroundColor: string;
  backgroundColor: string;
  imageUrl: string;
  dateStart: Date;
  dateEnd: Date;
  countries: Country[];
  image: UploadedFile;
};

export type UpdatePostFields = CreatePostFields & { isActive: boolean };
