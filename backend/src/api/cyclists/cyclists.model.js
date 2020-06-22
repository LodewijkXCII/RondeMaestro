const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./cyclists.shema.json');

class Cyclist extends Model {
  static get tableName() {
    return tableNames.cyclist;
  }

  static get relationMappings() {
    return {
      country: {
        relation: Model.ManyToManyRelation,
        modelClass: Country,
        join: {
          from: tableNames.cyclist.id,
          to: 'country.cyclist_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Cyclist;
