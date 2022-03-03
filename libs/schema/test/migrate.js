const path = require('path');
const child_process = require('child_process');
const migrate = require('../cli/migrate');

const absPath = (p) => path.join(process.cwd(), p);

const migrationPath = absPath('./test/__fixtures__/migrate/migrations');

const dbname = Math.random().toString(32).replace('0.', '');
const username = Math.random().toString(32).replace('0.', '');
const options = {
    database: dbname,
    user: username,
    host: 'localhost',
};

(() => {
    child_process.spawnSync('createuser', [username]);
    child_process.spawnSync('createdb', [dbname, '-O', username]);
})();

(async () => {
    await migrate(migrationPath, options);
})().finally(() => {
    child_process.spawnSync('dropdb', [dbname]);
    child_process.spawnSync('dropuser', [username]);
});
