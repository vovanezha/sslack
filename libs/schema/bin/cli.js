#!/usr/bin/env node

const env = require('dotenv').parse();

const makeMigration = require('../cli/make-migration');
const migrate = require('../cli/migrate');

const METHODS = ['make-migration', 'migrate'];

async function run() {
  const [method, schemasPath, migrationsPath, migrationName] = process.argv.slice(2);

  if (METHODS.indexOf(method) === -1) {
    throw new Error(`Unknown method provided - "${method}"`);
  }

  if (!schemasPath) {
    throw new Error('Schemas path is not provided');
  }

  if (!migrationsPath) {
    throw new Error('Migrations path is not provided');
  }

  if (method === 'migrate') {
    const options = {
      database: env.DB_NAME,
      user: env.DB_USER,
      host: env.DB_HOST,
    }

    return migrate(schemasPath, migrationsPath, options);
  }

  if (method === 'make-migration') {
    return makeMigration(schemasPath, migrationsPath, migrationName);
  }
}


run();
