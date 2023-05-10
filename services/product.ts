import { Country, PrismaClient, Product, Size, Sku } from '@prisma/database';
import { v4 as createUniqueId } from 'uuid';
import { Utils } from '../helpers/utils';
import {
  CreateProductFields,
  SearchProductFields,
  UpdateProductFields,
} from '../types/Product';

export class ProductService {
  private db = new PrismaClient();
  private utils = new Utils();

  private getSearchOptions(lastId?: string) {
    let options = {};
    options = { ...options, take: 24, orderBy: { id: 'asc' } };
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
    /*  if (keywords)
      fields = { ...fields, keywords: { indexes: { hasSome: keywords } } }; */
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

  private getKeywords(
    product: Pick<
      CreateProductFields,
      'title' | 'description' | 'color' | 'gender' | 'category' | 'season'
    >,
  ) {
    return this.utils.createKeywords([
      product.title.FR,
      product.title.EN,
      product.description.FR,
      product.description.EN,
      product.color,
      product.gender,
      product.category,
      product.season,
    ]);
  }

  async findWhere(
    { keywords, filters, lastId }: SearchProductFields,
    lang: Country,
  ) {
    try {
      return await this.db.keywords
        .findMany({
          ...this.getSearchOptions(lastId),
          where: {
            productId: { not: null },
            ...(keywords !== undefined &&
              keywords.length && { indexes: { hasSome: keywords } }),
            product: { ...this.getSearchFields({ filters }) },
          },
          select: {
            product: {
              include: { title: this.utils.selectLanguage(lang) },
            },
          },
        })
        .then((res) => {
          return res.map((i) => {
            return ({
              ...i.product,
              title: i.product.title[lang],
              price: i.product.price.toNumber(),
              sale: i.product.sale.toNumber(),
            })
          });
        });
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string, lang: Country) {
    try {
      return await this.db.product
        .findFirst({
          where: { id },
          include: {
            title: this.utils.selectLanguage(lang),
            description: this.utils.selectLanguage(lang),
            skus: {
              select: {
                id: true,
                size: true,
                quantity: true,
              },
            },
          },
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
          this.db.text.createMany({
            data: [
              {
                id: product.title.id,
                FR: product.title.FR,
                EN: product.title.EN,
              },
              {
                id: product.description.id,
                FR: product.description.FR,
                EN: product.description.EN,
              },
            ],
          }),
          this.db.product.create({
            data: {
              id: product.id,
              titleId: product.title.id,
              descriptionId: product.description.id,
              color: product.color,
              gender: product.gender,
              category: product.category,
              season: product.season,
              price: product.price,
              sale: product.sale,
              imageUrl: product.imageUrl,
              foregroundColor: product.foregroundColor,
              backgroundColor: product.backgroundColor,
            },
            include: {
              title: true,
              description: true,
            },
          }),
          this.db.keywords.create({
            data: {
              productId: product.id,
              indexes: this.getKeywords(product),
            },
          }),
        ])
        .then(async ([_, product]) => {
          if (!product) throw 'Product not created in database.';
          //for dev purpose only !!!
          const topSizes: Size[] = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];
          const bottomSizes: Size[] = [
            'eu32',
            'eu34',
            'eu36',
            'eu38',
            'eu40',
            'eu42',
            'eu44',
            'eu46',
          ];
          function createSkus(sizes: Partial<Size[]>): Sku[] {
            return sizes.reduce((acc, s) => {
              if (s !== undefined) {
                const sku = {
                  id: createUniqueId(),
                  productId: product.id,
                  quantity: Math.floor(Math.random() * 1999),
                  ref: String(Math.floor(Math.random() * 1999999)),
                  size: s as Size,
                };
                acc.push(sku);
                return acc;
              }
              return acc;
            }, [] as Sku[]);
          }
          function createProductSkus(product: Product): Sku[] {
            if (
              [
                'shirt',
                't_shirt',
                'sweat',
                'pull',
                'dress',
                'swimsuit',
              ].includes(product.category)
            ) {
              return createSkus(topSizes);
            }
            if (
              ['chino', 'jogger', 'jean', 'short', 'skirt'].includes(
                product.category,
              )
            ) {
              return createSkus(bottomSizes);
            }
            return [
              {
                id: createUniqueId(),
                productId: product.id!,
                quantity: Math.floor(Math.random() * 199),
                ref: String(Math.floor(Math.random() * 1999999)),
                size: Size.u,
              },
            ];
          }
          await this.db.sku.createMany({
            data: createProductSkus(product),
          });
          //
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
          this.db.text.update({
            where: { id: product.title.id },
            data: {
              FR: product.title.FR,
              EN: product.title.EN,
            },
          }),
          this.db.text.update({
            where: { id: product.description.id },
            data: {
              FR: product.description.FR,
              EN: product.description.EN,
            },
          }),
          this.db.product.update({
            where: { id: product.id },
            data: {
              isActive: product.isActive,
              id: product.id,
              titleId: product.title.id,
              descriptionId: product.description.id,
              color: product.color,
              gender: product.gender,
              category: product.category,
              season: product.season,
              price: product.price,
              sale: product.sale,
              imageUrl: product.imageUrl,
              foregroundColor: product.foregroundColor,
              backgroundColor: product.backgroundColor,
            },
            include: {
              title: true,
              description: true,
            },
          }),
          this.db.keywords.update({
            where: { productId: product.id },
            data: { indexes: this.getKeywords(product) },
          }),
        ])
        .then(([_, __, product]) => {
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
