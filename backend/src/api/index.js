const express = require('express');

const project = require('../constants/project');

const users = require('./users/users.routes');
const auth = require('./auth/auth.routes');
const countries = require('./countries/countries.routes');
const teams = require('./teams/teams.routes');
const seasonTime = require('./season_time/season_time.routes');
const speciality = require('./speciality/speciality.routes');
const stageType = require('./stage_type/stage_type.routes');
const userRole = require('./user_role/user_role.routes');
const cyclist = require('./cyclists/cyclists.routes');
const stage = require('./stages/stages.routes');
const race = require('./races/race.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});

router.use('/users', users);
router.use('/auth', auth);
router.use('/countries', countries);
router.use('/teams', teams);
router.use('/season_time', seasonTime);
router.use('/speciality', speciality);
router.use('/stage_type', stageType);
router.use('/user_role', userRole);
router.use('/cyclists', cyclist);
router.use('/stages', stage);
router.use('/races', race);

module.exports = router;
