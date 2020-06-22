const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = ['id', 'name', 'year'];

module.exports = {
  find() {
    return db(tableNames.season_time).select(fields).where('year', '2020');
  },

  async get(id) {
    return db(tableNames.season_time)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
};
