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
  find() {
    return db(tableNames.team)
      .select(fields)
      .join('country', 'team.country_id', 'country.id')
      .where('year', '2020')
      .orderBy('id', 'asc');
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

  //TODO Make put query
};
