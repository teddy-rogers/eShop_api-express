import { ImageAspect } from '@prisma/database';
import { UploadedFile } from 'express-fileupload';

export type CreatePostSectionInputs = {
  postId: string;
  title?: string;
  paragraph?: string;
  localPath?: string;
  externalLink?: string;
  image?: UploadedFile;
  imageAspect?: ImageAspect;
};

export type CreatePostSectionFields = Omit<CreatePostSectionInputs, 'image'> & {
  id: string;
  imageUrl?: string;
};

export type UpdatePostSectionInputs = CreatePostSectionInputs & {
  id: string;
  imageUrl?: string;
};

export type UpdatePostSectionFields = CreatePostSectionFields;
