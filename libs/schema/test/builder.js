const assert = require('assert');
const Builder = require('../lib/builder');
const Schema = require('../lib/schema');

const getSql = p => require(`./__fixtures__/${p}`);

(() => {
    const builder = new Builder();

    const schema = new Schema('User', {
        name: { type: 'char', unique: true },
        password: { type: 'char' },
        created: { type: 'datetime' },
        id: { type: 'uuid', primaryKey: true },
        active: { type: 'boolean', nullable: true },
        age: { type: 'integer', default: 12 },

        city: { many: 'City' },
    })

    const table = builder.createTable(schema);

    assert.equal(table, getSql('create-table-user'));
})();

(() => {
    const builder = new Builder();

    const schema = new Schema('User', {
        id: 'uuid',
        group: { foreignKey: 'Group' },
        chat: { foreignKey: 'Chat', toField: 'token' },
        profile: { foreignKey: 'Profile', toField: 'id', constraintName: 'profile_id' },
    });
    const constraints = builder.createConstraints(schema);

    assert.equal(constraints, getSql('foreign-key-user'));
})();

// WHOLE SQL SCRIPT
(async () => {
    const structs = [
        {
            filename: 'Channel',
            exports: {
                id: { type: 'uuid', primaryKey: true },
                name: 'char',
                description: { type: 'char', nullable: true },
                workspace: { foreignKey: 'Workspace' },
                profile: { foreignKey: 'Profile' },
            }
        },
        {
            filename: 'Profile',
            exports: {
                id: { type: 'uuid', primaryKey: true },
                name: 'char',
                surname: 'char',
                avatar: 'char',
                user: { foreignKey: 'User' },
                workspaces: { through: 'WorkspaceProfile' }
            },
        },
        {
            filename: 'User',
            exports: {
                id: { type: 'serial', primaryKey: true },
                login: { type: 'char', unique: true },
                password: 'char',
                created: 'datetime',
            },
        },
        {
            filename: 'Workspace',
            exports: {
                id: { type: 'uuid', primaryKey: true },
                name: 'char',
                description: { type: 'char', nullable: true },
                profile: { through: 'WorkspaceProfile' },
            }
        },
    ];

    const schemas = structs.map(struct => new Schema(struct.filename, struct.exports, structs));

    const builder = new Builder(schemas);

    const sql = builder.toSQL();

    assert.equal(sql, getSql('table-and-constraints'));
})();

// MANY TO MANY
(async () => {
    const structs = [
        {
            filename: 'Profile',
            exports: {
                id: { type: 'uuid', primaryKey: true },
                name: 'char',
                surname: 'char',
                avatar: 'char',
                user: { foreignKey: 'User' },
                workspaces: { through: 'WorkspaceProfile' }
            },
        },
        {
            filename: 'Workspace',
            exports: {
                id: { type: 'uuid', primaryKey: true },
                name: 'char',
                description: { type: 'char', nullable: true },
                profiles: { through: 'WorkspaceProfile' },
            }
        },
    ];

    const schemas = structs.map(struct => new Schema(struct.filename, struct.exports, structs));

    const builder = new Builder(schemas);

    const sql = builder.toSQL();

    assert.equal(sql, getSql('many-to-many'));
})();
