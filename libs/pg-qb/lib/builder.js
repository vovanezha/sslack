const METHODS = {
    FROM: 'FROM',
    SELECT: 'SELECT',
    WHERE: 'WHERE',
}

const SQL_PART_BY_METHOD = {
    [METHODS.FROM]: (table) => {
        return `FROM ${table}`;
    },
    [METHODS.SELECT]: (fields) => {
        return `SELECT ${fields.join(', ')}`;
    },
    [METHODS.WHERE]: (conditions) => {
        return Object.entries(conditions)
            .map(([key, value], i) => {
                const index = i + 1;

                const operator = ['<=', '>=', '<>', '<', '>'].find(op => value.startsWith(op));
                if (operator) {
                    return [value.replace(operator, ''), `${key} ${operator} $${index}`];
                }

                const like = [{from: '*', to: '%'}, {from: '?', to: '_'}].find(op => value.includes(op.from));
                if (like) {
                    return [value.replace(new RegExp(`\\${like.from}`, 'g'), like.to), `${key} LIKE $${index}`];
                }

                return [value, `${key} = $${index}`];
            })
            .reduce((acc, [value, clause], index) => ({
                args: acc.args.concat(value),
                clause: index === 0 ? `WHERE ${clause}` : acc.clause + ` AND ${clause}`,
            }), {args: [], clause: ''});
    }
}

// use Strategy for different modes: InFrom, InSelect, InInitial
class Builder {
    #methods = [];

    constructor() {
        this.#methods = [];
    }

    from(table) {
        if (typeof table !== 'string') {
            throw new Error(`Table name should be a string, but passed ${JSON.stringify(table)}`)
        }

        // const [existingFrom, existingTable] = this.#methods.find(([method]) => method === METHODS.FROM)
        // if (existingFrom) {
        //     throw new Error(`Builder already has FROM method with given TABLE ${JSON.stringify(existingTable)}`)
        // }

        this.#methods.push([METHODS.FROM, table]);

        return this;
    }

    select(fields) {
        if (!Array.isArray(fields) || fields.some(field => typeof field !== 'string')) {
            throw new Error(`Fields should be an array of strings, but passed ${JSON.stringify(fields)}`)
        }

        this.#methods.push([METHODS.SELECT, fields]);

        return this;
    }

    where(conditions) {
        if (typeof conditions !== 'object' || conditions === null) {
            throw new Error(`Conditions should be an object, but passed ${JSON.stringify(conditions)}`)
        }

        this.#methods.push([METHODS.WHERE, conditions]);

        return this;
    }

    resolve() {
        // TODO: it might be better to union values of the same methods inside the methods iteself
        const [_, table] = this.#methods.find(([method]) => method === METHODS.FROM);
        const fields = this.#methods
            .filter(([method]) => method === METHODS.SELECT)
            .reduce((acc, [_, fields], index) => index === 0 ? fields : acc.concat(fields), ['*']);
        const conditions = this.#methods
            .filter(([method]) => method === METHODS.WHERE)
            .reduce((acc, [_, conditions]) => Object.assign(acc, conditions), {});

        const from = SQL_PART_BY_METHOD[METHODS.FROM](table);
        const select = SQL_PART_BY_METHOD[METHODS.SELECT](fields)
        const {args, clause: where} = SQL_PART_BY_METHOD[METHODS.WHERE](conditions)

        const sql = [from, select, where].filter(Boolean).join(' ');

        this.#methods = [];

        return {sql, args}
    }
}

module.exports = Builder;
