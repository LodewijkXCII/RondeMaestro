const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./teams.schema.json');

class Team extends Model {
  static get tableName() {
    return tableNames.team;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Team;
