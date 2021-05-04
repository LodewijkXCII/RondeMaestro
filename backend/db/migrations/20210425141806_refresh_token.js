const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');

/** @param {Knex} knex */
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.refresh_token, (table) => {
      table.increments();
      table.string('token').notNullable();
    }),
  ]);
};

exports.down = async (knex) => {
  await Promise.all(
    [tableNames.refresh_token].map((tableName) =>
      knex.schema.dropTableIfExists(tableName)
    )
  );
};
