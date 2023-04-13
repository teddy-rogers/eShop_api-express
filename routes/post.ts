import express from 'express';
import { PostResolver } from '../resolvers';

const Router = express.Router();

const postResolver = new PostResolver();

Router.get('/', async (req, res) => {
  try {
    await postResolver.getAllPosts().then((posts) => {
      res.status(200).json(posts);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = Router;
