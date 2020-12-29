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
    res.json(entry);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedResult = await queries.update(req.body, req.params.id);
    if (updatedResult) {
      res.json(updatedResult);
      console.log('Updating');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/score', async (req, res, next) => {
  const { stage_id, race_id, user_id } = req.query;

  try {
    const entries = await queries.get({ stage_id, race_id, user_id });
    if (entries) {
      res.json(entries);
    }
  } catch (error) {
    return next(error);
  }
});

router.get('/totalscore', async (req, res, next) => {
  const { stage_id, race_id, user_id } = req.query;

  try {
    const entries = await queries.getSUM({ stage_id, race_id, user_id });
    if (entries) {
      res.json(entries);
    }
  } catch (error) {
    return next(error);
  }
});

router.get('/userscore', async (req, res, next) => {
  const { user_id } = req.query;
  try {
    const entries = await queries.getUserScores({ user_id });
    if (entries) {
      res.json(entries);
    }
  } catch (error) {
    return next(error);
  }
});

router.get('/rennerscore', async (req, res, next) => {
  const { stage_id, race_id, user_id } = req.query;

  try {
    const entries = await queries.getSUMRenner({ stage_id, race_id, user_id });
    if (entries) {
      res.json(entries);
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
