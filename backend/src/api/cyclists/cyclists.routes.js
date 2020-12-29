const express = require('express');
const url = require('url');
const Cyclist = require('./cyclists.model');

const queries = require('./cyclists.queries');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const {
    country,
    team,
    speciality,
    name,
    startlist,
    limit,
    offset,
  } = req.query;
  // const { startlist } = req.params;
  try {
    const cyclists = await queries.find({
      country,
      team,
      speciality,
      name,
      startlist,
      limit,
      offset,
    });
    if (cyclists) {
      res.json(cyclists);
    }
  } catch (error) {
    return next(error);
  }
});

router.get('/cyclist/:id', async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
  try {
    const newCyclist = await Cyclist.query().insert(req.body);
    res.json(newCyclist);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updateCyclist = await queries.update(req.body, req.params.id);
    if (updateCyclist) {
      res.json(updateCyclist);
      console.log('Updating');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
