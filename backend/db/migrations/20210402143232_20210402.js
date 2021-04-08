const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');

/** @param {Knex} knex */
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.table(tableNames.users, (table) => {
      table.string('uid').unique();
    }),
  ]);
};

exports.down = async (knex) => {
  // return knex.schema.dropTable(tableNames.users);
};
