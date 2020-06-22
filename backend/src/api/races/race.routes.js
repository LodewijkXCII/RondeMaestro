const express = require('express');

const queries = require('./race.queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const races = await queries.find();
  res.json(races);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const race = await queries.get(parseInt(id, 10) || 0);
    if (race) {
      res.json(race);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
