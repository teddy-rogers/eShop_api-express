import express from 'express';
import { AddressResolver } from '../resolvers';

const addressResolver = new AddressResolver();
const Router = express.Router();

Router.get('/', async (req, res) => {
  try {
    await addressResolver.getAllAddress(req.session).then((response) => {
      res.status(200).json(response);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.get('/:id', async (req, res) => {
  try {
    await addressResolver
      .getOneAddress(req.params.id, req.session)
      .then((response) => {
        res.status(200).json(response);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.put('/create', async (req, res) => {
  try {
    await addressResolver
      .createAddress(req.body.address, req.session)
      .then((response) => {
        res.status(200).json(response);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.put('/update', async (req, res) => {
  try {
    await addressResolver
      .updateAddress(req.body.address, req.session)
      .then((response) => {
        res.status(200).json(response);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.delete('/delete', async (req, res) => {
  try {
    await addressResolver
      .deleteAddress(req.body.id, req.session)
      .then((response) => {
        res.status(200).json(response);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = Router;
