import express from 'express';
import { PostSectionResolver } from '../resolvers';

const Router = express.Router();
const postSectionResolver = new PostSectionResolver();

Router.get('/:postId', async (req, res) => {
  try {
    await postSectionResolver
      .getAllPostSections(req.params.postId)
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
