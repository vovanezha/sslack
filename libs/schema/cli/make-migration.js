const fs = require('fs');
const path = require('path');
const box = require('box');
const Builder = require('../lib/builder');
const Schema = require('../lib/schema');
const diffSchemas = require('../lib/diff');
const { getOrCreateHistory, cpHistory } = require('../lib/utils');

async function buildSchemas(schemasPath) {
    const dir = await fs.promises.readdir(schemasPath, { withFileTypes: true });
    const rawStructs = dir
        .filter(dirent => dirent.isFile())
        .map(dirent => path.join(schemasPath, dirent.name))
        .map(f => box.execute(f).catch(err => { throw new Error(err) }))
    const structs = await Promise.all(rawStructs);

    const schemas = Schema.fromStructs(structs);

    return schemas
}

async function createVersion(migrationsPath) {
    const exists = fs.existsSync(migrationsPath)

    if (!exists) {
        await fs.promises.mkdir(migrationsPath, {recursive: true});
        return '0001';
    }

    const files = await fs.promises.readdir(migrationsPath);
    const lastMigrationName = files[files.length - 1] || '0000';
    const lastVersion = lastMigrationName.split('_')[0];
    const newVersion = String(Number(lastVersion) + 1).padStart(4, '0');

    return newVersion
}

async function createMigrationFilepath(migrationsPath, migrationName) {
    const version = await createVersion(migrationsPath);
    const filename = `${version}_${migrationName || 'migration'}.sql`;

    return `${migrationsPath}/${filename}`;
}

module.exports = async function makeMigration(schemasPath, migrationsPath, migrationName) {
    const [existsHistory, historyPath] = await getOrCreateHistory(schemasPath);

    let sql = null;
    if (!existsHistory) {
        const schemas = await buildSchemas(schemasPath);
        sql = new Builder(schemas).toSQL();
    } else {
        const oldSchemas = await buildSchemas(historyPath);
        const newSchemas = await buildSchemas(schemasPath);

        sql = diffSchemas(newSchemas, oldSchemas);
    }

    const filepath = await createMigrationFilepath(migrationsPath, migrationName);
    return fs.promises.writeFile(filepath, sql);
}
