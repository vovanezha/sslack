const Schema = require("./schema");

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

    #preprocessManyToMany() {
        const manyToManyTables = this.schemas.reduce((acc, schema) => {
            const manyToMany = schema.references.filter(ref => ref.through);
            if (manyToMany.length === 0) return acc;

            manyToMany.forEach(field => {
                const existing = acc.get(field.through) || {};

                acc.set(field.through, { ...existing, [field.as]: { type: field.primaryKeyType, foreignKey: schema.name }, })
            });

            return acc;
        }, new Map());

        this.schemas = this.schemas.map(schema => ({ ...schema, references: schema.references.filter(ref => !ref.through) }));

        const manyToManySchemas = [];
        for (const [key, value] of manyToManyTables.entries()) {
            manyToManySchemas.push(new Schema(key, value));
        }

        this.schemas = this.schemas.concat(manyToManySchemas);
    }

    toSQL() {
        this.#preprocessManyToMany();

        const tables = this.schemas.map(this.createTable).join('\n\n');
        const constraints = this.schemas.map(this.createConstraints).filter(Boolean).join('\n\n');

        return [tables, constraints].join('\n\n') + '\n';
    }
}

module.exports = Builder;
