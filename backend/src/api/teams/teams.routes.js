const express = require('express');
const Team = require('./teams.model');
const queries = require('./teams.queries');
const router = express.Router();

const { uploadTeam: upload } = require('../../lib/aws-upload');

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

router.post('/', upload.single('image'), async (req, res, next) => {
  const data = {
    ...req.body,
    image_url: req.file.location,
  };

  try {
    const newTeam = await Team.query().insert({
      name: data.team_name,
      abbreviation: data.abbreviation,
      level: data.level,
      country_id: parseInt(data.country),
      year: parseInt(data.year),
      image_url: data.image_url,
    });
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
