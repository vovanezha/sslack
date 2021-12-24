const {CLAUSE, SQL_PART_BY_CLAUSE, ARGS_BY_CLAUSE} = require("../sql");
const validator = require('../validation/validators');

class Insert {
    constructor(builder, fields) {
        this.builder = builder;

        validator.insertFields(fields);

        this.clauses = new Map();
        this.clauses.set(CLAUSE.INTO, builder.table);
        this.clauses.set(CLAUSE.INSERT, fields);
    }

    resolve() {
        this.builder.sql = [
            CLAUSE.INTO,
            CLAUSE.INSERT,
        ]
            .filter(clause => this.clauses.has(clause))
            .map(clause => SQL_PART_BY_CLAUSE[clause](this.clauses.get(clause)))
            .filter(Boolean)
            .join(' ');

        this.builder.args = [CLAUSE.INSERT]
            .filter(clause => this.clauses.has(clause))
            .map(clause => ARGS_BY_CLAUSE[clause](this.clauses.get(clause)))
            .reduce((acc, args) => acc.concat(args), []);

        return this.builder.resolve();
    }
}

module.exports = Insert;
