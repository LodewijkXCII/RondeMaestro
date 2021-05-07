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

const startlistFields = [
  'startlist.id',
  'startlist.race_number',
  'startlist.withdraw',
  'race_id',
  'cyclist.id as cyclist_id',
  'cyclist.first_name',
  'cyclist.last_name',
  'cyclist.image_url',
  'country.abbreviation as country_name',
  'team.name as team_name',
  'team.id as team_id',
  'team.image_url as team_img',
  'speciality.name as speciality_name',
];

module.exports = {
  findStartlist(query) {
    const startList = db(tableNames.startlist)
      .select(startlistFields)
      .fullOuterJoin('cyclist', 'startlist.cyclist_id', 'cyclist.id')
      .join('team', 'cyclist.team_id', 'team.id')
      .join('country', 'cyclist.country_id', 'country.id')
      .join('speciality', 'cyclist.speciality_id', 'speciality.id')
      .where('race_id', query.race_id);

    if (query.team) {
      startList.where('team_id', query.team).orderBy('last_name', 'asc');
    }

    if (query.speciality) {
      startList
        .where('speciality_id', query.speciality)
        .orWhere('speciality_id_2', query.speciality)
        .orderBy('last_name', 'asc');
    }
    if (query.name) {
      startList
        .where('first_name', 'ilike', `${query.name}%`)
        .orWhere('last_name', 'ilike', `${query.name}%`)
        .whereNotNull('race_number')
        .orderBy('last_name', 'asc');
    }

    return startList;
  },

  find(query) {
    console.log(query);
    const startlistQuery = db(tableNames.startlist)
      .select(fields)
      .join('cyclist', 'startlist.cyclist_id', 'cyclist.id');

    if (query) {
      startlistQuery.where('race_id', query);
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
    console.log(query, race_id);
    const put = db(tableNames.startlist)
      .where('race_id', race_id)
      .andWhere('cyclist_id', query.cyclist_id)
      .update('race_number', query.race_number)
      .returning('race_number');

    return put;
  },

  deleteStartlist(cyclist_id, race_id) {
    const remove = db(tableNames.startlist)
      .where('cyclist_id', cyclist_id)
      .andWhere('race_id', race_id)
      .del();

    return remove;
  },
};
