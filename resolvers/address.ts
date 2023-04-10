import { AddressService } from '../services';
import { AddressInputs, SessionType } from '../types';

export class AddressResolver {
  private addressService = new AddressService();

  async getAllAddress(session: SessionType) {
    if (!session.userSession) throw 'User must be connected first!';
    return await this.addressService.findManyAddressByUserId(
      session.userSession.userId,
    );
  }

  async getOneAddress(id: string, session: SessionType) {
    if (!session.userSession) throw 'User must be connected first!';
    return await this.addressService.findAddressById(id);
  }

  async createAddress(address: AddressInputs, session: SessionType) {
    if (!session.userSession) throw 'User must be connected first!';
    return await this.addressService.createOneAddress(
      address,
      session.userSession.userId,
    );
  }

  async updateAddress(address: AddressInputs, session: SessionType) {
    if (!session.userSession) throw 'User must be connected first!';
    return await this.addressService.updateAddressById(address);
  }

  async deleteAddress(id: string, session: SessionType) {
    if (!session.userSession) throw 'User must be connected first!';
    await this.addressService.deleteAddressById(id, session.userSession.userId);
  }
}
