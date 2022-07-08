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

  async findManySelectionWhere({ keywords, filters, lastId }: any) {
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

  async findOneSelection(id: string) {
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

  async createSelection(selection: CreateSelectionFields) {
    try {
      return await this.db
        .$transaction([
          this.db.selection.create({
            data: {
              id: selection.id,
              title: selection.title.trim(),
              description: selection.description.trim(),
              foregroundColor: selection.foregroundColor,
              imageUrl: selection.imageUrl,
              backgroundColor: selection.backgroundColor,
              selectionPath: selection.selectionPath,
              isActive: selection.isActive,
              imageAspect: selection.imageAspect,
              countries: selection.countries,
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

  async updateSelection(selection: any) {
    try {
      return await this.db.selection
        .update({
          where: { id: selection.id },
          data: {
            id: selection.id,
            title: selection.title.trim(),
            description: selection.description.trim(),
            foregroundColor: selection.foregroundColor,
            imageUrl: selection.imageUrl,
            backgroundColor: selection.backgroundColor,
            selectionPath: selection.selectionPath,
            isActive: selection.isActive,
            imageAspect: selection.imageAspect,
            countries: selection.countries,
            dateStart: new Date(selection.dateStart),
            dateEnd: new Date(selection.dateEnd),
          },
        })
        .then(async (updatedSelection) => {
          if (!updatedSelection) throw 'Selection not updated in database.';
          await this.db.keywords.update({
            where: { selectionId: updatedSelection.id },
            data: {
              indexes: this.getKeywords(updatedSelection),
            },
          });
          return updatedSelection;
        });
    } catch (error) {
      throw error;
    }
  }
}
