const db = require('../../db');
const tableNames = require('../../constants/tableNames');

//TODO get related info nested

const fields = [
  'id',
  'first_name',
  'last_name',
  'country_id',
  'team_id',
  'speciality_id',
  'speciality_id_2',
  'image_url',
];

module.exports = {
  find(query) {
    const cyclistQuery = db(tableNames.cyclist).select(fields);
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
        .where('first_name', 'like', `%${query.name}%`)
        .orWhere('last_name', 'like', `%${query.name}%`);
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
