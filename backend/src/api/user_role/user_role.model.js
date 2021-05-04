const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./user_role.shema.json');

class UserRole extends Model {
  static get tableName() {
    return tableNames.user_role;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = UserRole;
