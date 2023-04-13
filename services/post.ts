import { Country, PrismaClient } from '@prisma/database';
import { Utils } from '../helpers';
import { CreatePostFields } from '../types';
import {
  partialAllPostsResponse,
  partialCountryTodaysPostsResponse
} from './response';

export class PostService {
  private db = new PrismaClient();
  private utils = new Utils();

  private getKeywords(post: CreatePostFields) {
    return this.utils.createKeywords([
      ...post.countries,
      post.title,
      post.description,
    ]);
  }

  async findMany() {
    try {
      return await this.db.post.findMany({
        select: { ...partialAllPostsResponse },
      });
    } catch (error) {
      throw error;
    }
  }

  async findByTodaysCountry(country: Country) {
    try {
      return await this.db.post.findMany({
        where: {
          countries: { has: country },
          dateEnd: { gt: new Date() },
          isActive: true,
        },
        select: { ...partialCountryTodaysPostsResponse },
      });
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await this.db.post
        .findFirst({
          where: { id },
          include: {
            sections: true,
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
          this.db.post.create({
            data: { ...post },
          }),
          this.db.keywords.create({
            data: {
              postId: post.id,
              indexes: this.getKeywords(post),
            },
          }),
        ])
        .then(([post, _]) => {
          if (!post) throw 'Post not created in database.';
          return post;
        });
    } catch (error) {
      throw error;
    }
  }

  async update(post: CreatePostFields) {
    try {
      return this.db
        .$transaction([
          this.db.post.update({
            where: { id: post.id },
            data: { ...post },
          }),
          this.db.keywords.update({
            where: { postId: post.id },
            data: { indexes: this.getKeywords(post) },
          }),
        ])
        .then(([post, _]) => {
          if (!post) throw 'Post not created in database.';
          return post;
        });
    } catch (error) {
      throw error;
    }
  }
}
