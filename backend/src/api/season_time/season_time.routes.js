const express = require('express');

const queries = require('./season_time.queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const seasonTimes = await queries.find();
  res.json(seasonTimes);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const seasonTime = await queries.get(parseInt(id, 10) || 0);
    if (seasonTime) {
      res.json(seasonTime);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
