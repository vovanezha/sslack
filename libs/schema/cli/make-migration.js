const fs = require('fs');
const path = require('path');
const box = require('box');
const Builder = require('../lib/builder');
const Schema = require('../lib/schema');
const diffSchemas = require('../lib/diff');

async function createHistoryDirIfNeed(schemasPath) {
    const historyPath = path.join(schemasPath, './history');
    const exists = await fs.existsSync(historyPath);

    if (!exists) {
        const files = await fs.promises.readdir(schemasPath, { withFileTypes: true });
        await fs.promises.mkdir(historyPath);
        await Promise.all(files.map(dirent => fs.promises.copyFile(
            path.join(schemasPath, dirent.name),
            path.join(historyPath, dirent.name)
        )));
    }

    return [exists, historyPath];
}

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
    if (!(await fs.existsSync(migrationsPath))) {
        await fs.promises.mkdir(migrationsPath);
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
    const [existsHistory, historyPath] = await createHistoryDirIfNeed(schemasPath);

    let sql = null;
    if (!existsHistory) {
        const schemas = await buildSchemas(schemasPath);
        sql = new Builder(schemas).toSQL();
    } else {
        const oldSchemas = await buildSchemas(historyPath);
        const newSchemas = await buildSchemas(schemasPath);

        // explore all diffs and do a sql from them
        diffSchemas(newSchemas, oldSchemas);

        sql = new Builder(newSchemas).toSQL();
    }

    const filepath = await createMigrationFilepath(migrationsPath, migrationName);
    return fs.promises.writeFile(filepath, sql);
}
