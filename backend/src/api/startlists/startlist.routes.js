const express = require('express');
const Starlist = require('./startlist.model');
const queries = require('./startlist.queries');
const { startlist } = require('../../constants/tableNames');
const { update } = require('../../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { race_id } = req.query;
  try {
    const startlists = await queries.find({ race_id });
    if (startlist) {
      res.json(startlists);
    }
  } catch (error) {
    return next(error);
  }
});

router.put('/update', async (req, res, next) => {
  try {
    const race_id = parseInt(req.query.race_id, 10);
    delete req.body.updateValue;
    console.log(req.body);

    const updateStartlist = await queries.updateStartlist(req.body, race_id);
    if (updateStartlist) {
      res.json(updateStartlist);
      console.log('Updating');
    }
  } catch (error) {
    next(error);
  }
});

router.put('/withdraw', async (req, res, next) => {
  try {
    const updateStartlist = await queries.updateWithdraw(req.body);
    if (updateStartlist) {
      res.json(updateStartlist);
      console.log('Updating');
    }
  } catch (error) {
    next(error);
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
