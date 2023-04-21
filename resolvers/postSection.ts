import { Folder, Utils } from '../helpers';
import { PostSectionService } from '../services';
import {
	CreatePostSectionFields,
	CreatePostSectionInputs, UpdatePostSectionFields, UpdatePostSectionInputs
} from '../types';

export class PostSectionResolver {
  private postSectionService = new PostSectionService();
  private utils = new Utils();

  async getAllPostSections(postId: string) {
    return await this.postSectionService.findAll(postId);
  }

  async createPostSection(section: CreatePostSectionInputs) {
    const postSectionFields: CreatePostSectionFields =
      await this.utils.createFields(Folder.postSections, section);
    return await this.postSectionService.create(postSectionFields);
  }

  async updatePostSection(section: UpdatePostSectionInputs) {
    const postSectionFields: UpdatePostSectionFields =
      await this.utils.createFields(Folder.postSections, section);
    return await this.postSectionService.update(postSectionFields);
  }
}
