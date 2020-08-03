const express = require('express');
const url = require('url');

const queries = require('./cyclists.queries');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { country, team, speciality, name, startlist } = req.query;
  try {
    const cyclists = await queries.find({
      country,
      team,
      speciality,
      name,
      startlist,
    });
    if (cyclists) {
      res.json(cyclists);
    }
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const cyclist = await queries.get(parseInt(id, 10) || 0);
    if (cyclist) {
      res.json(cyclist);
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
