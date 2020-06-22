const express = require('express');

const queries = require('./countries.queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const countries = await queries.find();
  res.json(countries);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const country = await queries.get(parseInt(id, 10) || 0);
    if (country) {
      res.json(country);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
