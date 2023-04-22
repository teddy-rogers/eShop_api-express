import { Country } from '@prisma/database';
import { Utils } from '../helpers/utils';
import { PostService } from '../services/post';
import {
  CreatePostFields,
  CreatePostInputs,
  UpdatePostFields
} from '../types/Post';

export class PostResolver {
  private postService = new PostService();
  private utils = new Utils();

  async getAllPosts(lang: Country) {
    const posts = await this.postService.findMany(lang);
    if (!posts.length) throw 'No posts found in database';
    return posts;
  }

  async getAllTodaysCountryPosts(country: string, lang: Country) {
    const formatedCountry = this.utils.changeCaseAndTrim(country, 'upper');
    if (!this.utils.isTypeOf(Country, formatedCountry)) {
      throw 'Crountry not allowed';
    }
    const posts = await this.postService.findByTodaysCountry(
      formatedCountry as Country,
      lang,
    );
    if (!posts.length)
      throw `No posts for country ${formatedCountry} in database`;
    return posts;
  }

  async getPostById(id: string, lang: Country) {
    const post = await this.postService.findById(id, lang);
    if (!post) throw `Unable to find post ${id}`;
    return post;
  }

  async createPost(post: CreatePostInputs) {
    const postFields: CreatePostFields = await this.utils.createFields(
      `/posts/${encodeURI(post.title.EN)}`,
      post,
    );
    return await this.postService.create(postFields);
  }

  async updatePost(post: CreatePostInputs) {
    const postFields: UpdatePostFields = await this.utils.createFields(
      `/posts/${encodeURI(post.title.EN)}`,
      post,
    );
    return await this.postService.update(postFields);
  }
}
