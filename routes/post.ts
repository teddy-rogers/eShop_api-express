import express from 'express';
import { PostResolver } from '../resolvers';

const Router = express.Router();
const postResolver = new PostResolver();

Router.get('/', async (req, res) => {
  try {
    const country = req.query.country as string | undefined;
    const posts =
      country === undefined
        ? await postResolver.getAllPosts()
        : await postResolver.getAllTodaysCountryPosts(country);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.get('/:id', async (req, res) => {
  try {
    await postResolver.getPostById(req.params.id).then((post) => {
      res.status(200).json(post);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.put('/add', async (req, res) => {
  try {
    let postInputs = req.body;
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
    let postInputs = req.body;
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
