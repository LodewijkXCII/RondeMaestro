const express = require('express');
const Stage = require('./stages.model');
const queries = require('./stages.queries');
const { stage } = require('../../constants/tableNames');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { race } = req.query;
  try {
    const stages = await queries.find({ race });
    if (stage) {
      res.json(stages);
    }
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const stage = await queries.get(parseInt(id, 10) || 0);
    if (stage) {
      res.json(stage);
    }
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  /* First check if user want to change status of stage, else update entire stage */
  if (req.body.setDone === true) {
    try {
      const updateStage = await queries.setDone({
        id,
      });
      if (updateStage) {
        res.json(updateStage);
        console.log('Updating set done of stage');
      }
    } catch (error) {
      return next(error);
    }
  } else {
    try {
      const updateStage = await queries.updateStage(req.body, req.params.id);
      if (updateStage) {
        res.json(updateStage);
        console.log('Updating');
      }
    } catch (error) {
      next(error);
    }
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newStage = await Stage.query().insert(req.body);
    res.json(newStage);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
