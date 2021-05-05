const express = require('express');
const Startlist = require('./startlist.model');
const queries = require('./startlist.queries');
const tableNames = require('../../constants/tableNames');
const { update } = require('../../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const race_id = parseInt(req.query.race_id, 10);

  try {
    const startlists = await queries.find(race_id);

    if (startlists) {
      res.json(startlists);
    }
  } catch (error) {
    return next(error);
  }
});

router.put('/update', async (req, res, next) => {
  try {
    const race_id = parseInt(req.query.race_id, 10);
    // console.log(race_id);

    const { cyclist_id, race_number } = req.body;
    const body = {
      cyclist_id,
      race_number,
    };
    // console.log(body);

    const updateStartlist = await queries.updateStartlist(body, race_id);
    console.log('return:', updateStartlist);
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
    const renners = req.body.map((renner) => {
      return {
        ...renner,
        withdraw: false,
      };
    });

    const newStartlistRider = await Startlist.query().insert(renners);

    res.json(newStartlistRider);
  } catch (error) {
    return next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const { cyclist_id, race_id } = req.body;
    const removeStartlist = await queries.deleteStartlist(cyclist_id, race_id);

    res.json(removeStartlist);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
