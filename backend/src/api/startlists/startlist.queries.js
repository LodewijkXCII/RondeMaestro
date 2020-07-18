const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = [
  'startlist.id',
  'startlist.race_number',
  'startlist.withdraw',
  'race_id',
  'cyclist.first_name as first_name',
  'cyclist.last_name as last_name',
  'cyclist.team_id as team',
  'cyclist.country_id as country',
  'cyclist.image_url as cyclist_image',
];

module.exports = {
  find(query) {
    const startlistQuery = db(tableNames.startlist)
      .select(fields)
      .join('cyclist', 'startlist.cyclist_id', 'cyclist.id')
    if (query.race) {
      startlistQuery.where('race_id', query.race);
    }
    if (query.name) {
      startlistQuery
        .where('first_name', 'ilike', `%${query.name}%`)
        .orWhere('last_name', 'ilike', `%${query.name}%`);
    }

    return startlistQuery;
  },
};
