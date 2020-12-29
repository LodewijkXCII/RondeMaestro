const express = require('express');
const Starlist = require('./startlist.model');
const queries = require('./startlist.queries');
const { startlist } = require('../../constants/tableNames');
const { update } = require('../../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { race } = req.query;
  try {
    const startlists = await queries.find({ race });
    if (startlist) {
      res.json(startlists);
    }
  } catch (error) {
    return next(error);
  }
});

router.put('/', async (req, res, next) => {
  if (req.body.updateValue) {
    try {
      const updateStartlist = await queries.updateWithdraw({
        cyclist_id,
        race,
        updateValue,
      });
      if (updateStartlist) {
        res.json(updateStartlist);
        console.log('Updating');
      }
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const updateStartlist = await queries.updateStartlist(
        req.body,
        req.params.id
      );
      if (updateStartlist) {
        res.json(updateStartlist);
        console.log('Updating');
      }
    } catch (error) {
      next(error);
    }
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newStartlistRider = await Starlist.query().insert({
      ...req.body,
      withdraw: false,
    });
    res.json(newStartlistRider);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
