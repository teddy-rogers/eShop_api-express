import { Country, PrismaClient } from '@prisma/database';
import { Utils } from '../helpers';
import { CreatePostFields, UpdatePostFields } from '../types';

export class PostService {
  private db = new PrismaClient();
  private utils = new Utils();

  private getKeywords(
    post: Pick<CreatePostFields, 'title' | 'description' | 'countries'>,
  ) {
    const fields: string[] = [
      post.title.FR,
      post.title.EN,
      post.description.FR,
      post.description.EN,
      ...post.countries,
    ].reduce((acc, cur) => {
      cur && acc.push;
      return acc;
    }, [] as string[]);
    return this.utils.createKeywords(fields);
  }

  async findMany(lang: Country) {
    try {
      return await this.db.post.findMany({
        include: {
          title: this.utils.selectLanguage(lang),
          description: this.utils.selectLanguage(lang),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findByTodaysCountry(country: Country, lang: Country) {
    try {
      return await this.db.post.findMany({
        where: {
          countries: { has: country },
          dateEnd: { gt: new Date() },
          isActive: true,
        },
        include: {
          title: this.utils.selectLanguage(lang),
          description: this.utils.selectLanguage(lang),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string, lang: Country) {
    try {
      return await this.db.post
        .findFirst({
          where: { id },
          include: {
            title: this.utils.selectLanguage(lang),
            description: this.utils.selectLanguage(lang),
            sections: {
              include: {
                title: this.utils.selectLanguage(lang),
                paragraph: this.utils.selectLanguage(lang),
              },
            },
          },
        })
        .then((post) => {
          if (post === undefined) throw `Unable to find post ${id}`;
          return post;
        });
    } catch (error) {
      throw error;
    }
  }

  async create(post: CreatePostFields) {
    try {
      return this.db
        .$transaction([
          this.db.text.createMany({
            data: [
              {
                id: post.title.id,
                FR: post.title.FR,
                EN: post.title.EN,
              },
              {
                id: post.description.id,
                FR: post.description.FR,
                EN: post.description.EN,
              },
            ],
          }),
          this.db.post.create({
            data: {
              id: post.id,
              titleId: post.title.id,
              descriptionId: post.description.id,
              dateStart: post.dateStart,
              dateEnd: post.dateEnd,
              imageUrl: post.imageUrl,
              foregroundColor: post.foregroundColor,
              backgroundColor: post.backgroundColor,
              countries: post.countries,
            },
            include: {
              title: true,
              description: true,
            },
          }),
          this.db.keywords.create({
            data: {
              postId: post.id,
              indexes: this.getKeywords(post),
            },
          }),
        ])
        .then(([_, post]) => {
          if (!post) throw 'Post not created in database.';
          return post;
        });
    } catch (error) {
      throw error;
    }
  }

  async update(post: UpdatePostFields) {
    try {
      return this.db
        .$transaction([
          this.db.post.update({
            where: { id: post.id },
            data: {
              id: post.id,
              isActive: post.isActive,
              titleId: post.title.id,
              descriptionId: post.description.id,
              dateStart: post.dateStart,
              dateEnd: post.dateEnd,
              imageUrl: post.imageUrl,
              foregroundColor: post.foregroundColor,
              backgroundColor: post.backgroundColor,
              countries: post.countries,
            },
            include: {
              title: true,
              description: true,
            },
          }),
          this.db.text.update({
            where: { id: post.title.id },
            data: {
              FR: post.title.FR,
              EN: post.title.EN,
            },
          }),
          this.db.text.update({
            where: { id: post.description.id },
            data: {
              FR: post.description.FR,
              EN: post.description.EN,
            },
          }),
          this.db.keywords.update({
            where: { postId: post.id },
            data: { indexes: this.getKeywords(post) },
          }),
        ])
        .then(([post]) => {
          if (!post) throw 'Post not created in database.';
          return post;
        });
    } catch (error) {
      throw error;
    }
  }
}
