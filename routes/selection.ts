import { Country } from '@prisma/database';
import express from 'express';
import { SelectionResolver } from '../resolvers/selection';

const Router = express.Router();
const selectionResolver = new SelectionResolver();

Router.get('/', async (req, res) => {
  try {
    const lang = req.session.storeCountry || Country.EN;
    await selectionResolver
      .getSelectionWhere(
        {
          keywords: req.query.keywords as string,
          filters: {
            isActive: req.query.isActive as boolean | undefined,
            countries: req.query.countries as string[],
            dateStart: req.query.dateStart as Date | undefined,
            dateEnd: req.query.dateEnd as Date | undefined,
          },
          lastId: req.query.lastId as string,
        },
        lang,
      )
      .then((selections) => {
        res.status(200).json(selections);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.get('/:id', async (req, res) => {
  try {
    const lang = req.session.storeCountry || Country.EN;
    await selectionResolver
      .getSelectionById(req.params.id, lang)
      .then((selection) => {
        res.status(200).json(selection);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.put('/add', async (req, res) => {
  try {
    let selectionInputs = {
      ...req.body,
      title: { FR: req.body.titleFR, EN: req.body.titleEN },
      description: { FR: req.body.descriptionFR, EN: req.body.descriptionEN },
    };
    ['titleFR', 'titleEN', 'descriptionFR', 'descriptionEN'].forEach((key) => {
      delete selectionInputs[key];
    });
    const image = req.files?.image;
    if (image) selectionInputs = { ...selectionInputs, image };
    await selectionResolver
      .createSelectionWith(selectionInputs)
      .then((selection) => {
        res.status(200).json(selection);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.put('/update', async (req, res) => {
  try {
    let selection = {
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
      delete selection[key];
    });
    const image = req.files?.image;
    if (image) selection = { ...selection, image };
    await selectionResolver.updateSelectionWith(selection).then((selection) => {
      res.status(200).json(selection);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = Router;
