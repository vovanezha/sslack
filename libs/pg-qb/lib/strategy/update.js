const {CLAUSE, SQL_PART_BY_CLAUSE, ARGS_BY_CLAUSE} = require('../sql');
const validator = require('../validation/validators');

class Update {
    constructor(builder, fields) {
        this.builder = builder;

        validator.updateFields(fields);

        this.clauses = new Map();
        this.clauses.set(CLAUSE.UPDATE, builder.table);
        this.clauses.set(CLAUSE.SET, fields);
    }

    where(...conditions) {
        validator.where(conditions);

        this.clauses.set(CLAUSE.WHERE, conditions);

        return this;
    }

    resolve() {
        let sql = [
            CLAUSE.UPDATE,
            CLAUSE.SET,
        ]
            .filter(clause => this.clauses.has(clause))
            .map(clause => SQL_PART_BY_CLAUSE[clause](this.clauses.get(clause)))
            .filter(Boolean)
            .join(' ');

        if (this.clauses.has(CLAUSE.WHERE)) {
            const startedIndex = Object.values(this.clauses.get(CLAUSE.SET)).length;
            const whereClause = SQL_PART_BY_CLAUSE[CLAUSE.WHERE](this.clauses.get(CLAUSE.WHERE), startedIndex);

            sql += ` ${whereClause}`;
        }

        this.builder.sql = sql;

        this.builder.args = [
            CLAUSE.SET,
            CLAUSE.WHERE,
        ]
            .filter(clause => this.clauses.has(clause))
            .map(clause => ARGS_BY_CLAUSE[clause](this.clauses.get(clause)))
            .reduce((acc, args) => acc.concat(args), []);

        return this.builder.resolve();
    }
}

module.exports = Update;
