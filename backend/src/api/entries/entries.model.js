const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./entries.shema.json');

class Entry extends Model {
  static get tableName() {
    return tableNames.entry
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Entry;
