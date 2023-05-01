import { Country, PrismaClient } from '@prisma/database';
import { Utils } from '../helpers/utils';
import {
  CreatePostSectionFields,
  UpdatePostSectionFields
} from '../types/PostSection';

export class PostSectionService {
  private db = new PrismaClient();
  private utils = new Utils();

  private getKeywords(
    postSection: Pick<CreatePostSectionFields, 'title' | 'paragraph'>,
  ) {
    const fields: string[] = [
      postSection.title?.FR,
      postSection.title?.EN,
      postSection.paragraph?.FR,
      postSection.paragraph?.EN,
    ].reduce((acc, cur) => {
      cur && acc.push(cur);
      return acc;
    }, [] as string[]);
    return this.utils.createKeywords(fields);
  }

  async findAll(postId: string, lang: Country) {
    try {
      return this.db.postSection.findMany({
        where: { postId },
        include: {
          title: this.utils.selectLanguage(lang),
          paragraph: this.utils.selectLanguage(lang),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async create(postSection: CreatePostSectionFields) {
    try {
      return this.db
        .$transaction([
          this.db.text.createMany({
            data: [
              {
                id: postSection.title?.id,
                FR: postSection.title?.FR,
                EN: postSection.title?.EN,
              },
              {
                id: postSection.paragraph?.id,
                FR: postSection.paragraph?.FR,
                EN: postSection.paragraph?.EN,
              },
            ],
          }),
          this.db.postSection.create({
            data: {
              id: postSection.id,
              postId: postSection.postId,
              titleId: postSection.title?.id,
              paragraphId: postSection.paragraph?.id,
              localPath: postSection.localPath,
              externalLink: postSection.externalLink,
              imageUrl: postSection.imageUrl,
              imageAspect: postSection.imageAspect,
            },
            include: {
              title: true,
              paragraph: true,
            },
          }),
          this.db.keywords.create({
            data: {
              postSectionId: postSection.id,
              indexes: this.getKeywords(postSection),
            },
          }),
        ])
        .then(([_, postSection]) => {
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
          this.db.text.update({
            where: { id: postSection.title.id },
            data: {
              FR: postSection.title.FR,
              EN: postSection.title.EN,
            },
          }),
          this.db.text.update({
            where: { id: postSection.paragraph.id },
            data: {
              FR: postSection.paragraph.FR,
              EN: postSection.paragraph.EN,
            },
          }),
          this.db.postSection.update({
            where: { id: postSection.id },
            data: {
              id: postSection.id,
              postId: postSection.postId,
              titleId: postSection.title?.id,
              paragraphId: postSection.paragraph?.id,
              localPath: postSection.localPath,
              externalLink: postSection.externalLink,
              imageUrl: postSection.imageUrl,
              imageAspect: postSection.imageAspect,
            },
            include: {
              title: true,
              paragraph: true,
            },
          }),
          this.db.keywords.update({
            where: { postSectionId: postSection.id },
            data: {
              indexes: this.getKeywords(postSection),
            },
          }),
        ])
        .then(([_, __, postSection]) => {
          if (!postSection) 'Post section not created in database';
          return postSection;
        });
    } catch (error) {
      throw error;
    }
  }
}
