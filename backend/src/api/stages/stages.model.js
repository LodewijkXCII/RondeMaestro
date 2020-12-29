const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./stages.schema.json');

class Stage extends Model {
  static get tableName() {
    return tableNames.stage;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Stage;
