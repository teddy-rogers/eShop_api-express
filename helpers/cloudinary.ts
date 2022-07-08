import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { UploadedFile } from 'express-fileupload';

dotenv.config();

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export class CloudinaryHelper {
  private getWidth = (destinationFolder: Folder) => {
    switch (destinationFolder) {
      case Folder.products:
      case Folder.selections:
        return Width.small;
      case Folder.posts:
      case Folder.postSections:
        return Width.medium;
      default:
        return Width.small;
    }
  };

  private async uploadImage(
    destinationFolder: Folder,
    image: UploadedFile,
  ): Promise<{ imageUrl: string; backgroundColor: string }> {
    try {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        colors: true,
        folder: `poliqlo/${destinationFolder}`,
        transformation: [
          {
            width: this.getWidth(destinationFolder),
            crop: 'scale',
          },
          { fetch_format: 'auto' },
        ],
      }
      return await cloudinary.uploader
        .upload(image.tempFilePath, options)
        .then((result) => {
          return {
            imageUrl: result.secure_url,
            backgroundColor: result.colors[0][0],
          };
        });
    } catch (error) {
      throw error;
    }
  }

  async createImageFields(
    destinationFolder: Folder,
    image: UploadedFile,
  ): Promise<{
    imageUrl: string | undefined;
    backgroundColor: string | undefined;
  }> {
    if (image !== undefined) {
      return await this.uploadImage(destinationFolder, image);
    }
    return { imageUrl: undefined, backgroundColor: undefined }; //send "do not update" to Prisma
  }
}

export enum Folder {
  products = 'products',
  selections = 'selections',
  posts = 'posts',
  postSections = 'posts/sections',
}

enum Width {
  small = 800,
  medium = 1024,
}
