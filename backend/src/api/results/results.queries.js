const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const { result } = require('../../constants/tableNames');

const fields = [
  'cyclist_id',
  'stage_id',
  // 'users_id',
  'result.id',
  'result.position',
  'result.points',

  'cyclist.first_name as first_name',
  'cyclist.last_name as last_name',
  'cyclist.id as cyclist_id',
];

module.exports = {
  find(query) {
    const resultQuery = db(result)
      .select(fields)
      .from(result)
      // .whereNull('deleted_at')
      .join('cyclist', 'cyclist.id', 'result.cyclist_id')

    if (query.stage_id) {
      resultQuery.where('stage_id', query.stage_id);
    }
    return resultQuery
  },
  update(query) {
    const put = db(tableNames.result)
      .where('points', query.points)
      .where('stage_id', query.stage_id)
      .where('cyclist_id', query.cyclist_id)
      .update(
        { updated_at: new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', '') }, ['points', 'id', 'stage_id', 'created_at', 'deleted_at'])
    return put
  }
};
