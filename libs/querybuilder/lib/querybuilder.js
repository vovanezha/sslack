const Select = require('./strategy/select');
const Insert = require('./strategy/insert');
const Update = require('./strategy/update');
const Delete = require('./strategy/delete');

class Cursor {
    constructor(builder) {
        this.builder = builder;
    }

    select(fields) {
        return new Select(this.builder, fields)
    };

    insert(fields) {
        return new Insert(this.builder, fields)
    };

    update(fields) {
        return new Update(this.builder, fields)
    };

    delete() {
        return new Delete(this.builder)
    };
}

class QueryBuilder {
    constructor() {
        this.sql = '';
        this.args = null;
    }

    in(table) {
        const {resolve, sql, args} = this;

        return new Cursor({sql, args, resolve, table});
    }

    resolve() {
        const {sql, args} = this;

        return {sql, args}
    }
}

module.exports = {QueryBuilder, Cursor};
