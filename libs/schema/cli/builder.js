// creates a table
// then alters constraints

// all specified tables
// all automaically generated many-to-many tables
// all constraints

const q = v => `"${v}"`;

const schemaToPostgresTypes = {
    datetime: 'timestamp with time zone',
    char: 'varchar',
}

class Builder {
    constructor(schemas) {
        this.schemas = schemas;
    }

    createTable(schema) {
        const build = (table, fields) => `CREATE TABLE ${q(table)} (\n${fields}\n);`;

        const fields = Object.entries(schema.fields)
            .map(([name, props]) => {
                const line = [
                    '  ',
                    q(name),
                    schemaToPostgresTypes[props.type] || props.type,
                    props.nullable ? '' : 'NOT NULL',
                    props.primaryKey ? 'PRIMARY KEY' : '',
                    props.unique ? 'UNIQUE' : '',
                    props.default !== undefined ? `DEFAULT ${props.default}` : '',
                ];
                return line.filter(Boolean).join(' ');
            })
            .join(',\n');

        return build(schema.name, fields);
    }

    createConstraints(schema) {
        const build = (table, name, cols, refTable, refCols) => `ALTER TABLE ${q(table)} ADD CONSTRAINT ${q(name)} FOREIGN KEY (${q(cols)}) REFERENCES ${q(refTable)} (${q(refCols)});`

        return schema.references
            .map(reference => {
                const name = reference.constraintName;
                const cols = reference.field;
                const refTable = reference.foreignKey;
                const refCols = reference.toField;

                return build(schema.name, name, cols, refTable, refCols);
            })
            .join('\n');
    }

    toSQL() {
        const tables = this.schemas.map(this.createTable).join('\n\n');
        const constraints = this.schemas.map(this.createConstraints).filter(Boolean).join('\n\n');

        return [tables, constraints].join('\n\n')
    }
}

module.exports = Builder;
