const db = require('../../db');
const tableNames = require('../../constants/tableNames');
const { boolean } = require('yup');

const fields = [
  'startlist.id',
  'startlist.race_number',
  'startlist.withdraw',
  'race_id',
  'cyclist.first_name as first_name',
  'cyclist.last_name as last_name',
  'cyclist.id as cyclist_id',
  'cyclist.team_id as team',
  'cyclist.country_id as country',
  'cyclist.image_url as cyclist_image',
];

module.exports = {
  find(query) {
    const startlistQuery = db(tableNames.startlist)
      .select(fields)
      .join('cyclist', 'startlist.cyclist_id', 'cyclist.id');

    if (query.race) {
      startlistQuery.where('race_id', query.race);
    }
    return startlistQuery;
  },

  updateWithdraw(query) {
    const update = db(tableNames.startlist)
      .where('cyclist_id', query.cyclist_id)
      .where('race_id', query.race_id)
      .update({ withdraw: query.updateValue });
    return update;
  },

  updateStartlist(query, race_id) {
    console.log('Query:', query, 'race_id:', race_id);
    const put = db(tableNames.startlist)
      .where('id', race_id)
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
