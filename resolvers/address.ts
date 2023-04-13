import { AddressService } from '../services';
import { AddressInputs, SessionType } from '../types';

export class AddressResolver {
  private addressService = new AddressService();

  async getAllAddress(session: SessionType) {
    if (!session.userSession) throw 'User must be connected first!';
    return await this.addressService.findManyByUserId(
      session.userSession.userId,
    );
  }

  async getOneAddress(id: string, session: SessionType) {
    if (!session.userSession) throw 'User must be connected first!';
    return await this.addressService.findById(id);
  }

  async createAddress(address: AddressInputs, session: SessionType) {
    if (!session.userSession) throw 'User must be connected first!';
    return await this.addressService.create(
      address,
      session.userSession.userId,
    );
  }

  async updateAddress(address: AddressInputs, session: SessionType) {
    if (!session.userSession) throw 'User must be connected first!';
    return await this.addressService.update(address);
  }

  async deleteAddress(id: string, session: SessionType) {
    if (!session.userSession) throw 'User must be connected first!';
    await this.addressService.delete(id, session.userSession.userId);
  }
}
