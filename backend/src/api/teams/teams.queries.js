const db = require('../../db');
const tableNames = require('../../constants/tableNames');

//TODO get related info nested

const fields = [
  'id',
  'name',
  'abbreviation',
  'country_id',
  'level',
  'year',
  'image_url',
];

module.exports = {
  find() {
    return db(tableNames.team).select(fields).where('year', '2020');
  },
  async get(id) {
    return db(tableNames.team)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
};
