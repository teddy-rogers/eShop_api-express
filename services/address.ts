import { PrismaClient } from '@prisma/database';
import { CreateAddressFields, UpdateAddressFields } from '../types/Address';

export class AddressService {
  private db = new PrismaClient();

  async findManyByUserId(userId: string) {
    try {
      return await this.db.address.findMany({
        where: { userId },
      });
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await this.db.address
        .findFirst({
          where: { id },
        })
        .then((address) => {
          if (!address)
            throw `Something went wrong while looking for address ${id}.`;
          return address;
        });
    } catch (error) {
      throw error;
    }
  }

  async create(address: CreateAddressFields, userId: string) {
    try {
      return await this.db.address
        .create({
          data: {
            ...address,
            user: {
              connect: { id: userId! },
            },
          },
        })
        .then((address) => {
          if (!address)
            throw 'Something went wrong while creating new address.';
          return address;
        });
    } catch (error) {
      throw error;
    }
  }

  async update(address: UpdateAddressFields) {
    try {
      return await this.db.address
        .update({
          where: { id: address.id },
          data: { ...address },
        })
        .then((addressRes) => {
          if (!addressRes)
            throw `Something went wrong while updating address ${address.id}.`;
          return addressRes;
        });
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string, userId: string) {
    try {
      return await this.db.user
        .update({
          where: { id: userId },
          data: {
            addresses: {
              disconnect: { id },
            },
          },
        })
        .then(() => 'ok');
    } catch (error) {
      throw error;
    }
  }
}
