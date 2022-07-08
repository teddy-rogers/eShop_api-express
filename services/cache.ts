import { appCache } from '../helpers';
import { CacheStoreField } from '../types';

export class CacheService {
  async getFromCache({
    field,
    id,
  }: {
    field: CacheStoreField;
    id: string | 'all';
  }) {
    return await appCache.get(`${field}-${id}`).then((obj) => {
      if (!obj) return;
      return JSON.parse(obj);
    });
  }

  async setToCache<T>({
    field,
    id,
    data,
  }: {
    field: CacheStoreField;
    id: 'all' | string;
    data: T;
  }) {
    const cacheResponse = await appCache.set(
      `${field}-${id}`,
      JSON.stringify(data),
    );
    await appCache.expire(`${field}-${id}`, 60 * 60);
    if (cacheResponse === 'OK') {
      return await this.getFromCache({ field, id });
    }
  }

  async getListFromCache({
    field,
    id,
    page,
  }: {
    field: CacheStoreField;
    id: string | 'all';
    page?: number;
  }) {
    const range = (page?: number) => {
      const start = page ? (page - 1) * 12 : 0;
      const stop = page ? start + 11 : -1;
      return [start, stop];
    };
    const [start, stop] = range(page);
    let items = await appCache.lrange(`${field}-${id}`, start, stop);
    return items.map((i: any) => JSON.parse(i));
  }

  async setListInCache<T>({
    field,
    id,
    data,
    page,
  }: {
    field: CacheStoreField;
    id: 'all' | string;
    data: T[];
    page?: number;
  }) {
    await appCache.del(`${field}-${id}`);
    for (let x in data) {
      await appCache.rpush(`${field}-${id}`, JSON.stringify(data[x]));
      await appCache.expire(`${field}-${id}`, 60 * 60);
    }
    return await this.getListFromCache({ field, id, page });
  }

  async addToListFromCache<T>({
    field,
    id,
    data,
    page,
  }: {
    field: CacheStoreField;
    id: 'all' | string;
    data: T;
    page?: number;
  }) {
    await appCache.rpush(`${field}-${id}`, JSON.stringify(data));
    await appCache.expire(`${field}-${id}`, 60 * 60);
    return await this.getListFromCache({ field, id, page });
  }

  async upsertInListFromCache<T>({
    field,
    id,
    index,
    data,
    page,
  }: {
    field: CacheStoreField;
    id: 'all' | string;
    index: number;
    data: T;
    page?: number;
  }) {
    await appCache.lset(`${field}-${id}`, index, JSON.stringify(data));
    return await this.getListFromCache({ field, id, page });
  }

  async removeFromListFromCache<T>({
    field,
    id,
    data,
    page,
  }: {
    field: CacheStoreField;
    id: 'all' | string;
    data: T;
    page?: number;
  }) {
    await appCache.lrem(`${field}-${id}`, 1, JSON.stringify(data));
    return await this.getListFromCache({ field, id, page });
  }

  async removeFromCache({ field, id }: { field: CacheStoreField; id: string }) {
    await appCache.del(`${field}-${id}`);
    return;
  }
}
