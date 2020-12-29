const db = require('../../db');
const tableNames = require('../../constants/tableNames');
const Entry = require('../entries/entries.model');
const { entry, cyclist } = require('../../constants/tableNames');

const fields = [
  'entry.id as id',
  'entry.users_id',
  'entry.stage_id',
  'entry.cyclist_id',

  'cyclist.first_name',
  'cyclist.last_name',
  'cyclist.image_url',

  'country.abbreviation as country_name',

  'team.name as team_name',
  'team.id as team_id',
  'team.image_url as team_img',
];

module.exports = {
  find(query) {
    const entriesQuery = db(entry)
      .select(fields)
      .from(entry)
      .whereNull('entry.deleted_at')
      .rightOuterJoin(cyclist, function () {
        this.on('cyclist.id', '=', 'entry.cyclist_id');
      })
      .join('team', 'cyclist.team_id', 'team.id')
      .join('country', 'cyclist.country_id', 'country.id')
      .join('speciality', 'cyclist.speciality_id', 'speciality.id');

    if (query.users_id) {
      entriesQuery.where('users_id', query.users_id);
    }
    if (query.stage_id) {
      entriesQuery.where('stage_id', query.stage_id);
    }
    return entriesQuery;
  },

  update(query) {
    console.log(query);
    const put = db(tableNames.entry)
      .where('users_id', query.users_id)
      .where('stage_id', query.stage_id)
      .where('cyclist_id', query.cyclist_id)
      .update(
        {
          deleted_at: new Date(Date.now())
            .toISOString()
            .replace('T', ' ')
            .replace('Z', ''),
        },
        ['users_id', 'stage_id', 'created_at', 'deleted_at', 'cyclist_id']
      );
    return put;
  },
};
