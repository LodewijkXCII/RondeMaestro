const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./results.shema.json');

class Result extends Model {
  static get tableName() {
    return tableNames.result
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Result;
