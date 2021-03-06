const {CLAUSE, SQL_PART_BY_CLAUSE, ARGS_BY_CLAUSE} = require('../sql');
const validator = require('../validation/validators');

class Select {
    constructor(builder, columns) {
        this.builder = builder;

        this.clauses = new Map();
        this.clauses.set(CLAUSE.SELECT, Array.isArray(columns) && columns.length > 0 ? columns : ['*']);
        this.clauses.set(CLAUSE.FROM, builder.table);
    }

    where(...conditions) {
        validator.where(conditions);

        this.clauses.set(CLAUSE.WHERE, conditions);

        return this;
    }

    orderBy(columns) {
        validator.orderBy(columns);

        this.clauses.set(CLAUSE.ORDER_BY, columns)

        return this;
    }

    resolve(...args) {
        this.builder.sql = [
            CLAUSE.SELECT,
            CLAUSE.FROM,
            CLAUSE.WHERE,
            CLAUSE.ORDER_BY,
        ]
            .filter(clause => this.clauses.has(clause))
            .map(clause => SQL_PART_BY_CLAUSE[clause](this.clauses.get(clause)))
            .filter(Boolean)
            .join(' ');

        this.builder.args = [CLAUSE.WHERE]
            .filter(clause => this.clauses.has(clause))
            .map(clause => ARGS_BY_CLAUSE[clause](this.clauses.get(clause)))
            .reduce((acc, args) => acc.concat(args), []);

        return this.builder.resolve(...args);
    }
}

module.exports = Select;
