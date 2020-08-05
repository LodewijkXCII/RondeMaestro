const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const { result } = require('../../constants/tableNames');

const fields = [
  'result.id',
  'stage_id',
  'result.position as position',
  'result.points as points',
  'result.deleted_at as deleted_at',
  'cyclist.first_name as first_name',
  'cyclist.last_name as last_name',
];

const fields_score = [
  'result.id',
  'users.name as name',
  'result.points',
  'entry.deleted_at',
  'entry.created_at',
  'result.position',
  'result.stage_id',
  'result.cyclist_id',
  'cyclist.first_name as first_name',
  'cyclist.last_name as last_name',
];

module.exports = {
  find(query) {
    const resultQuery = db(result)
      .select(fields)
      .from(result)
      .whereNull('result.deleted_at')
      .join('cyclist', 'cyclist.id', 'result.cyclist_id');

    if (query.stage_id) {
      resultQuery.where('stage_id', query.stage_id);
    }
    return resultQuery;
  },
  update(query) {
    const put = db(result)
      .where('points', query.points)
      .where('stage_id', query.stage_id)
      .where('cyclist_id', query.cyclist_id)
      .update(
        {
          updated_at: new Date(Date.now())
            .toISOString()
            .replace('T', ' ')
            .replace('Z', ''),
        },
        ['points', 'id', 'stage_id', 'created_at', 'deleted_at']
      );
    return put;
  },

  async get(id) {
    return db(result)
      .select(fields_score)
      .from('users')
      .where('result.stage_id', '=', id)
      .innerJoin('entry', 'users.id', 'entry.users_id')
      .innerJoin('result', {
        'entry.cyclist_id': 'result.cyclist_id',
        'entry.stage_id': 'result.stage_id',
      })
      .whereNull('entry.deleted_at')
      .innerJoin('cyclist', 'result.cyclist_id', 'cyclist.id');
  },
};
