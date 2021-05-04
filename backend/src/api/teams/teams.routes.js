const express = require('express');
const Team = require('./teams.model');
const queries = require('./teams.queries');
const router = express.Router();

router.get('/', async (req, res) => {
  const { year } = req.query;

  const teams = await queries.find(year);
  res.json(teams);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const team = await queries.get(parseInt(id, 10) || 0);
    if (team) {
      res.json(team);
    } else {
      next();
    }
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newTeam = await Team.query().insert(req.body);
    res.json(newTeam);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedTeam = await queries.update(req.body, req.params.id);
    if (updatedTeam) {
      res.json(updatedTeam);
      console.log('Updating');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
