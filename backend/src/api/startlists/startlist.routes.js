const express = require('express');

const queries = require('./startlist.queries');
const { startlist } = require('../../constants/tableNames');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { race, name } = req.query;
  try {
    const startlists = await queries.find({ race, name });
    if (startlist) {
      res.json(startlists);
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
