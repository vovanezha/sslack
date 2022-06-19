const path = require('path');
const fs = require('fs');
const assert = require('assert');
const makeMigration = require("../cli/make-migration");

const absPath = (p) => path.join(process.cwd(), p);

const schemasPath = path.join(process.cwd(), './test/__fixtures__/schemas');

function assertFoldersEqual(folder1, folder2) {
    const files1 = fs.readdirSync(folder1);
    const files2 = fs.readdirSync(folder2);

    assert.equal(files1.length, files2.length);

    files1.forEach((file1, index) => assert.equal(file1, files2[index]));

    files1.forEach((file1, index) => {
        const filepath1 = path.join(folder1, file1);
        const filepath2 = path.join(folder2, files2[index]);


        const stat1 = fs.statSync(filepath1);
        const stat2 = fs.statSync(filepath2);

        if (!stat1.isDirectory() && !stat2.isDirectory()) {
            const content1 = fs.readFileSync(filepath1, 'utf-8');
            const content2 = fs.readFileSync(filepath2, 'utf-8');

            return assert.equal(content1, content2);
        }

        if (stat1.isDirectory() && stat2.isDirectory()) {
            return assertFoldersEqual(filepath1)
        }

        throw new Error('Assertion failed, one entry is directory and the other is not')
    })
}

const migrationsDir1 = absPath('./test/__fixtures__/make-migration/01/actual/migrations');
const migrationsDir2 = absPath('./test/__fixtures__/make-migration/02/actual/migrations');
const migrationsDir3 = absPath('./test/__fixtures__/make-migration/03/actual/migrations');
const migrationsDir4 = absPath('./test/__fixtures__/make-migration/04/actual/migrations');

// prepare fixtures
(() => {
    if (!fs.existsSync(migrationsDir1)) {
        fs.mkdirSync(migrationsDir1, {recursive: true})
    }

    if (!fs.existsSync(migrationsDir2)) {
        fs.mkdirSync(migrationsDir2, {recursive: true})
    }

    if (!fs.existsSync(migrationsDir4)) {
        fs.mkdirSync(migrationsDir4, {recursive: true})
    }
})();

// without migrations directory
(async () => {
    const expectedDir = absPath('./test/__fixtures__/make-migration/01/expected/migrations')

    await makeMigration(schemasPath, migrationsDir1).catch(err => console.log(err));

    assertFoldersEqual(expectedDir, migrationsDir1)
})().finally(async () => {
    // cleanup
    await fs.promises.rm(migrationsDir1, { recursive: true, force: true });

    assert.equal(fs.existsSync(migrationsDir1), false);
});

// with migrations directory but without any migration file
(async () => {
    const expectedDir = absPath('./test/__fixtures__/make-migration/02/expected/migrations');

    await makeMigration(schemasPath, migrationsDir2).catch(err => console.error(err));

    assertFoldersEqual(expectedDir, migrationsDir2)
})().finally(async () => {
    // cleanup
    await fs.promises.rm(migrationsDir2 + '/0001_migration.sql');

    assert.equal(fs.existsSync(migrationsDir2 + '/0001_migration.sql'), false);
});

// with migrations directory and with one migration file
(async () => {
    const expectedDir = absPath('./test/__fixtures__/make-migration/03/expected/migrations');

    await makeMigration(schemasPath, migrationsDir3).catch(err => console.error(err));

    assertFoldersEqual(expectedDir, migrationsDir3)
})().finally(async () => {
    // cleanup
    await fs.promises.rm(migrationsDir3 + '/0002_migration.sql');

    assert.equal(fs.existsSync(migrationsDir3 + '/0001_migration.sql'), true);
    assert.equal(fs.existsSync(migrationsDir3 + '/0002_migration.sql'), false);
});

// custom migration name
(async () => {
    const expectedDir = absPath('./test/__fixtures__/make-migration/04/expected/migrations');

    await makeMigration(schemasPath, migrationsDir4, 'add_name_field').catch(err => console.error(err));

    assertFoldersEqual(expectedDir, migrationsDir4);
})().finally(async () => {
    // cleanup
    await fs.promises.rm(migrationsDir4 + '/0001_add_name_field.sql', { recursive: true, force: true });

    assert.equal(fs.existsSync(migrationsDir4 + '/0001_add_name_field.sql'), false);
});
