import { PrismaClient } from '@prisma/database';
import { UserFields } from '../types/User';

export class UserService {
  private db = new PrismaClient();

  async create(user: UserFields) {
    try {
      return await this.db
        .$transaction([
          this.db.credentials.create({
            data: { email: user.email, password: user.password },
          }),
          this.db.user.create({
            data: {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              storeCountry: user.storeCountry,
            },
            include: { cart: true },
          }),
        ])
        .then(([_, userResponse]) => {
          if (!userResponse)
            throw 'User and credentials not created in database.';
          return userResponse;
        });
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.db.user
        .findFirst({
          where: { email },
          include: { cart: true },
        })
        .then((user) => {
          if (!user) throw `Cannot find user with email : ${email}.`;
          return user;
        });
    } catch (error) {
      throw error;
    }
  }

  async findFirstUserByEmail(email: string) {
    try {
      return await this.db.user
        .findFirst({
          where: { email },
        })
        .then((user) => {
          return user;
        });
    } catch (error) {
      throw error;
    }
  }

  async findCredentialsByEmail(email: string) {
    try {
      return await this.db.credentials
        .findFirst({ where: { email } })
        .then((credentials) => {
          if (!credentials) throw 'The email is not be valid.';
          return credentials;
        });
    } catch (error) {
      throw error;
    }
  }
}
