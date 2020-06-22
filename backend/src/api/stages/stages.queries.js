const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = [
  'id',
  'stage_nr',
  'start_city',
  'finish_city',
  'distance',
  'date',
  'race_id',
  'stage_type_id',
];

module.exports = {
  find(query) {
    const stageQuery = db(tableNames.stage).select(fields);
    if (query.race) {
      stageQuery.where('race_id', query.race);
    }

    return stageQuery;
  },
  async get(id) {
    return db(tableNames.stage)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
};
