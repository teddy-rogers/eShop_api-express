import { PostSection, PrismaClient } from '@prisma/database';
import { Utils } from '../helpers';

export class PostSectionService {
  private db = new PrismaClient();
  private utils = new Utils();

  private getKeywords(postSection: PostSection) {
    const fields: string[] = [postSection.title, postSection.paragraph].reduce(
      (acc, cur) => {
        if (cur !== (undefined || null)) {
          acc.push(cur);
        }
        return acc;
      },
      [] as string[],
    );
    return this.utils.createKeywords(fields);
  }

  async findAll() {
    try {
      return this.db.postSection.findMany();
    } catch (error) {
      throw error;
    }
  }

  async create(postSection: PostSection) {
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

  async update(postSection: PostSection) {
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
