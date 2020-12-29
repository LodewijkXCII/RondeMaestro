const db = require('../../db');
const tableNames = require('../../constants/tableNames');
const { update } = require('../../db');

const fields = [
  'stage.id',
  'stage_nr',
  'start_city',
  'finish_city',
  'distance',
  'date',
  'done',
  'stage.image_url',
  'race.name as name',
  'stage_type.image_url as stage_type',
];

module.exports = {
  find(query) {
    const stageQuery = db(tableNames.stage)
      .select(fields)
      // .select()
      .join(tableNames.race, 'stage.race_id', 'race.id')
      .join(tableNames.stage_type, 'stage.stage_type_id', 'stage_type.id')
      .orderBy('stage_nr', 'asc');
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
      .where('stage.id', id)
      .first();
  },

  setDone(query) {
    const updateStage = db(tableNames.stage)
      .where('stage.id', query.id)
      .update(
        { done: true },
        {
          updated_at: new Date(Date.now())
            .toISOString()
            .replace('T', ' ')
            .replace('Z', ''),
        },
        [('stage.id', 'stage_nr', 'done')]
      );

    return updateStage;
  },

  updateStage(query, params) {
    const put = db(tableNames.stage)
      .where('id', params)
      .update({
        ...query,
        updated_at: new Date(Date.now())
          .toISOString()
          .replace('T', ' ')
          .replace('Z', ''),
      });
    return put;
  },
};
