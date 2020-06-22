const express = require('express');

const queries = require('./stage_type.queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const stageTypes = await queries.find();
  res.json(stageTypes);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const stageType = await queries.get(parseInt(id, 10) || 0);
    if (stageType) {
      res.json(stageType);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
