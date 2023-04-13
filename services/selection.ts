import { PrismaClient } from '@prisma/database';
import { Utils } from '../helpers';
import { CreateSelectionFields } from '../types';
import { selectionResponse } from './response';

export class SelectionService {
  private db = new PrismaClient();
  private utils = new Utils();

  private getSearchOptions(lastId?: string) {
    let options = {};
    options = { ...options, take: 48, orderBy: { dateStart: 'asc' } };
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

  private getSearchFields({ keywords, filters }: any) {
    const { isActive, countries, dateStart, dateEnd } = filters;
    let fields = {};
    if (keywords)
      fields = { ...fields, keywords: { indexes: { hasSome: keywords } } };
    if (countries)
      fields = {
        ...fields,
        stores: { where: { country: { in: countries } } },
      };
    if (isActive) fields = { ...fields, isActive };
    if (dateStart && dateEnd)
      fields = {
        ...fields,
        dateStart: { gte: new Date(dateStart) },
        dateEnd: { lte: new Date(dateEnd) },
      };
    return fields;
  }

  private getKeywords(selection: CreateSelectionFields) {
    return this.utils.createKeywords([
      selection.title,
      selection.description,
      selection.selectionPath,
      selection.imageAspect,
      selection.countries.join(' '),
    ]);
  }

  async findMany({ keywords, filters, lastId }: any) {
    try {
      return await this.db.selection
        .findMany({
          ...this.getSearchOptions(lastId),
          where: {
            ...this.getSearchFields({ keywords, filters }),
          },
          select: { ...selectionResponse },
        })
        .then((selections) => selections);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await this.db.selection
        .findFirst({
          where: { id },
          select: { ...selectionResponse },
        })
        .then((selection) => {
          if (!selection) throw `Unable to find selection ${id}`;
          return selection;
        });
    } catch (error) {
      throw error;
    }
  }

  async create(selection: CreateSelectionFields) {
    try {
      return await this.db
        .$transaction([
          this.db.selection.create({
            data: {
              ...selection,
              dateStart: new Date(selection.dateStart),
              dateEnd: new Date(selection.dateEnd),
            },
          }),
          this.db.keywords.create({
            data: {
              selectionId: selection.id,
              indexes: this.getKeywords(selection),
            },
          }),
        ])
        .then(([newSelection, _]) => {
          if (!newSelection) throw 'Selection not created in database.';
          return newSelection;
        });
    } catch (error) {
      throw error;
    }
  }

  async update(selection: any) {
    try {
      return await this.db.$transaction([this.db.selection
        .update({
          where: { id: selection.id },
          data: {
            ...selection,
            dateStart: new Date(selection.dateStart),
            dateEnd: new Date(selection.dateEnd),
          },
        }),
      this.db.keywords.update({
        where: { selectionId: selection.id },
        data: {
          indexes: this.getKeywords(selection),
        },
      })])
        .then(async (updatedSelection) => {
          if (!updatedSelection) throw 'Selection not updated in database.';
          return updatedSelection;
        });
    } catch (error) {
      throw error;
    }
  }
}
