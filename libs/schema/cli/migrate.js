const fs = require('fs');
const path = require('path');
const pg = require('pg');
const { cpHistory, getOrCreateHistory } = require('../lib/utils');

const BOLD = '\033[1m%s\033[0m';
const RED = '\x1b[31m%s\x1b[0m';

const MIGRATIONS_TABLE_NAME = 'schema_migrations';
const MIGRATIONS_TABLE_COLUMNS = {
    name: 'name',
    created: 'created',
}

// This function can be replaced with one `create table if not exists` sql statement
// but I want to give a user feedback on what we are going to do if the table doesnt not exists
async function createMigrationsTableIfNeed(client) {
    try {
        const result = await client.query(`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = '${MIGRATIONS_TABLE_NAME}');`)

        if (!result.rows[0]?.exists) {
            console.log('Migrations table does not exists. Going to create one...')

            await client.query(`create table "${MIGRATIONS_TABLE_NAME}" (
                ${MIGRATIONS_TABLE_COLUMNS.name} varchar not null,
                ${MIGRATIONS_TABLE_COLUMNS.created} timestamp default current_timestamp
            );`);

            console.log('Migrations table created successfully!')
        }
    } catch (error) {
        throw error;
    }
}

async function getMigrationsFromDB(client) {
    try {
        const result = await client.query(`SELECT ${MIGRATIONS_TABLE_COLUMNS.name} FROM ${MIGRATIONS_TABLE_NAME}`);

        return result.rows.map(i => i.name);
    } catch (error) {
        throw error;
    }
}

function validateMigrations(migrations) {
    let prevVersion = null;
    for (const migration of migrations) {
        const rawVersion = migration.split('_')[0];
        if (rawVersion.match(/^\d\d\d\d/) === null) {
            throw new Error(`Migration file name has incorrect name - ${migration}, accepted pattern is '0000_name.sql'`)
        }

        const version = Number(rawVersion);

        if (prevVersion !== null && (prevVersion + 1) !== version) {
            const correctVersion = String(prevVersion + 1).padStart(4, '0');
            throw new Error(`Migration file '${migration}' has incorrect version - ${rawVersion}, but it must be ${correctVersion}`)
        }

        prevVersion = version;
    }
}

function findNotApplideMigrations(fromDir, fromDB) {
    return fromDir.filter(m => !fromDB.includes(m));
}

async function runMigrations(client, root, migrations) {
    try {
        await client.query('BEGIN');

        for await (const migration of migrations) {
            const filepath = path.join(root, migration);
            const sql = await fs.promises.readFile(filepath, 'utf-8');

            await client.query(sql);

            await client.query(`INSERT INTO ${MIGRATIONS_TABLE_NAME} (name) values ($1);`, [migration]);
        }

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');

        console.log('Error has happend, rollback running migrations')
        throw new Error(`Failed to run migrations, ${error}`)
    }
}

module.exports = async function migrate(schemasPath, migrationsPath, options) {
    const pool = new pg.Pool({
        database: options.database,
        user: options.user,
        host: options.host,
    });

    const client = await pool.connect();

    try {
        await createMigrationsTableIfNeed(client);

        const migrationsFromDir = await fs.promises.readdir(migrationsPath);
        const migrationsFromDB = await getMigrationsFromDB(client);
        validateMigrations(migrationsFromDir);
        validateMigrations(migrationsFromDB);

        const notAppliedMigratoins = findNotApplideMigrations(migrationsFromDir, migrationsFromDB);

        if (notAppliedMigratoins.length === 0) {
            console.log(BOLD, 'The database is up to date!')
            return;
        } else {
            console.log(BOLD, 'Going to apply next migrations:');
            notAppliedMigratoins.forEach(m => console.log(`   – ${m}`));
        }

        await runMigrations(client, migrationsPath, notAppliedMigratoins);

        const [_, historyPath] = await getOrCreateHistory(schemasPath);
        await cpHistory(schemasPath, historyPath)

        console.log(BOLD, '🏗  Database migrated successfully!');
    } catch (error) {
        console.error(RED, error.message)
    } finally {
        client.release();
        await pool.end();
    }
}
