import { Country, ImageAspect } from '@prisma/database';
import { UploadedFile } from 'express-fileupload';

export type CreateSelectionInputs = {
  title: string;
  description: string;
  foregroundColor?: string;
  image: UploadedFile;
  imageAspect?: string;
  selectionPath: string;
  countries: string[];
  dateStart?: Date;
  dateEnd?: Date;
  isActive?: boolean;
};

export type CreateSelectionFields = {
  id?: string;
  title: string;
  description: string;
  foregroundColor: string;
  backgroundColor: string;
  imageUrl: string;
  imageAspect: ImageAspect;
  selectionPath: string;
  countries: Country[];
  dateStart: Date;
  dateEnd: Date;
  isActive: boolean;
};

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

export type UpdateSelectionFields = {
  id: string;
  title?: string;
  description?: string;
  foregroundColor?: string;
  imageUrl?: string;
  backgroundColor?: string;
  image?: UploadedFile;
  selectionPath?: string;
  isActive?: boolean;
  dateStart?: Date;
  dateEnd?: Date;
  ImageAspect?: ImageAspect;
  countries?: Country[];
};
