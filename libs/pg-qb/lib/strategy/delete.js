const {CLAUSE, SQL_PART_BY_CLAUSE, ARGS_BY_CLAUSE} = require('../sql');
const validator = require('../validation/validators');

class Delete {
    constructor(builder) {
        this.builder = builder;

        this.clauses = new Map();
        this.clauses.set(CLAUSE.DELETE, builder.table);
    }

    where(...conditions) {
        validator.where(conditions);

        this.clauses.set(CLAUSE.WHERE, conditions);

        return this;
    }

    resolve() {
        this.builder.sql = [
            CLAUSE.DELETE,
            CLAUSE.WHERE,
        ]
            .filter(clause => this.clauses.has(clause))
            .map(clause => SQL_PART_BY_CLAUSE[clause](this.clauses.get(clause)))
            .filter(Boolean)
            .join(' ');

        this.builder.args = [CLAUSE.WHERE]
            .filter(clause => this.clauses.has(clause))
            .map(clause => ARGS_BY_CLAUSE[clause](this.clauses.get(clause)))
            .reduce((acc, args) => acc.concat(args), []);

        return this.builder.resolve();
    }
}

module.exports = Delete;
