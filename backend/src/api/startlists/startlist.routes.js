const express = require('express');

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
  const { cyclist_id, race } = req.body;
  try {
    const updateStartlist = await queries.update({
      cyclist_id,
      race,
    });
    if (updateStartlist) {
      res.json(updateStartlist);
      console.log('Updating');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
