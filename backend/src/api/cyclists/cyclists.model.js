const { Model, Country } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./cyclists.shema.json');

class Cyclist extends Model {
  static get tableName() {
    return tableNames.cyclist;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Cyclist;
