import { Country } from '@prisma/database';
import { Folder } from '../helpers/cloudinary';
import { Utils } from '../helpers/utils';
import { SelectionService } from '../services/selection';
import {
  CreateSelectionFields,
  CreateSelectionInputs,
  SearchSelectionInputs,
  UpdateSelectionInputs
} from '../types/Selection';

export class SelectionResolver {
  private selectionService = new SelectionService();
  private utils = new Utils();

  async getSelectionWhere(
    { keywords, filters, lastId }: SearchSelectionInputs,
    lang: Country,
  ) {
    const countries = filters.countries?.map((country) =>
      country.toUpperCase(),
    );
    return this.selectionService.findMany(
      {
        keywords: keywords?.length
          ? keywords?.split(' ').map((k) => k.toLowerCase())
          : undefined,
        filters: {
          isActive: filters.isActive,
          dateStart: filters.dateStart,
          dateEnd: filters.dateEnd,
          countries,
        },
        lastId,
      },
      lang,
    );
  }

  async getSelectionById(id: string, lang: Country) {
    return await this.selectionService.findById(id, lang);
  }

  async createSelectionWith(selection: CreateSelectionInputs) {
    const selectionFields: CreateSelectionFields =
      await this.utils.createFields(Folder.selections, selection);
    return await this.selectionService.create(selectionFields);
  }

  async updateSelectionWith(selection: SearchSelectionInputs) {
    const selectionFields: UpdateSelectionInputs =
      await this.utils.createFields(Folder.selections, selection);
    return await this.selectionService.update(selectionFields);
  }
}
