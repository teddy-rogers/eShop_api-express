import { Country } from '@prisma/database';
import express from 'express';
import { OrderResolver } from '../resolvers/order';

const Router = express.Router();
const orderResolver = new OrderResolver();

Router.get('/', async (req, res) => {
  try {
    const lang = req.session.storeCountry || Country.EN;
    await orderResolver.getAllOrders(req.session, lang).then((orders) => {
      res.status(200).json(orders);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.get('/:id', async (req, res) => {
  try {
    const lang = req.session.storeCountry || Country.EN;
    await orderResolver
      .getOneOrder(req.params.id, req.session, lang)
      .then((order) => {
        res.status(200).json(order);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.put('/create', async (req, res) => {
  try {
    const lang = req.session.storeCountry || Country.EN;
    await orderResolver
      .createOneOrder(req.body.order, req.session, lang)
      .then((order) => {
        res.status(200).json(order);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = Router;
