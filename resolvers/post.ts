import { Country } from '@prisma/database';
import { Utils } from '../helpers';
import { PostService } from '../services';

export class PostResolver {
  private postService = new PostService();
  private utils = new Utils();

  async getAllPosts() {
    const posts = await this.postService.findMany();
    if (!posts.length) throw 'No posts found in database';
    return posts;
  }

  async getAllTodaysCountryPosts(country: Country) {
    const posts = await this.postService.findByTodaysCountry(country);
    if (!posts.length) throw `No posts for country ${country} in database`;
  }

  async getPostById(id: string) {
    const post = await this.postService.findById(id);
    if (!post) throw `Unable to find post ${id}`;
    return post;
  }
}
