const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = ['id', 'name'];

module.exports = {
  find() {
    return db(tableNames.user_role).select(fields);
  },
  async get(id) {
    return db(tableNames.user_role)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
  getName(name) {
    return db(tableNames.user_role)
      .select(fields)
      .where({
        name,
      })
      .first();
  },
};
