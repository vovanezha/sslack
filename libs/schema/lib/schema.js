const { validatorByType } = require('./validator');

const validateEntity = entity => {
    if (typeof entity !== 'object' || entity === null || Array.isArray(entity)) {
        throw new Error(`Entity should be an object, but passed ${entity}`);
    }
}

const capitalize = str => `${str[0].toUpperCase()}${str.substring(1)}`;

const combineWithDefault = x => Object.assign({}, { nullable: false, unique: false, primaryKey: false }, x);

const processorByType = {
    char: (value) => {
        const { length } = value;
        if (length !== undefined) {
            if (Array.isArray(length)) return { ...value, length: { min: length[0] || 0, max: length[1] || 50 } }
            if (typeof length === 'number') return { ...value, length: { min: 0, max: length } }
            if (typeof length === 'string') return { ...value, length: { min: 0, max: parseInt(length, 10) } }
            if (typeof length === 'object') return { ...value, length: { min: length.min || 0, max: length.max || 50 } }
        }

        return { ...value, length: { min: 0, max: 50 } }
    }
}

class Schema {
    constructor(name, entity, schemas = []) {
        validateEntity(entity);

        this.name = name;
        this.fields = {};
        this.references = [];

        this.entity = entity;
        this.schemas = schemas;

        this.#process(entity);
    }

    // key: {type: 'boolean', nullable, primaryKey, unique, default}
    // key: {type: 'date', nullable, primaryKey, unique, }
    // key: {type: 'time', nullable, primaryKey, unique, }
    // key: {type: 'datetime', nullable, primaryKey, unique, }
    // key: {type: 'serial', nullable, primaryKey, unique, }
    // key: {type: 'integer', nullable, primaryKey, nique, min, max }
    // key: {type: 'float', nullable, primaryKey, unique, min, max }
    // key: {type: 'char', nullable, primaryKey, unique, length }
    // key: {type: 'text', nullable, primaryKey }
    // key: {type: 'uuid', nullable, primaryKey, unique }
    // key: {type: 'email', nullable, primaryKey, unique }
    // key: {fk: 'Table' }
    #process(entity) {
        for (const entry of Object.entries(entity)) {
            const [key, value] = entry;

            if (typeof value === 'object' && (Reflect.has(value, 'foreignKey') || Reflect.has(value, 'through'))) {
                this.#processReferences(entry);
            } else {
                this.#processPlainField(entry);
            }
        }
    }

    #processPlainField([key, value]) {
        if (typeof value !== 'object') {
            value = { type: value };
        }
        const processor = processorByType[value.type] || (x => x);
        value = combineWithDefault(processor(value));

        this.fields[key] = value;
    }

    #processReferences([key, value]) {
        if (value.foreignKey) {
            const toField = value.toField || 'id'
            this.references.push({
                field: key,
                foreignKey: value.foreignKey,
                toField: toField,
                constraintName: value.constraintName || `fk${capitalize(key)}`,
            });

            const type = value.type || this.#findFKType(toField, value.foreignKey);

            this.fields[key] = combineWithDefault({ type });
        } else if (value.through) {
            const type = this.#findPKType();
            this.#findManyToManyPair(value.through);

            this.references.push({
                through: value.through,
                primaryKeyType: type,
                as: value.as || `${this.name.toLowerCase()}Id`,
            });
        }
    }

    #findPKType() {
        const field = Object.values(this.entity).find((value) => typeof value !== 'string' && value.primaryKey);

        if (!field) throw new Error(`Schema "${this.name}" doesn't have any primary key to use it in Many-to-Many relationship`);

        return field.type;
    }

    #findFKType(key, table) {
        const schema = this.schemas.find(s => s.filename === table);
        if (!schema) {
            console.warn(
                "\x1b[33m%s\x1b[0m",
                `Schema "${this.name}" has foreign key "${key}", but doesn't have referenced table "${table}"`
            );
            return null; // may be we should throws an exception
        }

        const field = schema.exports[key];
        if (!field) throw new Error(`Schema "${filename}" doesn't have column with name "${key}"`);
        if (!field.primaryKey) throw new Error(`Column "${key}" in the "${table}" schema is not an primary key`);

        return typeof field === 'string' ? field : field.type;
    }

    #findManyToManyPair(table) {
        const manyToMany = this.schemas.filter(schema => Object.values(schema.exports).find(v => v.through === table));

        if (manyToMany.length < 2) throw new Error(`Schema "${this.name}" doesn't have pair for Many-to-Many relationship through table (${table})`);

        return manyToMany;
    }

    validate(input) {
        if (!input) {
            return { general: { msg: 'Falsy input is not allowed', input } }
        }

        if (typeof input !== 'object' || Array.isArray(input)) {
            return { general: [{ msg: 'Only object input is allowed', input }] };
        }

        const errors = {};
        for (const [key, value] of Object.entries(input)) {
            const field = this.fields[key];

            if (!field) {
                errors[key] = [{ msg: 'The field is not allowed', input: value }];
                continue;
            }

            const validate = validatorByType[field.type];
            const fieldErrors = validate(value, field);

            if (fieldErrors) errors[key] = fieldErrors;
        }

        return Object.keys(errors).length > 0 ? errors : false;
    }

    static from(entity) {
        return new Schema('', entity);
    }

    static fromStructs(structs) {
        return structs.map(s => new Schema(s.filename, s.exports, structs))
    }
}

module.exports = Schema;
