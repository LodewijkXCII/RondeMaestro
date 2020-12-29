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

function getStageTime(id) {
  const stageTime = stages.get(parseInt(id, 10) || 0);
  return stageTime;
}

router.post('/', async (req, res, next) => {
  const { stage_id } = req.body;
  try {
    const submitTime = new Date();
    const stageDate = await getStageTime(stage_id);
    const stagesTime = new Date(stageDate.date);

    if (submitTime < stagesTime) {
      const entry = await Entry.query().insert(req.body);
      res.json(entry);
    } else {
      res
        .status(403)
        .send({ error: 'Je kunt niet meer insturen, het is te laat' });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  // const { users_id, stage_id, cyclist_id } = req.body;
  try {
    const updateEntry = await queries.update(req.body);
    if (updateEntry) {
      res.json(updateEntry);
      console.log('Deleting');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
