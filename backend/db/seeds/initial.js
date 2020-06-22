// const crypto = require('crypto');
// const bcrypt = require('bcrypt');
const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');
const stageType = require('../../src/constants/stageType');
const userRoles = require('../../src/constants/userRoles');
const specialities = require('../../src/constants/specialities');
const seasonTime = require('../../src/constants/seasonTime');
const countries = require('../../src/constants/countries');
const cyclist = require('../../src/constants/cyclist');
const team = require('../../src/constants/team');
const stage = require('../../src/constants/stage');
const race = require('../../src/constants/race');

/** @param {Knex} knex */
exports.seed = async (knex) => {
  await Promise.all(Object.keys(tableNames).map((name) => knex(name).del()));

  const insertedCountries = await knex(tableNames.country).insert(
    countries,
    '*'
  );
  await knex(tableNames.stage_type).insert(stageType);
  await knex(tableNames.user_role).insert(userRoles);
  await knex(tableNames.speciality).insert(specialities);
  await knex(tableNames.season_time).insert(seasonTime);
};
