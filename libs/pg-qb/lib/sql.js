const CLAUSE = {
    FROM: 'FROM',
    SELECT: 'SELECT',
    WHERE: 'WHERE',
    ORDER_BY: 'ORDER_BY',
    INTO: 'INTO',
    INSERT: 'INSERT',
    UPDATE: 'UPDATE',
    SET: 'SET',
    DELETE: 'DELETE',
}

const SQL_PART_BY_CLAUSE = {
    [CLAUSE.FROM]: (table) => {
        return `FROM ${table}`;
    },
    [CLAUSE.SELECT]: (fields) => {
        return `SELECT ${fields.join(', ')}`;
    },
    [CLAUSE.WHERE]: (conditions, offset = 0) => {
        return Object.entries(conditions)
            .map(([key, val], i) => {
                const operator = (Array.isArray(val) ? val[0] : '=').toUpperCase() // in case we got 'like'
                const index = i + 1 + offset;

                return `${key} ${operator} $${index}`;
            })
            .reduce((acc, sql, index) => (index === 0 ? `WHERE ${sql}` : acc + ` AND ${sql}`), '');
    },
    [CLAUSE.ORDER_BY]: (columns) => {
        return columns
            .map(column => Array.isArray(column) ? `${column[0]} ${column[1].toUpperCase()}` : column)
            .reduce((acc, column, index) => index === 0 ? `ORDER BY ${column}` : acc + `, ${column}`, '')
    },
    [CLAUSE.INTO]: (table) => {
        return `INSERT INTO ${table}`
    },
    [CLAUSE.INSERT]: (fields) => {
        fields = !Array.isArray(fields) ? [fields] : fields;

        const columns = Object.keys(fields[0]).join(', ');
        const values = fields
            .map((field, index) => {
                const values = Object.values(field);
                const offset = index * values.length;
                const str = values
                    .map((_, i) => `$${(i + 1) + offset}`)
                    .join(', ');

                return `(${str})`
            })
            .join(', ');

        return `(${columns}) VALUES ${values}`;
    },
    [CLAUSE.UPDATE]: (table) => {
        return `UPDATE ${table}`;
    },
    [CLAUSE.SET]: (fields) => {
        return Object.keys(fields)
            .map((key, i) => `${key} = $${i + 1}`)
            .reduce((acc, sql, index) => index === 0 ? `SET ${sql}` : acc + ` AND ${sql}`, '');
    },
    [CLAUSE.DELETE]: (table) => {
        return `DELETE FROM ${table}`;
    }
}

const ARGS_BY_CLAUSE = {
    [CLAUSE.WHERE]: (conditions) => {
        return Object.values(conditions)
            .map(value => Array.isArray(value) ? value[1] : value);
    },
    [CLAUSE.INSERT]: (fields) => {
        fields = !Array.isArray(fields) ? [fields] : fields;

        const columns = Object.keys(fields[0])
        return fields
            .map(field => {
                return columns.map(column => field[column])
            })
            .reduce((acc, values) => acc.concat(values), []);
    },
    [CLAUSE.SET]: (fields) => {
        return Object.values(fields);
    }
}

module.exports = {CLAUSE, SQL_PART_BY_CLAUSE, ARGS_BY_CLAUSE}
