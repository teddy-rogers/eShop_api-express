import { Country } from '@prisma/database';
import bcrypt from 'bcryptjs';
import { LoginHelper, SessionHelper } from '../helpers';
import { CacheService, UserService } from '../services';
import { CacheStore, LoginInputs, SessionType, UserInputs } from '../types';
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

  async signInUser(userInputs: UserInputs, session: SessionType) {
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
    return Promise.all([
      await this.articleResolver.transferGuestCartToUserCart(
        user.id,
        guestCart,
      ),
      await this.sessionHelper.initUserSession({ session, user }),
    ]).then(() => user);
  }

  async logInUser(login: LoginInputs, session: SessionType) {
    if (session.userSession) throw 'User already logged in !';
    const [_, user, guestCart] = await Promise.all([
      await this.verifyCredentials(login),
      await this.userService.findByEmail(login.email),
      await this.cacheService.getList({
        store: CacheStore.cart,
        id: session.guestSession?.guestId || '',
      }),
    ]);
    return Promise.all([
      await this.articleResolver.transferGuestCartToUserCart(
        user.id,
        guestCart,
      ),
      await this.sessionHelper.initUserSession({ session, user }),
    ]).then(() => user);
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
