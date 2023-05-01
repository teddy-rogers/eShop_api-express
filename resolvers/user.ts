import { Country } from '@prisma/database';
import bcrypt from 'bcryptjs';
import { v4 as createUniqueId } from 'uuid';
import { LoginHelper } from '../helpers/login';
import { SessionHelper } from '../helpers/session';
import { CacheService } from '../services/cache';
import { UserService } from '../services/user';
import { CacheStore, SessionType } from '../types/Cache';
import { LoginInputs, UserInputs } from '../types/User';
import { ArticleReslover } from './article';

export class UserResolver {
  private cacheService = new CacheService();
  private userService = new UserService();
  private articleResolver = new ArticleReslover();

  private sessionHelper = new SessionHelper();
  private loginHelper = new LoginHelper();

  private async verifyCredentials(login: LoginInputs) {
    return await this.userService
      .findCredentialsByEmail(login.email)
      .then(
        async ({ password: userPassword }) =>
          await this.loginHelper.comparePassword(login.password, userPassword),
      );
  }

  async signInUser(
    userInputs: UserInputs,
    session: SessionType,
    lang: Country,
  ) {
    if (!session) throw 'Something went wrong while getting session';
    const existingUser = await this.userService.findFirstUserByEmail(
      userInputs.email,
    );
    if (existingUser) throw 'Email already taken.';
    this.loginHelper.credentialsInputsValidation({
      email: userInputs.email,
      password: userInputs.password,
    });
    const [user, guestCart] = await Promise.all([
      await this.userService.create({
        id: createUniqueId(),
        email: userInputs.email,
        password: await bcrypt.hash(userInputs.password, 8),
        firstName: userInputs.firstName,
        lastName: userInputs.lastName,
        storeCountry: userInputs.storeCountry as Country,
      }),
      await this.cacheService.getList({
        store: CacheStore.cart,
        id: session.guestSession?.guestId || '',
      }),
    ]);
    const transferedCart =
      await this.articleResolver.transferGuestCartToUserCart(
        user.id,
        guestCart,
        lang,
      );
    await this.sessionHelper.initUserSession({ session, user });
    return { ...user, cart: [...user.cart, ...transferedCart] };
  }

  async logInUser(login: LoginInputs, session: SessionType, lang: Country) {
    if (session.userSession) throw 'User already logged in !';
    const [_, user, guestCart] = await Promise.all([
      await this.verifyCredentials(login),
      await this.userService.findByEmail(login.email),
      await this.cacheService.getList({
        store: CacheStore.cart,
        id: session.guestSession?.guestId || '',
      }),
    ]);
    const transferedCart =
      await this.articleResolver.transferGuestCartToUserCart(
        user.id,
        guestCart,
        lang,
      );
    await this.sessionHelper.initUserSession({ session, user });
    return { ...user, cart: [...user.cart, ...transferedCart] };
  }

  async logOutUser(session: SessionType, callback: VoidFunction) {
    if (!session.userSession) throw 'User already logged out..';
    await this.cacheService
      .delete({
        store: CacheStore.cart,
        id: session.userSession.userId,
      })
      .then(() => session.destroy(callback));
  }
}
