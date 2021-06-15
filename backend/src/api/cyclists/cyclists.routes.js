const express = require('express');
const url = require('url');
const Cyclist = require('./cyclists.model');
const queries = require('./cyclists.queries');
const router = express.Router();

const { uploadCyclist: upload } = require('../../lib/aws-upload');

router.get('/', async (req, res, next) => {
  console.log(req.query);
  const { country, team_id, speciality, name, startlist, limit, offset } =
    req.query;
  // const { startlist } = req.params;
  try {
    const cyclists = await queries.find({
      country,
      team_id,
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

router.post('/', upload.single('image'), async (req, res, next) => {
  const data = {
    ...req.body,
    image_url: req.file.location,
  };

  try {
    const newCyclist = await Cyclist.query().insert({
      first_name: data.first_name,
      last_name: data.last_name,
      country_id: parseInt(data.country),
      team_id: parseInt(data.team),
      image_url: data.image_url,
      speciality_id: parseInt(data.speciality, null),
    });
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
