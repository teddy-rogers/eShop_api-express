import { Country } from '@prisma/database';
import express from 'express';
import { ProductResolver } from '../resolvers';

const Router = express.Router();
const productResolver = new ProductResolver();

Router.get('/', async (req, res) => {
  try {
    const lang = req.session.storeCountry || Country.EN;
    await productResolver
      .getProductWhere(
        {
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
        },
        lang,
      )
      .then((response) => {
        res.status(200).json(response);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.get('/:id', async (req, res) => {
  try {
    const lang = req.session.storeCountry || Country.EN;
    await productResolver
      .getProductById(req.params.id, lang)
      .then((product) => {
        res.status(200).json(product);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.put('/add', async (req, res) => {
  try {
    let productInputs = {
      ...req.body,
      title: { FR: req.body.titleFR, EN: req.body.titleEN },
      description: { FR: req.body.descriptionFR, EN: req.body.descriptionEN },
    };
    ['titleFR', 'titleEN', 'descriptionFR', 'descriptionEN'].forEach((key) => {
      delete productInputs[key];
    });
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
    let productInputs = {
      ...req.body,
      title: {
        id: req.body.titleId,
        FR: req.body.titleFR,
        EN: req.body.titleEN,
      },
      description: {
        id: req.body.descriptionId,
        FR: req.body.descriptionFR,
        EN: req.body.descriptionEN,
      },
    };
    [
      'titleId',
      'titleFR',
      'titleEN',
      'descriptionId',
      'descriptionFR',
      'descriptionEN',
    ].forEach((key) => {
      delete productInputs[key];
    });
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
