import { Country } from '@prisma/database';
import express from 'express';
import { PostResolver } from '../resolvers/post';

const Router = express.Router();
const postResolver = new PostResolver();

Router.get('/', async (req, res) => {
  try {
    const country = req.query.country as string | undefined;
    const lang =
      (req.session.storeCountry?.toUpperCase() as Country) || Country.EN;
    const posts =
      country === undefined
        ? await postResolver.getAllPosts(lang)
        : await postResolver.getAllTodaysCountryPosts(country, lang);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.get('/:id', async (req, res) => {
  try {
    const lang =
      (req.session.storeCountry?.toUpperCase() as Country) || Country.EN;
    await postResolver.getPostById(req.params.id, lang).then((post) => {
      res.status(200).json(post);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.put('/add', async (req, res) => {
  try {
    let postInputs = {
      ...req.body,
      title: { FR: req.body.titleFR, EN: req.body.titleEN },
      description: {
        FR: req.body.descriptionFR,
        EN: req.body.descriptionEN,
      },
    };
    ['titleFR', 'titleEN', 'descriptionFR', 'descriptionEN'].forEach((key) => {
      delete postInputs[key];
    });
    const image = req.files?.image;
    if (image) postInputs = { ...postInputs, image };
    await postResolver.createPost(postInputs).then((post) => {
      res.status(200).json(post);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.put('/update', async (req, res) => {
  try {
    let postInputs = {
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
      delete postInputs[key];
    });
    const image = req.files?.image;
    if (image) postInputs = { ...postInputs, image };
    await postResolver.updatePost(postInputs).then((post) => {
      res.status(200).json(post);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = Router;
