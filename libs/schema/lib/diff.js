const Builder = require("./builder");
const { isEqual } = require("./utils");

const q = v => `"${v}"`;

function enumerate(arr1, arr2, key) {
    if (arr2.length > arr1.length) {
        return arr2.map((item2) => {
            const item1 = arr1.find(i => key ? i[key] === item2[key] : i === item2);

            return [item1, item2];
        })
    }
    return arr1.map((item1) => {
        const item2 = arr2.find(i => key ? i[key] === item1[key] : i === item1);

        return [item1, item2];
    });
}

function makeTempNames(schemas, rename) {
    const names = Object.values(schemas)
        .filter(s => s.new)
        .map(s => s.new.name);

    const shouldRename = (key) => {
        return names.includes(key) && schemas[key].old !== null && schemas[key].new !== null;
    }

    return Object.keys(schemas).reduce((acc, key) => ({
        ...acc,
        [key]: {
            old: schemas[key].old,
            new: schemas[key].new ? {
                ...schemas[key].new,
                name: shouldRename(key) ? rename(schemas[key].new.name) : schemas[key].new.name,
                references: schemas[key].new.references.map(ref => shouldRename(ref.foreignKey)
                    ? ({
                        ...ref,
                        foreignKey: rename(ref.foreignKey)
                    })
                    : ref),
                schemas: schemas[key].new.schemas.map(struct => shouldRename(struct.filename)
                    ? ({ ...struct, filename: rename(struct.filename) })
                    : struct
                )
            } : null
        }
    }), {});
}

function extractChanges(schemas) {
    const tempName = (name) => `new__${name}`;

    const dropTables = Object.values(schemas)
        .filter(v => v.new === null)
        .map(s => `DROP TABLE ${q(s.old.name)}`)
        .join('\n');

    const schemasWithTempNames = makeTempNames(schemas, tempName)
    const newSchemas = Object.values(schemasWithTempNames).filter(s => s.new).map(s => s.new)

    const createTableSql = new Builder(newSchemas).toSQL();

    const updateTablesSql = Object.keys(schemasWithTempNames)
        .filter(key => schemas[key].old !== null && schemas[key].new !== null)
        .map(key => {
            const name = tempName(key);
            const newSchema = schemas[key].new;
            const oldSchema = schemas[key].old;
            const commonFields = Object.keys(newSchema.fields)
                .filter(field => Object.keys(oldSchema.fields).includes(field))
                .map(q)
                .join(', ');

            const insertTableSql = `INSERT INTO ${q(name)} (${commonFields}) SELECT ${commonFields} FROM ${q(newSchema.name)};`
            const dropOldTable = `DROP TABLE ${q(newSchema.name)};`;
            const renameTable = `ALTER TABLE ${q(name)} RENAME TO ${q(newSchema.name)};`;

            return [insertTableSql, dropOldTable, renameTable].join('\n')
        })
        .filter(Boolean)
        .join('\n\n')

    return [dropTables, createTableSql, updateTablesSql]
        .filter(Boolean)
        .join('\n\n');
}

module.exports = function diffSchemas(newSchemas, oldSchemas) {
    const schemas = {}

    for (const [newSchema, oldSchema] of enumerate(newSchemas, oldSchemas, 'name')) {
        if (!newSchema) {
            schemas[oldSchema.name] = { new: null, old: oldSchema }
            continue;
        }
        if (!oldSchema) {
            schemas[newSchema.name] = { new: newSchema, old: null }
            continue;
        }

        if (!isEqual(newSchema.fields, oldSchema.fields)) {
            schemas[newSchema.name] = { new: newSchema, old: oldSchema }

            console.dir(newSchema, { depth: null })
        }
    }

    return extractChanges(schemas);
}
