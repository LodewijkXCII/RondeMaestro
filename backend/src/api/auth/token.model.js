const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./token.schema.json');

class Token extends Model {
  static get tableName() {
    return tableNames.refresh_token;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Token;
