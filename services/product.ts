import { PrismaClient } from '@prisma/database';
import { Utils } from '../helpers';
import {
  CreateProductFields,
  SearchProductFields,
  UpdateProductFields
} from '../types';
import { partialProductResponse, productResponse } from './response';

export class ProductService {
  private db = new PrismaClient();
  private utils = new Utils();

  private getSearchOptions(lastId?: string) {
    let options = {};
    options = { ...options, take: 100, orderBy: { id: 'asc' } };
    if (lastId)
      options = {
        ...options,
        skip: 1,
        cursor: {
          id: lastId,
        },
      };
    return options;
  }

  private getSearchFields({ keywords, filters }: SearchProductFields) {
    const { price, size, gender, color, category, season, sale } = filters;
    let fields = {};
    if (keywords)
      fields = { ...fields, keywords: { indexes: { hasSome: keywords } } };
    if (gender) fields = { ...fields, gender };
    if (color) fields = { ...fields, color };
    if (category) fields = { ...fields, category };
    if (season) fields = { ...fields, season };
    if (price) fields = { ...fields, price: { lte: price } };
    if (sale) fields = { ...fields, sale: { lte: sale } };
    if (size)
      fields = {
        ...fields,
        skus: { some: { size, quantity: { gte: 0 } } },
      };
    return fields;
  }

  private getKeywords(product: CreateProductFields) {
    return this.utils.createKeywords([
      product.name,
      product.description,
      product.color,
      product.gender,
      product.category,
      product.season,
    ]);
  }

  async findWhere({ keywords, filters, lastId }: SearchProductFields) {
    try {
      return await this.db.product
        .findMany({
          ...this.getSearchOptions(lastId),
          where: {
            ...this.getSearchFields({ keywords, filters }),
          },
          select: { ...partialProductResponse },
        })
        .then((products) => {
          return products.map((product) => {
            return {
              ...product,
              price: product.price.toNumber(),
              sale: product.sale.toNumber(),
            };
          });
        });
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await this.db.product
        .findFirst({
          where: { id },
          select: { ...productResponse },
        })
        .then((product) => {
          if (!product) throw `Unable to find product ${id}`;
          return {
            ...product,
            price: product.price.toNumber(),
            sale: product.sale.toNumber(),
          };
        });
    } catch (error) {
      throw error;
    }
  }

  async create(product: CreateProductFields) {
    try {
      return await this.db
        .$transaction([
          this.db.product.create({
            data: {
              id: product.id,
              name: product.name,
              description: product.description,
              color: product.color,
              gender: product.gender,
              category: product.category,
              season: product.season,
              price: product.price,
              sale: product.sale,
              imageUrl: product.imageUrl,
              backgroundColor: product.backgroundColor,
            },
          }),
          this.db.keywords.create({
            data: {
              productId: product.id,
              indexes: this.getKeywords(product),
            },
          }),
        ])
        .then(([product, _]) => {
          if (!product) throw 'Product not created in database.';
          return {
            ...product,
            price: product.price.toNumber(),
            sale: product.sale.toNumber(),
          };
        });
    } catch (error) {
      throw error;
    }
  }

  async update(product: UpdateProductFields) {
    try {
      return await this.db
        .$transaction([
          this.db.product.update({
            where: { id: product.id },
            data: {
              isActive: product.isActive,
              id: product.id,
              name: product.name,
              description: product.description,
              color: product.color,
              gender: product.gender,
              category: product.category,
              season: product.season,
              price: product.price,
              sale: product.sale,
              imageUrl: product.imageUrl,
              backgroundColor: product.backgroundColor,
            },
          }),
          this.db.keywords.update({
            where: { productId: product.id },
            data: { indexes: this.getKeywords(product) },
          }),
        ])
        .then(([product, _]) => {
          if (!product) throw 'Product not updated in database.';
          return {
            ...product,
            price: product.price.toNumber(),
            sale: product.sale.toNumber(),
          };
        });
    } catch (error) {
      throw error;
    }
  }
}
