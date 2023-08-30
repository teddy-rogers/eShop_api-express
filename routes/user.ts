import { Country } from '@prisma/database';
import express from 'express';
import { UserResolver } from '../resolvers/user';

const Router = express.Router();
const userResolver = new UserResolver();

Router.put('/sign-in', async (req, res) => {
  try {
    const lang =
      (req.session.storeCountry?.toUpperCase() as Country) || Country.EN;
    await userResolver
      .signInUser(
        {
          email: req.body.user.email.toLowerCase(),
          password: req.body.user.password,
          firstName: req.body.user.firstName,
          lastName: req.body.user.lastName,
          storeCountry: req.body.user.storeCountry?.toUpperCase() as Country,
        },
        req.session,
        lang,
      )
      .then((createdUser) => {
        res.status(200).json(createdUser);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.put('/log-in', async (req, res) => {
  try {
    const lang =
      (req.session.storeCountry?.toUpperCase() as Country) || Country.EN;
    await userResolver
      .logInUser(
        {
          email: req.body.login.email.toLowerCase(),
          password: req.body.login.password,
        },
        req.session,
        lang,
      )
      .then((user) => {
        res.status(200).json(user);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.get('/log-out', async (req, res) => {
  try {
    await userResolver.logOutUser(req.session, () => {
      res.status(200).json('User is logged out.');
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = Router;
