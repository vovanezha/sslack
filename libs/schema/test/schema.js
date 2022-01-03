const assert = require('assert');
const Schema = require('../lib/schema');

(() => {
    assert.throws(() => new Schema('', null));
    assert.throws(() => new Schema('', 1));
    assert.throws(() => new Schema('', '1'));
    assert.throws(() => new Schema('', []));
})();

(() => {
    const entity = {
        name: 'char',
        login: {type: 'char', unique: true},
        password: 'char',
        id: {type: 'uuid', primaryKey: true},
        age: 'integer',
        created: {type: 'datetime'}
    }

    const schema = new Schema('User', entity);

    assert.equal(schema.fields.name.type, 'char');
    assert.equal(schema.fields.login.type, 'char');
    assert.equal(schema.fields.login.unique, true);
    assert.equal(schema.fields.password.type, 'char');
    assert.equal(schema.fields.id.type, 'uuid');
    assert.equal(schema.fields.id.primaryKey, true);
    assert.equal(schema.fields.age.type, 'integer');
    assert.equal(schema.fields.created.type, 'datetime');
})();

(() => {
    const entity = {
        id: 'uuid',
        group: {one: 'Group'},
        chats: {many: 'Chat'},
    };

    const schema = new Schema('User', entity);
    const constraints = Array.from(schema.constraints);

    assert.deepEqual(constraints, [
        {name: 'group', one: 'Group'},
        {name: 'chats', many: 'Chat'}
    ])
})();

(() => {
    const entity = {
        active: 'boolean',
        lastSeen: {type: 'datetime', nullable: true},
    };

    const schema = Schema.from(entity);

    const input = {
        active: 'no',
        lastSeen: 'incorrect date'
    }

    const errors = schema.validate(input);

    assert.deepEqual(errors.active, [{msg: 'Only boolean is allowed', input: 'no'}])
    assert.deepEqual(errors.lastSeen, [{msg: 'Only date or null are allowed', input: 'incorrect date'}])
})();
