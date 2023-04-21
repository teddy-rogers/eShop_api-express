import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
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
  private getWidth = (destinationFolder: DestionationFolder) => {
    switch (destinationFolder) {
      case Folder.products:
        return Width.small;
      case Folder.selections:
        return Width.medium;
      case Folder.posts:
        return Width.large;
      default:
        return Width.medium;
    }
  };

  private async uploadImage(
    destinationFolder: DestionationFolder,
    image: UploadedFile,
  ): Promise<{
    imageUrl: string;
    backgroundColor: string;
    foregroundColor: string;
  }> {
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
      };
      return await cloudinary.uploader
        .upload(image.tempFilePath, options)
        .then((result: UploadApiResponse) => {
          let imageProps = {
            imageUrl: '',
            backgroundColor: '#FFFFFF',
            foregroundColor: '#000000',
          };
          if (result.colors) {
            imageProps = {
              imageUrl: result.secure_url,
              backgroundColor: result.colors[0][0],
              foregroundColor: result.colors[result.colors.length - 1][0],
            };
          }
          return imageProps;
        });
    } catch (error) {
      throw error;
    }
  }

  async createImageFields(
    destinationFolder: DestionationFolder,
    image: UploadedFile,
  ): Promise<{
    imageUrl: string | undefined;
    backgroundColor: string | undefined;
    foregroundColor: string | undefined;
  }> {
    if (image !== undefined) {
      return await this.uploadImage(destinationFolder, image);
    }
    return {
      //will send "do not update" to Prisma
      imageUrl: undefined,
      backgroundColor: undefined,
      foregroundColor: undefined,
    };
  }
}

export enum Folder {
  products = 'products',
  selections = 'selections',
  posts = 'posts',
}

export type DestionationFolder = Folder | `posts/${string}`;

enum Width {
  small = 800,
  medium = 1024,
  large = 1280,
}
