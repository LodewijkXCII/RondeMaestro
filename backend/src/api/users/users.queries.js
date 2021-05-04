const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = [
  'id',
  'email',
  'name',
  'user_role_id',
  'created_at',
  'updated_at',
];

module.exports = {
  async get(id) {
    return db(tableNames.users)
      .select(fields)
      .where({
        id: id,
      })
      .first();
  },

  update(params) {
    const put = db(tableNames.users)
      .where('id', params)
      .update(
        {
          last_login: new Date(Date.now())
            .toISOString()
            .replace('T', ' ')
            .replace('Z', ''),
        },
        ['*']
      );
    return put;
  },
};
