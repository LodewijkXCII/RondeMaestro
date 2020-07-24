const express = require('express');
const Entry = require('./entries.model');
const queries = require('./entries.queries');
const stages = require('../stages/stages.queries');
const { update } = require('../../db');
const { stage } = require('../../constants/tableNames');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { users_id, stage_id } = req.query;
  try {
    const entries = await queries.find({ users_id, stage_id });
    if (entries) {
      res.json(entries);
    }
  } catch (error) {
    return next(error);
  }
});

//TODO IF DATE IS > 12:00 ERROR
function getStageTime(id) {
  const stageTime = stages.get(parseInt(id, 10) || 0)
  return stageTime
};

router.post('/', async (req, res, next) => {
  const { stage_id } = req.body
  try {
    const submitTime = Date.now().toString();
    const stagesTimes = await getStageTime(stage_id);

    console.log(stagesTimes.date);

    const entry = await Entry.query().insert(req.body);
    res.json(entry)
    console.log(submitTime);
  } catch (error) {
    throw (error)
  }
})

router.put('/', async (req, res, next) => {
  const { users_id, stage_id, cyclist_id } = req.body
  try {
    const updateEntry = await queries.update({ users_id, stage_id, cyclist_id })
    if (updateEntry) {
      res.json(updateEntry)
      console.log('putting')
    }
  } catch (error) {
    throw (error)
  }
})

module.exports = router;
