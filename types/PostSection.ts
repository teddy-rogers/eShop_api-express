import { ImageAspect, Text } from '@prisma/database';
import { UploadedFile } from 'express-fileupload';

export type CreatePostSectionInputs = {
  postId: string;
  title?: Omit<Text, 'id'>;
  paragraph?: Omit<Text, 'id'>;
  localPath?: string;
  externalLink?: string;
  image?: UploadedFile;
  imageAspect?: string;
};

export type CreatePostSectionFields = Omit<
  CreatePostSectionInputs,
  'image' | 'title' | 'paragraph' | 'imageAspect'
> & {
  id: string;
  title?: Text;
  paragraph?: Text;
  imageUrl?: string;
  imageAspect?: ImageAspect;
};

export type UpdatePostSectionInputs = {
  id: string;
  postId: string;
  title: Text;
  paragraph: Text;
  localPath: string;
  externalLink: string;
  image?: UploadedFile;
  imageUrl: string;
  imageAspect: ImageAspect;
};

export type UpdatePostSectionFields = Omit<UpdatePostSectionInputs, 'image'>;
