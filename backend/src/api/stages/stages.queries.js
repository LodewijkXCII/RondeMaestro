const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = [
  'stage.id',
  'stage_nr',
  'start_city',
  'finish_city',
  'distance',
  'date',
  'race.name as name',
  'stage_type.name as stage_type',
];

module.exports = {
  find(query) {
    const stageQuery = db(tableNames.stage).select(fields)
      .join(tableNames.race, 'stage.race_id', 'race.id')
      .join(tableNames.stage_type, 'stage.stage_type_id', 'stage_type.id');
    if (query.race) {
      stageQuery.where('race_id', query.race);
    }
    return stageQuery;
  },
  async get(id) {
    return db(tableNames.stage)
      .select(fields)
      .join(tableNames.race, 'stage.race_id', 'race.id')
      .join(tableNames.stage_type, 'stage.stage_type_id', 'stage_type.id')
      .where(
        'stage.id', id,
      )
      .first();
  },
};
