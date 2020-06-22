const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./countries.schema.json');

class Country extends Model {
  static get tableName() {
    return tableNames.country;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Country;
