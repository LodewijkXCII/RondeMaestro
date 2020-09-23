const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');

function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.dateTime('deleted_at');
}

function references(table, tabelName) {
  const definition = table
    .integer(`${tabelName}_id`)
    .unsigned()
    .references('id')
    .inTable(tabelName)
    .onDelete('cascade')
    .notNullable();

  return definition;
}

/** @param {Knex} knex */
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.season_time, (table) => {
      table.increments().notNullable();
      table.string('name').notNullable().unique();
      table.integer('year', 4).notNullable();
      addDefaultColumns(table);
    }),

    knex.schema.createTable(tableNames.user_role, (table) => {
      table.increments().notNullable();
      table.string('name').notNullable().unique();
      addDefaultColumns(table);
    }),

    knex.schema.createTable(tableNames.speciality, (table) => {
      table.increments().notNullable();
      table.string('name').notNullable().unique();
      table.string('image_url', 2000).notNullable();
      addDefaultColumns(table);
    }),

    knex.schema.createTable(tableNames.stage_type, (table) => {
      table.increments().notNullable();
      table.string('name').notNullable().unique();
      table.string('image_url', 2000).notNullable();
      addDefaultColumns(table);
    }),

    knex.schema.createTable(tableNames.country, (table) => {
      table.increments().notNullable();
      table.string('name').notNullable().unique();
      table.string('abbreviation', 2).notNullable();
      addDefaultColumns(table);
    }),
  ]);

  await knex.schema.createTable(tableNames.users, (table) => {
    table.increments().notNullable();
    // table.string('googleId');
    table.string('email').notNullable().unique();
    table.string('name').notNullable().unique();
    table.string('password', 127).notNullable();
    addDefaultColumns(table);
    table.datetime('last_login');
    references(table, 'user_role');
  });

  await knex.schema.createTable(tableNames.race, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    table.string('image_url', 2000).notNullable();
    table.integer('year', 4).notNullable();
    references(table, 'country');
    references(table, 'season_time');
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.team, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    table.string('abbreviation', 3).notNullable();
    table.integer('year', 4).notNullable();
    table.string('level', 40).notNullable();
    table.string('image_url', 2000).notNullable();
    references(table, 'country');
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.cyclist, (table) => {
    table.increments().notNullable();
    table.string('first_name', 50).notNullable();
    table.string('last_name', 50).notNullable();
    table.string('image_url', 2000).notNullable();
    addDefaultColumns(table);
    references(table, 'country');
    references(table, 'team');
    references(table, 'speciality');
    table
      .integer('speciality_id_2')
      .unsigned()
      .references('id')
      .inTable('speciality')
      .onDelete('cascade');
  });

  await knex.schema.createTable(tableNames.stage, (table) => {
    table.increments().notNullable();
    table.integer('stage_nr').notNullable();
    table.string('start_city', 100).notNullable();
    table.string('finish_city', 100).notNullable();
    table.integer('distance', 4).notNullable();
    table.dateTime('date').notNullable();
    table.boolean('done').defaultTo(false);
    table.string('image_url', 2000);
    addDefaultColumns(table);
    references(table, 'race');
    references(table, 'stage_type');
  });

  await knex.schema.createTable(tableNames.startlist, (table) => {
    table.increments().notNullable();
    table.integer('race_number').notNullable();
    table.boolean('withdraw').notNullable().defaultTo(false);
    references(table, 'race');
    references(table, 'cyclist');
  });

  await knex.schema.createTable(tableNames.result, (table) => {
    table.increments().notNullable();
    table.integer('position', 2).notNullable();
    table.integer('points', 3).notNullable();
    references(table, 'stage');
    references(table, 'cyclist');
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.entry, (table) => {
    table.increments().notNullable();
    references(table, 'users');
    references(table, 'stage');
    references(table, 'cyclist');
    addDefaultColumns(table);
  });
};

exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.entry,
      tableNames.result,
      tableNames.startlist,
      tableNames.stage,
      tableNames.cyclist,
      tableNames.team,
      tableNames.race,
      tableNames.users,
      tableNames.country,
      tableNames.stage_type,
      tableNames.speciality,
      tableNames.user_role,
      tableNames.season_time,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
  );
};
