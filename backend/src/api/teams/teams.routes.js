const express = require('express');

const queries = require('./teams.queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const teams = await queries.find();
  res.json(teams);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const team = await queries.get(parseInt(id, 10) || 0);
    if (team) {
      res.json(team);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
