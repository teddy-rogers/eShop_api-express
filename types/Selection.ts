import { Country, ImageAspect, Text } from '@prisma/database';
import { UploadedFile } from 'express-fileupload';

export type SearchSelectionInputs = {
  keywords?: string;
  filters: {
    countries?: string[];
    isActive?: boolean;
    dateStart?: Date;
    dateEnd?: Date;
  };
  lastId?: string;
};

export type SearchSelectionFields = {
  keywords?: string[];
  isActive?: boolean;
  dateStart?: Date;
  dateEnd?: Date;
  countries?: Country[];
};

export type CreateSelectionInputs = {
  title: Omit<Text, 'id'>;
  description: Omit<Text, 'id'>;
  selectionPath: string;
  dateStart: Date;
  dateEnd: Date;
  countries: string[];
  image: UploadedFile;
  imageAspect?: string;
};

export type CreateSelectionFields = Omit<
  CreateSelectionInputs,
  'title' | 'description' | 'countries' | 'image' | 'imageAspect'
> & {
  id: string;
  title: Text;
  description: Text;
  imageUrl: string;
  imageAspect: ImageAspect;
  foregroundColor: string;
  backgroundColor: string;
  countries: Country[];
};

export type UpdateSelectionInputs = {
  id: string;
  isActive: boolean;
  title: Text;
  description: Text;
  dateStart: Date;
  dateEnd: Date;
  image?: UploadedFile;
  imageUrl: string;
  foregroundColor: string;
  backgroundColor: string;
  selectionPath: string;
  imageAspect: ImageAspect;
  countries: Country[];
};

export type UpdateSelectionFields = Omit<UpdateSelectionInputs, 'image'>;
