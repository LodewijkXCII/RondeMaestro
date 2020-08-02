const express = require('express');
const Result = require('./results.model');
const queries = require('./results.queries');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { stage_id } = req.query;
  try {
    const entries = await queries.find({ stage_id });
    if (entries) {
      res.json(entries);
    }
  } catch (error) {
    return next(error);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const entry = await Result.query().insert(req.body);
    res.json(entry)

  } catch (error) {
    return next(error)
  }
})

router.put('/', async (req, res, next) => {
  const { position, stage_id, cyclist_id } = req.body
  try {
    const updateEntry = await queries.update({ position, stage_id, cyclist_id })
    if (updateEntry) {
      res.json(updateEntry)
      console.log('putting')
    }
  } catch (error) {
    throw (error)
  }
})

module.exports = router;
