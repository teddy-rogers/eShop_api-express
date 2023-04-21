import { PrismaClient } from '@prisma/database';
import { Utils } from '../helpers';
import { CreatePostSectionFields, UpdatePostSectionFields } from '../types';

export class PostSectionService {
  private db = new PrismaClient();
  private utils = new Utils();

  private getKeywords(
    postSection: Pick<CreatePostSectionFields, 'title' | 'paragraph'>,
  ) {
    const fields: string[] = [postSection.title, postSection.paragraph].reduce(
      (acc, cur) => {
        cur && acc.push(cur);
        return acc;
      },
      [] as string[],
    );
    return this.utils.createKeywords(fields);
  }

  async findAll(postId: string) {
    try {
      return this.db.postSection.findMany({
        where: { postId },
      });
    } catch (error) {
      throw error;
    }
  }

  async create(postSection: CreatePostSectionFields) {
    try {
      return this.db
        .$transaction([
          this.db.postSection.create({
            data: {
              id: postSection.id,
              postId: postSection.postId,
              title: postSection.title,
              paragraph: postSection.paragraph,
              localPath: postSection.localPath,
              externalLink: postSection.externalLink,
              imageUrl: postSection.imageUrl,
              imageAspect: postSection.imageAspect,
            },
          }),
          this.db.keywords.create({
            data: {
              postSectionId: postSection.id,
              indexes: this.getKeywords(postSection),
            },
          }),
        ])
        .then(([postSection, _]) => {
          if (!postSection) 'Post section not created in database';
          return postSection;
        });
    } catch (error) {
      throw error;
    }
  }

  async update(postSection: UpdatePostSectionFields) {
    try {
      return this.db
        .$transaction([
          this.db.postSection.update({
            where: { id: postSection.id },
            data: {
              id: postSection.id,
              postId: postSection.postId,
              title: postSection.title,
              paragraph: postSection.paragraph,
              localPath: postSection.localPath,
              externalLink: postSection.externalLink,
              imageUrl: postSection.imageUrl,
              imageAspect: postSection.imageAspect,
            },
          }),
          this.db.keywords.update({
            where: { postSectionId: postSection.id },
            data: {
              indexes: this.getKeywords(postSection),
            },
          }),
        ])
        .then(([postSection, _]) => {
          if (!postSection) 'Post section not created in database';
          return postSection;
        });
    } catch (error) {
      throw error;
    }
  }
}
