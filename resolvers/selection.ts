import { Folder, Utils } from '../helpers';
import { SelectionService } from '../services';
import {
	CreateSelectionFields,
	CreateSelectionInputs,
	SearchSelectionInputs,
	UpdateSelectionFields
} from '../types';

export class SelectionResolver {
  private selectionService = new SelectionService();
  private utils = new Utils();

  async getSelectionWhere({
    keywords,
    filters,
    lastId,
  }: SearchSelectionInputs) {
    const countries = filters.countries?.map((country) =>
      country.toUpperCase(),
    );
    return this.selectionService.findManySelectionWhere({
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
    });
  }

  async getSelectionById(id: string) {
    return await this.selectionService.findOneSelection(id);
  }

  async createSelectionWith(product: CreateSelectionInputs) {
    const productFields: CreateSelectionFields = await this.utils.createFields(
      Folder.selections,
      product,
    );
    return await this.selectionService.createSelection(productFields);
  }

  async updateSelectionWith(product: SearchSelectionInputs) {
    const productFields: UpdateSelectionFields = await this.utils.createFields(
      Folder.selections,
      product,
    );
    return await this.selectionService.updateSelection(productFields);
  }
}
