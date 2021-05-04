const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./users.schema.json');

class User extends Model {
  static get tableName() {
    return tableNames.users;
  }

  static get relationMappings() {
    const UserRole = require('../user_role/user_role.model');
    console.log('hello World');
    return {
      user_role: {
        relation: Model.HasOneRelation,
        modelClass: UserRole,
        join: {
          from: 'users.user_role_id',
          to: 'user_role.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = User;
