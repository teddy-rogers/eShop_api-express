import express from 'express';
// import { ProductResolver } from '../resolvers/product';
const Router = express.Router();

// const productResolver = new ProductResolver();

Router.post('/', async (_, res) => {
  try {
    res.status(200).json('ok');
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = Router;
