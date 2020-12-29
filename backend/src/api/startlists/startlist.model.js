const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./startlist.schema.json');

class Startlist extends Model {
  static get tableName() {
    return tableNames.startlist;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Startlist;
