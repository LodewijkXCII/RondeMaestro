const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = ['id', 'name', 'image_url'];

module.exports = {
  find() {
    return db(tableNames.stage_type).select(fields);
  },
  async get(id) {
    return db(tableNames.stage_type)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
};
