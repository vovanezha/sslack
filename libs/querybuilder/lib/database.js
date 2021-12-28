const {Pool} = require('pg');
const {QueryBuilder, Cursor} = require('./querybuilder');

const RESULT_BY_MODE = {
    'value': (result) => {
        const [col] = result.fields;
        const [row] = result.rows;

        return row[col.name];
    },
    'count': (result) => {
        return result.rowCount;
    },
    'rows': (result) => {
        return result.rows;
    }
}

class Database extends QueryBuilder {
    constructor(config, logger = console) {
        super();

        this.config = config;
        this.logger = logger;

        this.pool = new Pool(config);
    }

    in(table) {
        // TODO: explore why 'pool' doesn't work if not passing it here
        const {resolve, sql, args, pool} = this;

        return new Cursor({sql, args, resolve, table, pool});
    }

    async resolve(mode = 'rows') {
        const result = await this.pool.query(this.sql, this.args);

        return RESULT_BY_MODE[mode](result);
    }
}

module.exports = Database;
