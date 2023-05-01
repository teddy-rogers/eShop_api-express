import { appCache } from '../helpers/redis';
import { CacheStore } from '../types/Cache';

export class CacheService {
  async get({ store, id }: { store: CacheStore; id: string | 'all' }) {
    return await appCache()
      .get(`${store}-${id}`)
      .then((obj) => {
        if (!obj) return;
        return JSON.parse(obj);
      });
  }

  async set<T>({
    store,
    id,
    data,
  }: {
    store: CacheStore;
    id: 'all' | string;
    data: T;
  }) {
    const cacheResponse = await appCache().set(
      `${store}-${id}`,
      JSON.stringify(data),
    );
    await appCache().expire(`${store}-${id}`, 60 * 60);
    if (cacheResponse === 'OK') {
      return await this.get({ store, id });
    }
  }

  async getList({
    store,
    id,
    page,
  }: {
    store: CacheStore;
    id: string | 'all';
    page?: number;
  }) {
    const range = (page?: number) => {
      const start = page ? (page - 1) * 12 : 0;
      const stop = page ? start + 11 : -1;
      return [start, stop];
    };
    const [start, stop] = range(page);
    let items = await appCache().lrange(`${store}-${id}`, start, stop);
    return items.map((i: any) => JSON.parse(i));
  }

  async setList<T>({
    store,
    id,
    data,
    page,
  }: {
    store: CacheStore;
    id: 'all' | string;
    data: T[];
    page?: number;
  }) {
    await appCache().del(`${store}-${id}`);
    for (let x in data) {
      await appCache().rpush(`${store}-${id}`, JSON.stringify(data[x]));
      await appCache().expire(`${store}-${id}`, 60 * 60);
    }
    return await this.getList({ store, id, page });
  }

  async updateList<T>({
    store,
    id,
    data,
    page,
  }: {
    store: CacheStore;
    id: 'all' | string;
    data: T;
    page?: number;
  }) {
    await appCache().rpush(`${store}-${id}`, JSON.stringify(data));
    await appCache().expire(`${store}-${id}`, 60 * 60);
    return await this.getList({ store, id, page });
  }

  async upsertList<T>({
    store,
    id,
    index,
    data,
    page,
  }: {
    store: CacheStore;
    id: 'all' | string;
    index: number;
    data: T;
    page?: number;
  }) {
    await appCache().lset(`${store}-${id}`, index, JSON.stringify(data));
    return await this.getList({ store, id, page });
  }

  async deleteList<T>({
    store,
    id,
    data,
    page,
  }: {
    store: CacheStore;
    id: 'all' | string;
    data: T;
    page?: number;
  }) {
    await appCache().lrem(`${store}-${id}`, 1, JSON.stringify(data));
    return await this.getList({ store, id, page });
  }

  async delete({ store, id }: { store: CacheStore; id: string }) {
    await appCache().del(`${store}-${id}`);
    return;
  }
}
