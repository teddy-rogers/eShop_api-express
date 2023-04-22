import { Country } from '@prisma/database';
import { v4 as createUniqueId } from 'uuid';
import { CacheService } from '../services/cache';
import { CacheStore, SessionType } from '../types/Cache';
import { UserResponse } from '../types/User';

export class SessionHelper {
  private cacheService = new CacheService();

  shuffleSessionSecrets(secretsArray: string[]) {
    return secretsArray.sort(() => 0.5 - Math.random());
  }

  createGuestSession({
    session,
    storeCountry,
  }: {
    session: SessionType;
    storeCountry: Country;
  }) {
    session.guestSession = {
      connectedOn: new Date(),
      guestId: createUniqueId(),
    };
    session.storeCountry = storeCountry;
  }

  createUserSession({
    session,
    user,
  }: {
    session: SessionType;
    user: UserResponse;
  }) {
    session.userSession = {
      connectedOn: new Date(),
      userId: user.id,
    };
    session.storeCountry = user.storeCountry;
  }

  getCurrentSessionId(session: SessionType) {
    return session.guestSession?.guestId || session.userSession?.userId;
  }

  isAuthenticate(session: SessionType) {
    return (session && session.userSession) || false;
  }

  async initUserSession({
    session,
    user,
  }: {
    session: SessionType;
    user: UserResponse;
  }) {
    await this.cacheService.delete({
      store: CacheStore.cart,
      id: session.guestSession!.guestId,
    });
    session.regenerate(async () => {
      this.createUserSession({ session, user });
      delete session.guestSession;
      await this.cacheService.setList({
        store: CacheStore.cart,
        id: user.id,
        data: user.cart,
      });
      session.save();
    });
    return;
  }

  getCurrentLocal(acceptLanguage: string | undefined) {
    const currentDeviceLanguage = acceptLanguage
      ?.split(';')[0]
      .split(',')[0]
      .split('-')[0];
    return (currentDeviceLanguage as Country) || Country.FR;
  }
}
