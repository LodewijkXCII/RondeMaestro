const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');

/** @param {Knex} knex */
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.table(tableNames.users, (table) => {
      table.dropColumn('uid');
    }),
  ]);
};

exports.down = function (knex) {};
