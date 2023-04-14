import { Category, Color, Gender, Season, Size } from '@prisma/database';
import { Folder, Utils } from '../helpers';
import { ProductService } from '../services';
import {
  CreateProductFields,
  ProductInputs,
  SearchProductInputs,
  UpdateProductFields
} from '../types';

export class ProductResolver {
  private productService = new ProductService();
  private utils = new Utils();

  async getProductWhere({ keywords, filters, lastId }: SearchProductInputs) {
    const [
      sizeLowercase,
      genderLowercase,
      colorLowercase,
      categoryLowercase,
      seasonLowercase,
    ] = [
      filters.size,
      filters.gender,
      filters.color,
      filters.category,
      filters.season,
    ].map((filter) => filter && this.utils.changeCaseAndTrim(filter, 'lower'));
    return this.productService.findWhere({
      keywords: keywords?.length ? keywords?.split(' ') : undefined,
      filters: {
        price: filters.price ? parseInt(filters.price) : undefined,
        sale: filters.sale ? parseInt(filters.sale) : undefined,
        size: this.utils.isTypeOf(Size, sizeLowercase)
          ? sizeLowercase
          : undefined,
        gender: this.utils.isTypeOf(Gender, genderLowercase)
          ? genderLowercase
          : undefined,
        color: this.utils.isTypeOf(Color, colorLowercase)
          ? colorLowercase
          : undefined,
        category: this.utils.isTypeOf(Category, categoryLowercase)
          ? categoryLowercase
          : undefined,
        season: this.utils.isTypeOf(Season, seasonLowercase)
          ? seasonLowercase
          : undefined,
      },
      lastId,
    });
  }

  async getProductById(id: string) {
    return await this.productService.findById(id);
  }

  async createProductWith(product: ProductInputs) {
    const productFields: CreateProductFields = await this.utils.createFields(
      Folder.products,
      product,
    );
    return await this.productService.create(productFields);
  }

  async updateProductWith(product: ProductInputs) {
    const productFields: UpdateProductFields = await this.utils.createFields(
      Folder.products,
      product,
    );
    return await this.productService.update(productFields);
  }
}
