const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = [
  'id',
  'name',
  'image_url',
  'year',
  'country_id',
  'season_time_id',
];

module.exports = {
  find() {
    return db(tableNames.race).select(fields).where('year', '2020');
  },

  async get(id) {
    return db(tableNames.race)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
};
