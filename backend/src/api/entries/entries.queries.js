const db = require('../../db');
const tableNames = require('../../constants/tableNames');
const Entry = require('../entries/entries.model');
const { entry } = require('../../constants/tableNames');

const fields = [
  'cyclist_id',
  'stage_id',
  'users_id',
  'entry.id',

  'cyclist.first_name as first_name',
  'cyclist.last_name as last_name',
  'cyclist.country_id as country',
  'cyclist.id as cyclist_id',
];

module.exports = {
  find(query) {
    const entriesQuery = db(tableNames.entry)
      .select(fields)
      .from(tableNames.entry)
      .whereNull('entry.deleted_at')
      .rightOuterJoin(tableNames.cyclist, function () {
        this.on('cyclist.id', '=', 'entry.cyclist_id')
      })

    if (query.users_id) {
      entriesQuery.where('users_id', query.users_id);
    }
    if (query.stage_id) {
      entriesQuery.where('stage_id', query.stage_id);
    }
    return entriesQuery
  },
  update(query) {
    const put = db(tableNames.entry)

      .where('users_id', query.users_id)
      .where('stage_id', query.stage_id)
      .where('cyclist_id', query.cyclist_id)
      .update(
        { deleted_at: new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', '') }, ['users_id', 'id', 'stage_id', 'created_at', 'deleted_at'])
    return put
  }
};
