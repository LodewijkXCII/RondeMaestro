const db = require('../../db');

const Cyclist = require('../cyclists/cyclists.model');
const { cyclist } = require('../../constants/tableNames');

const fields = [
  'cyclist.id as cyclist_id',
  'cyclist.first_name',
  'cyclist.last_name',
  'country.abbreviation as country_name',
  'team.name as team_name',
  'team.id as team_id',
  'team.image_url as team_img',
  'speciality.name as speciality_name',
  // 'speciality.name as speciality_name_2',
  'cyclist.image_url',
  // 'startlist.race_id',
  // 'startlist.race_number',
  // 'startlist.withdraw',
  // 'result.points',
];

module.exports = {
  find(query) {
    console.log(query);
    const cyclistQuery = db(cyclist)
      .from(cyclist)
      .select(fields)
      .join('team', 'cyclist.team_id', 'team.id')
      .join('country', 'cyclist.country_id', 'country.id')
      .join('speciality', 'cyclist.speciality_id', 'speciality.id');
    // .fullOuterJoin('startlist', 'cyclist.id', 'startlist.cyclist_id');

    if (query.country) {
      cyclistQuery
        .where('country_id', query.country)
        .orderBy('last_name', 'asc');
    }

    // if (query.startlist) {
    //   cyclistQuery.where('race_id', query.startlist);
    //   cyclistQuery.whereNotNull('race_number');
    //   cyclistQuery.orderBy('race_number');
    // }

    if (query.team_id) {
      cyclistQuery.where('team_id', query.team_id).orderBy('last_name', 'asc');
    }

    if (query.speciality) {
      cyclistQuery
        .where('speciality_id', query.speciality)
        .orWhere('speciality_id_2', query.speciality)
        .orderBy('last_name', 'asc');
    }
    if (query.name) {
      cyclistQuery
        .where('first_name', 'ilike', `${query.name}%`)
        .orWhere('last_name', 'ilike', `${query.name}%`)
        .orderBy('last_name', 'asc');
    }

    if (query.limit && query.offset) {
      cyclistQuery
        .limit(query.limit)
        .offset(query.offset)
        .orderBy('last_name', 'asc');
    }

    return cyclistQuery;
  },

  async get(id) {
    return db(cyclist)
      .select(fields)
      .where('cyclist.id', id)
      .join('team', 'cyclist.team_id', 'team.id')
      .join('country', 'cyclist.country_id', 'country.id')
      .join('speciality', 'cyclist.speciality_id', 'speciality.id')
      .leftJoin('startlist', 'cyclist.id', 'startlist.cyclist_id')
      .first();
  },

  async update(query, params) {
    const put = await db(cyclist)
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
