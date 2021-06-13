const express = require('express');
const Stage = require('./stages.model');
const queries = require('./stages.queries');
const { stage } = require('../../constants/tableNames');
const { query } = require('./stages.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { race_id, year, single } = req.query;

  try {
    const stages = await queries.find({ race_id, year, single });
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
router.get('/testing', async (req, res, next) => {
  // const { id } = req.params;

  const { race, year } = req.query;
  try {
    const stages = await queries.find({ race, year });
    if (stage) {
      res.json(stages);
    }
  } catch (error) {
    return next(error);
  }
});

router.get('/test', async (req, res, next) => {
  console.log('testing', req, res);
  return next();
  // const { race_id } = req.params;
  // try {
  //   const stage = await queries.currentStage(race_id);
  //   if (stage) {
  //     res.json(stage);
  //   }
  // } catch (error) {
  //   return next(error);
  // }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  console.log(req.body);
  /* First check if user want to change status of stage, else update entire stage */
  if (req.body.setDone) {
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
