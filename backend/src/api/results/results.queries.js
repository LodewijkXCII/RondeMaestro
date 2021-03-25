const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const { result } = require('../../constants/tableNames');
const Result = require('./results.model');

const fields = [
  'result.id',
  'stage_id',
  'result.position as position',
  'result.points as points',
  'result.deleted_at as deleted_at',
  'cyclist.first_name as first_name',
  'cyclist.last_name as last_name',
  'cyclist.id as cyclist_id',
];

const fields_score = [
  'result.id',
  'users.name as user_name',
  'users.id as user_id',
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
  //Find result from stage
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
  //Update result
  update(query, params) {
    const put = db(result)
      .where('id', params)
      .update(
        {
          ...query,
          updated_at: new Date(Date.now())
            .toISOString()
            .replace('T', ' ')
            .replace('Z', ''),
        },
        ['points', 'id', 'stage_id', 'created_at', 'deleted_at']
      );
    return put;
  },

  async get(query) {
    const resultQuery = db(result)
      .select(fields_score)
      .from('users')
      .innerJoin('entry', 'users.id', 'entry.users_id')
      .innerJoin('result', {
        'entry.cyclist_id': 'result.cyclist_id',
        'entry.stage_id': 'result.stage_id',
      })
      .innerJoin('cyclist', 'result.cyclist_id', 'cyclist.id')
      .whereNull('entry.deleted_at');

    if (query.user_id) {
      resultQuery.where('users.id', query.user_id);
    }
    if (query.stage_id) {
      resultQuery.where('result.stage_id', query.stage_id);
    }
    if (query.race_id) {
      resultQuery.where('race_id', query.race_id);
    }
    return resultQuery;
  },

  async getSUM(query) {
    const summedRes = db(result)
      .select('users.id', 'users.name', db.raw('SUM(points)'))
      .groupBy('users.id')
      .from(tableNames.users)
      .innerJoin('entry', 'users.id', 'entry.users_id')
      .whereNull('entry.deleted_at')
      .innerJoin('result', {
        'entry.cyclist_id': 'result.cyclist_id',
        'entry.stage_id': 'result.stage_id',
      });

    if (query.user_id) {
      summedRes.where('users.id', '=', query.user_id);
    }
    if (query.stage_id) {
      summedRes.where('entry.stage_id', '=', query.stage_id);
    }

    return summedRes;
  },

  async getUserScores(query) {
    const userscores = db(result)
      .select('name', 'entry.stage_id', db.raw('SUM(points)'))
      .groupBy('name', 'entry.stage_id')
      .from(tableNames.users)
      .where('users.id', '=', query.user_id)
      .innerJoin('entry', 'users.id', 'entry.users_id')
      .whereNull('entry.deleted_at')
      .innerJoin('result', {
        'entry.cyclist_id': 'result.cyclist_id',
        'entry.stage_id': 'result.stage_id',
      });

    return userscores;
  },

  async getSUMRenner(query) {
    const summedCyclistRes = await db(result)
      .select('cyclist.id', db.raw('SUM(points)'))
      .groupBy('cyclist.id')
      .from(tableNames.cyclist)
      .whereNull('result.deleted_at')
      .innerJoin('result', {
        'cyclist.id': 'result.cyclist_id',
      });
    return summedCyclistRes;
  },
};
