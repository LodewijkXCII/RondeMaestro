const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = [
  'team.id',
  'team.name',
  'team.abbreviation',
  'country.abbreviation as country',
  'team.level',
  'team.year',
  'team.image_url',
];

module.exports = {
  find(year) {
    const getTeams = db(tableNames.team)
      .select(fields)
      .join('country', 'team.country_id', 'country.id')
      .orderBy('id', 'asc');

    if (year) {
      getTeams.where('year', year).orderBy('name', 'asc');
    }

    return getTeams;
  },

  async get(id) {
    return db(tableNames.team)
      .select(fields)
      .join('country', 'team.country_id', 'country.id')
      .where({
        'team.id': id,
      })
      .first();
  },

  update(query, params) {
    const put = db(tableNames.team)
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
