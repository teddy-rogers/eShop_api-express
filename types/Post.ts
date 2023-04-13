import { Country } from '@prisma/database';

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
