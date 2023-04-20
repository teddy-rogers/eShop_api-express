import { Country } from '@prisma/database';
import { Utils } from '../helpers';
import { PostSectionService, PostService } from '../services';
import {
  CreatePostSectionFields,
  CreatePostSectionInputs,
  UpdatePostSectionFields,
  UpdatePostSectionInputs,
} from '../types';

export class PostSectionResolver {
  private postSectionService = new PostSectionService();
  private postService = new PostService();
  private utils = new Utils();

  async getAllPostSections(postId: string, lang: Country) {
    return await this.postSectionService.findAll(postId, lang);
  }

  async createPostSection(section: CreatePostSectionInputs) {
    const post = await this.postService.findById(section.postId, 'EN');
    if (!post) throw `Unable to create section for post ${section.postId}`;
    const postSectionFields: CreatePostSectionFields =
      await this.utils.createFields(
        `posts/${encodeURI(post.title.EN)}`,
        section,
      );
    return await this.postSectionService.create(postSectionFields);
  }

  async updatePostSection(section: UpdatePostSectionInputs) {
    const post = await this.postService.findById(section.postId, 'EN');
    if (!post) throw `Unable to create section for post ${section.postId}`;
    const postSectionFields: UpdatePostSectionFields =
      await this.utils.createFields(
        `posts/${encodeURI(post.title.EN)}`,
        section,
      );
    return await this.postSectionService.update(postSectionFields);
  }
}
