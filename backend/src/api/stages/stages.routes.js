const express = require('express');

const queries = require('./stages.queries');
const { stage } = require('../../constants/tableNames');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { race } = req.query;
  try {
    const stages = await queries.find({ race });
    if (stage) {
      res.json(stages);
    }
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const stage = await queries.get(parseInt(id, 10) || 0);
    if (stage) {
      res.json(stage);
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
