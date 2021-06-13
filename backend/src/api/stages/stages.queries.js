const db = require('../../db');
const { update } = require('../../db');
const { stage, race, stage_type } = require('../../constants/tableNames');

const fields = [
  'stage.id',
  'stage.stage_nr',
  'stage.start_city',
  'stage.finish_city',
  'stage.distance',
  'stage.date',
  'stage.done',
  'stage.stage_type_id',
  'stage.race_id',
  'stage.image_url',
  'race.name as name',
  'stage_type.image_url as stage_type',
];

module.exports = {
  find(query) {
    const stageQuery = db(stage)
      .select(fields)
      .join(race, 'stage.race_id', 'race.id')
      .join(stage_type, 'stage.stage_type_id', 'stage_type.id')
      .orderBy('stage_nr', 'asc');
    if (query.race_id) {
      stageQuery.where('stage.race_id', query.race_id);
    }
    if (query.single == 1) {
      const date = new Date(Date.now());
      stageQuery.where('stage.date', '>', date).first();
    }
    return stageQuery;
  },

  async get(id) {
    return db(stage)
      .select(fields)
      .join(race, 'stage.race_id', 'race.id')
      .join(stage_type, 'stage.stage_type_id', 'stage_type.id')
      .where('stage.id', id)
      .first();
  },

  setDone(query) {
    console.log(query);
    const updateStage = db(stage)
      .where('stage.id', query.id)
      .update(
        {
          done: true,
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
    const put = db(stage)
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

  currentStage(query) {
    if (query.race) {
      currentStage.where('race_id', query.race);
    }

    return currentStage;
  },
};
