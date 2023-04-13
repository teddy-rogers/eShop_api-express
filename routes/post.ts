import express from 'express';

const Router = express.Router();

Router.get('/', async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = Router;
