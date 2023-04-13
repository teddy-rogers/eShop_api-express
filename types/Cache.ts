import { Country } from '@prisma/database';
import 'express-session';
import { Session, SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userSession: {
      connectedOn: Date;
      userId: string;
    };
    guestSession: {
      connectedOn: Date;
      guestId: string;
    };
    storeCountry: Country;
  }
}

export type SessionType = Session & Partial<SessionData>;

export enum CacheStore {
  products = 'products',
  cart = 'cart',
  orders = 'orders',
}
