import { Country } from '@prisma/database';
import { Folder, Utils } from '../helpers';
import { PostService } from '../services';
import { CreatePostFields, PostInputs, UpdatePostFields } from '../types';

export class PostResolver {
  private postService = new PostService();
  private utils = new Utils();

  async getAllPosts() {
    const posts = await this.postService.findMany();
    if (!posts.length) throw 'No posts found in database';
    return posts;
  }

  async getAllTodaysCountryPosts(country: string) {
    const formatedCountry = this.utils.changeCaseAndTrim(country, 'upper');
    if (!this.utils.isTypeOf(Country, formatedCountry)) {
      throw 'Crountry not allowed';
    }
    const posts = await this.postService.findByTodaysCountry(
      formatedCountry as Country,
    );
    if (!posts.length)
      throw `No posts for country ${formatedCountry} in database`;
    return posts;
  }

  async getPostById(id: string) {
    const post = await this.postService.findById(id);
    if (!post) throw `Unable to find post ${id}`;
    return post;
  }

  async createPost(post: PostInputs) {
    const postFields: CreatePostFields = await this.utils.createFields(
      Folder.posts,
      post,
    );
    return await this.postService.create(postFields);
  }

  async updatePost(post: PostInputs) {
    const postFields: UpdatePostFields = await this.utils.createFields(
      Folder.posts,
      post,
    );
    return await this.postService.update(postFields);
  }
}
