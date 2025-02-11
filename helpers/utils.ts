import { Country } from '@prisma/database';
import { v4 as createUniqueId } from 'uuid';
import { invalidStrings } from '../constants/filters';
import { CloudinaryHelper, DestionationFolder } from './cloudinary';

export class Utils {
  private cloudinaryHelper = new CloudinaryHelper();

  isTypeOf<T extends { [s: string]: unknown } | ArrayLike<unknown>, V>(
    type: T,
    value: V,
  ): boolean {
    return Object.values(type).includes(value);
  }

  createKeywords(fields: string[]): string[] {
    return fields.reduce((keywords, spec) => {
      if (!spec) return keywords;
      const filteredWords = spec
        .replace('_', '-')
        .replace('=', ' ')
        .replace('+', ' ')
        .replace('.', ' ')
        .replace(',', ' ')
        .replace('?', ' ')
        .replace('!', ' ')
        .replace(';', ' ')
        .replace(')', ' ')
        .replace('(', ' ')
        .replace('@', ' ')
        .replace('#', ' ')
        .replace('$', ' ')
        .replace('€', ' ')
        .replace('£', ' ')
        .replace('products', ' ')
        .replace('category', ' ')
        .replace(' ', ' ')
        .split(' ')
        .map((word) => word.toLowerCase())
        .filter((word) => !invalidStrings.includes(word));
      return Array.from(new Set([...keywords, ...filteredWords]));
    }, [] as string[]);
  }

  async createFields<T>(folder: DestionationFolder, object: any): Promise<T> {
    const id = object.id !== undefined ? object.id : createUniqueId();
    const { imageUrl, backgroundColor, foregroundColor } =
      await this.cloudinaryHelper.createImageFields(folder, object.image);
    ['title', 'description', 'paragraph'].forEach((key) => {
      if (key in object && object[key].id === undefined)
        object[key].id = createUniqueId();
    });
    delete object.image;
    const obj = {
      ...object,
      id,
      imageUrl,
      backgroundColor,
      foregroundColor,
    } as T;
    return obj;
  }

  changeCaseAndTrim(text: string, to: 'lower' | 'upper'): string {
    return to === 'lower'
      ? text.toLowerCase().trim()
      : text.toUpperCase().trim();
  }

  selectLanguage(lang: Country) {
    return {
      select: {
        FR: lang === 'FR',
        EN: lang === 'EN',
      },
    };
  }
}
