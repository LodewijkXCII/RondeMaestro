const express = require('express');

const queries = require('./speciality.queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const speciality = await queries.find();
  res.json(speciality);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const speciality = await queries.get(parseInt(id, 10) || 0);
    if (speciality) {
      res.json(speciality);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
