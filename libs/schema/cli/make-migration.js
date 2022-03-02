const fs = require('fs');
const box = require('box');
const Builder = require('../lib/builder');
const Schema = require('../lib/schema');

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

module.exports = async function makeMigration(schemasPath, migrationsPath, migrationName) {
    const schemasFiles = (await fs.promises.readdir(schemasPath)).map(filepath => `${schemasPath}/${filepath}`);
    const structs = await Promise.all(
        schemasFiles.map(sp => box.execute(sp).catch(err => { throw new Error(err) }))
    );
    const schemas = Schema.fromStructs(structs);

    const builder = new Builder(schemas);
    const sql = builder.toSQL();

    const version = await createVersion(migrationsPath);
    const filename = `${version}_${migrationName || 'migration'}.sql`;
    const filepath = `${migrationsPath}/${filename}`

    return fs.promises.writeFile(filepath, sql);
}
