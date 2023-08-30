import { Country } from '@prisma/database';
import express from 'express';
import { PostSectionResolver } from '../resolvers/postSection';

const Router = express.Router();
const postSectionResolver = new PostSectionResolver();

Router.get('/:postId', async (req, res) => {
  try {
    const lang =
      (req.session.storeCountry?.toUpperCase() as Country) || Country.EN;
    await postSectionResolver
      .getAllPostSections(req.params.postId, lang)
      .then((sections) => {
        res.status(200).json(sections);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.put('/add', async (req, res) => {
  try {
    let postSectionInputs = req.body;
    if (req.body.titleFR || req.body.titleEN) {
      postSectionInputs.title = {
        FR: req.body.titleFR,
        EN: req.body.titleEN,
      };
    }
    if (req.body.paragraphFR || req.body.paragraphEN) {
      postSectionInputs.paragraph = {
        FR: req.body.paragraphFR,
        EN: req.body.paragraphEN,
      };
    }
    ['titleFR', 'titleEN', 'paragraphFR', 'paragraphEN'].forEach((key) => {
      delete postSectionInputs[key];
    });
    const image = req.files?.image;
    if (image) postSectionInputs = { ...postSectionInputs, image };
    await postSectionResolver
      .createPostSection(postSectionInputs)
      .then((section) => {
        res.status(200).json(section);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.put('/update', async (req, res) => {
  try {
    let postSectionInputs = req.body;
    if (req.body.titleFR || req.body.titleEN) {
      postSectionInputs.title = {
        id: req.body.titleId,
        FR: req.body.titleFR,
        EN: req.body.titleEN,
      };
    }
    if (req.body.paragraphFR || req.body.paragraphEN) {
      postSectionInputs.paragraph = {
        id: req.body.paragraphId,
        FR: req.body.paragraphFR,
        EN: req.body.paragraphEN,
      };
    }
    [
      'titleId',
      'titleFR',
      'titleEN',
      'paragraphId',
      'paragraphFR',
      'paragraphEN',
    ].forEach((key) => {
      delete postSectionInputs[key];
    });
    const image = req.files?.image;
    if (image) postSectionInputs = { ...postSectionInputs, image };
    await postSectionResolver
      .updatePostSection(postSectionInputs)
      .then((section) => {
        res.status(200).json(section);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = Router;
