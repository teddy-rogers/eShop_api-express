import express from 'express';
import { OrderResolver } from '../resolvers';

const Router = express.Router();
const orderResolver = new OrderResolver();

Router.get('/', async (req, res) => {
  try {
    await orderResolver.getAllOrders(req.session).then((orders) => {
      res.status(200).json(orders);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.get('/:id', async (req, res) => {
  try {
    await orderResolver
      .getOneOrder(req.params.id, req.session)
      .then((order) => {
        res.status(200).json(order);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.put('/create', async (req, res) => {
  try {
    await orderResolver
      .createOneOrder(req.body.order, req.session)
      .then((order) => {
        res.status(200).json(order);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = Router;
