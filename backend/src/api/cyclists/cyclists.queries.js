const db = require('../../db');
const tableNames = require('../../constants/tableNames');
const Cyclist = require('../cyclists/cyclists.model');
const { cyclist } = require('../../constants/tableNames');

//TODO get related info nested

const fields = [
  'cyclist.id',
  'cyclist.first_name',
  'cyclist.last_name',
  'country.abbreviation as country_name',
  'team.name as team_name',
  'speciality.name as speciality_name',
  'speciality.name as speciality_name_2',
  'cyclist.image_url',
];

module.exports = {
  find(query) {
    const cyclistQuery = db(tableNames.cyclist)
      .select(fields)
      .from('cyclist')
      .join('team', 'cyclist.team_id', 'team.id')
      .join('country', 'cyclist.country_id', 'country.id')
      .join('speciality', 'cyclist.speciality_id', 'speciality.id');

    if (query.country) {
      cyclistQuery.where('country_id', query.country);
    }
    if (query.team) {
      cyclistQuery.where('team_id', query.team);
    }
    if (query.speciality) {
      cyclistQuery
        .where('speciality_id', query.speciality)
        .orWhere('speciality_id_2', query.speciality);
    }
    if (query.name) {
      cyclistQuery
        .where('first_name', 'ilike', `%${query.name}%`)
        .orWhere('last_name', 'ilike', `%${query.name}%`);
    }

    return cyclistQuery;
  },
  async get(id) {
    return db(tableNames.cyclist)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
};
