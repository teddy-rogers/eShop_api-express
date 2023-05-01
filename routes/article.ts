import { Country } from '@prisma/database';
import express from 'express';
import { ArticleReslover } from '../resolvers/article';

const Router = express.Router();
const articleResolver = new ArticleReslover();

Router.get('/', async (req, res) => {
  try {
    const lang = req.session.storeCountry || Country.EN;
    await articleResolver
      .getAllArticlesFromCart(req.session, lang)
      .then((cart) => {
        res.status(200).json(cart);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.get('/add/:id', async (req, res) => {
  try {
    const lang = req.session.storeCountry || Country.EN;
    await articleResolver
      .addToCart(req.params.id, req.session, lang)
      .then((cart) => {
        res.status(200).json(cart);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.delete('/remove/:id', async (req, res) => {
  try {
    const lang = req.session.storeCountry || Country.EN;
    await articleResolver
      .removeFromCart(req.params.id, req.session, lang)
      .then((cart) => {
        res.status(200).json(cart);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.delete('/reset', async (req, res) => {
  try {
    const lang = req.session.storeCountry || Country.EN;
    await articleResolver.resetCart(req.session, lang).then((cart) => {
      res.status(200).json(cart);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = Router;
