const path = require('path');
const fs = require('fs');
const assert = require('assert');
const makeMigration = require("../cli/make-migration");

const absPath = (p) => path.join(process.cwd(), p);

const schemasPath = path.join(process.cwd(), './test/__fixtures__/schemas');

const migrationsPath1 = absPath('./test/__fixtures__/folder1/migrations');
const migrationsPath2 = absPath('./test/__fixtures__/folder2/migrations');
const migrationsPath3 = absPath('./test/__fixtures__/folder3/migrations');
const migrationsPath4 = absPath('./test/__fixtures__/folder4/migrations');

// without migrations directory
(async () => {
    const expectedMigration = await fs.promises.readFile(absPath('./test/__fixtures__/folder1/migration.sql'), 'utf-8');

    await makeMigration(schemasPath, migrationsPath1).catch(err => console.error(err));

    assert.equal(fs.existsSync(migrationsPath1), true);
    assert.equal(fs.existsSync(migrationsPath1 + '/0001_migration.sql'), true);
    assert.equal(fs.existsSync(migrationsPath1 + '/0002_migration.sql'), false);

    const migration = await fs.promises.readFile(migrationsPath1 + '/0001_migration.sql', 'utf-8');

    assert.equal(migration, expectedMigration);
})().finally(async () => {
    // cleanup
    await fs.promises.rm(migrationsPath1, { recursive: true, force: true });

    assert.equal(fs.existsSync(migrationsPath1), false);
});

// with migrations directory but without any migration file
(async () => {
    const expectedMigration = await fs.promises.readFile(absPath('./test/__fixtures__/folder2/migration.sql'), 'utf-8');

    await makeMigration(schemasPath, migrationsPath2).catch(err => console.error(err));

    assert.equal(fs.existsSync(migrationsPath2), true);
    assert.equal(fs.existsSync(migrationsPath2 + '/0001_migration.sql'), true);
    assert.equal(fs.existsSync(migrationsPath2 + '/0002_migration.sql'), false);

    const migration = await fs.promises.readFile(migrationsPath2 + '/0001_migration.sql', 'utf-8');

    assert.equal(migration, expectedMigration);
})().finally(async () => {
    // cleanup
    await fs.promises.rm(migrationsPath2 + '/0001_migration.sql');

    assert.equal(fs.existsSync(migrationsPath2 + '/0001_migration.sql'), false);
});

// with migrations directory and with one migration file
(async () => {
    const expectedMigration = await fs.promises.readFile(absPath('./test/__fixtures__/folder3/migration.sql'), 'utf-8');

    await makeMigration(schemasPath, migrationsPath3).catch(err => console.error(err));

    assert.equal(fs.existsSync(migrationsPath3), true);
    assert.equal(fs.existsSync(migrationsPath3 + '/0001_migration.sql'), true);
    assert.equal(fs.existsSync(migrationsPath3 + '/0002_migration.sql'), true);

    const migration = await fs.promises.readFile(migrationsPath3 + '/0002_migration.sql', 'utf-8');

    assert.equal(migration, expectedMigration);
})().finally(async () => {
    // cleanup
    await fs.promises.rm(migrationsPath3 + '/0002_migration.sql');

    assert.equal(fs.existsSync(migrationsPath3 + '/0001_migration.sql'), true);
    assert.equal(fs.existsSync(migrationsPath3 + '/0002_migration.sql'), false);
});

// custom migration name
(async () => {
    await makeMigration(schemasPath, migrationsPath4, 'add_name_field').catch(err => console.error(err));

    assert.equal(fs.existsSync(migrationsPath4 + '/0001_add_name_field.sql'), true);
})().finally(async () => {
    // cleanup
    await fs.promises.rm(migrationsPath4, { recursive: true, force: true });

    assert.equal(fs.existsSync(migrationsPath4), false);
});
