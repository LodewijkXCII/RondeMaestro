const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = ['id', 'name', 'abbreviation'];

module.exports = {
  find() {
    return db(tableNames.country).select(fields);
  },
  async get(id) {
    return db(tableNames.country)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
};
