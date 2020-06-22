const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = ['id', 'name', 'image_url'];

module.exports = {
  find() {
    return db(tableNames.speciality).select(fields);
  },

  async get(id) {
    return db(tableNames.speciality)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
};
