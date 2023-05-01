import { Country, PrismaClient } from '@prisma/database';
import { Utils } from '../helpers/utils';
import { CreateSelectionFields } from '../types/Selection';

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

  private getKeywords(
    selection: Pick<
      CreateSelectionFields,
      'title' | 'description' | 'selectionPath' | 'countries'
    >,
  ) {
    return this.utils.createKeywords([
      selection.title.FR,
      selection.title.EN,
      selection.description.FR,
      selection.description.EN,
      selection.selectionPath,
      selection.countries.join(' '),
    ]);
  }

  async findMany({ keywords, filters, lastId }: any, lang: Country) {
    try {
      return await this.db.selection
        .findMany({
          ...this.getSearchOptions(lastId),
          where: {
            ...this.getSearchFields({ keywords, filters }),
          },
          include: {
            title: this.utils.selectLanguage(lang),
            description: this.utils.selectLanguage(lang),
          },
        })
        .then((selections) => selections);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string, lang: Country) {
    try {
      return await this.db.selection
        .findFirst({
          where: { id },
          include: {
            title: this.utils.selectLanguage(lang),
            description: this.utils.selectLanguage(lang),
          },
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
          this.db.text.createMany({
            data: [
              {
                id: selection.title.id,
                FR: selection.title.FR,
                EN: selection.title.EN,
              },
              {
                id: selection.description.id,
                FR: selection.description.FR,
                EN: selection.description.EN,
              },
            ],
          }),
          this.db.selection.create({
            data: {
              id: selection.id,
              titleId: selection.title.id,
              descriptionId: selection.description.id,
              imageUrl: selection.imageUrl,
              foregroundColor: selection.foregroundColor,
              backgroundColor: selection.backgroundColor,
              selectionPath: selection.selectionPath,
              imageAspect: selection.imageAspect,
              countries: selection.countries,
              dateStart: new Date(selection.dateStart),
              dateEnd: new Date(selection.dateEnd),
            },
            include: {
              title: true,
              description: true,
            },
          }),
          this.db.keywords.create({
            data: {
              selectionId: selection.id,
              indexes: this.getKeywords(selection),
            },
          }),
        ])
        .then(([_, newSelection]) => {
          if (!newSelection) throw 'Selection not created in database.';
          return newSelection;
        });
    } catch (error) {
      throw error;
    }
  }

  async update(selection: any) {
    try {
      return await this.db
        .$transaction([
          this.db.text.update({
            where: { id: selection.title.id },
            data: {
              FR: selection.title.FR,
              EN: selection.title.EN,
            },
          }),
          this.db.text.update({
            where: { id: selection.description.id },
            data: {
              FR: selection.description.FR,
              EN: selection.description.EN,
            },
          }),
          this.db.selection.update({
            where: { id: selection.id },
            data: {
              id: selection.id,
              isActive: selection.isActive,
              titleId: selection.title.id,
              descriptionId: selection.description.id,
              imageUrl: selection.imageUrl,
              foregroundColor: selection.foregroundColor,
              backgroundColor: selection.backgroundColor,
              selectionPath: selection.selectionPath,
              imageAspect: selection.imageAspect,
              countries: selection.countries,
              dateStart: new Date(selection.dateStart),
              dateEnd: new Date(selection.dateEnd),
            },
            include: {
              title: true,
              description: true,
            },
          }),
          this.db.keywords.update({
            where: { selectionId: selection.id },
            data: {
              indexes: this.getKeywords(selection),
            },
          }),
        ])
        .then(async ([_, __, updatedSelection]) => {
          if (!updatedSelection) throw 'Selection not updated in database.';
          return updatedSelection;
        });
    } catch (error) {
      throw error;
    }
  }
}
