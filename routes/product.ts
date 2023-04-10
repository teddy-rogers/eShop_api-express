import express from 'express';
import { ProductResolver } from '../resolvers';

const Router = express.Router();
const productResolver = new ProductResolver();

Router.get('/', async (req, res) => {
  try {
    await productResolver
      .getProductWhere({
        keywords: req.query.keywords as string,
        filters: {
          price: req.query.price as string,
          size: req.query.size as string,
          gender: req.query.gender as string,
          color: req.query.color as string,
          category: req.query.category as string,
          season: req.query.season as string,
          sale: req.query.sale as string,
        },
        lastId: req.query.lastId as string,
      })
      .then((response) => {
        res.status(200).json(response);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.get('/:id', async (req, res) => {
  try {
    await productResolver.getProductById(req.params.id).then((product) => {
      res.status(200).json(product);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.put('/add', async (req, res) => {
  try {
    let productInputs = { ...req.body };
    const image = req.files?.image;
    if (image) productInputs = { ...productInputs, image };
    await productResolver.createProductWith(productInputs).then((product) => {
      res.status(200).json(product);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.put('/update', async (req, res) => {
  try {
    let productInputs = { ...req.body };
    const image = req.files?.image;
    if (image) productInputs = { ...productInputs, image };
    await productResolver.updateProductWith(productInputs).then((product) => {
      res.status(200).json(product);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = Router;
