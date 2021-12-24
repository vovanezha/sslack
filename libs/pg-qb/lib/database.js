const QueryBuilder = require('./query-builder');

class Database extends QueryBuilder {
    constructor(config, logger = console) {
        super();

        this.config = config;
        this.logger = logger;
    }

    async resolve() {
        console.log('FROM DATABASE', this.sql, this.args)

        return new Promise(res => setTimeout(res, 1000));
    }
}

module.exports = Database;
