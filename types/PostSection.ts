import { ImageAspect } from '@prisma/database';

export type CreatePostSectionFields = {
  id: string;
  postId: string;
  title: string;
  paragraph?: string;
  localPath?: string;
  externalLink?: string;
  imageUrl?: string;
  imageAspect: ImageAspect;
};
