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
    let schema = Schema.from({bool: 'boolean'});
    let input = true;
    let errors = schema.validate({bool: input});
    assert.equal(errors, false)

    input = false
    errors = schema.validate({bool: input});
    assert.equal(errors, false)

    input = null
    errors = schema.validate({bool: input});
    assert.deepEqual(errors, {bool: [{msg: 'Only boolean is allowed', input}]})

    input = 123
    errors = schema.validate({bool: input});
    assert.deepEqual(errors, {bool: [{msg: 'Only boolean is allowed', input}]})

    schema = Schema.from({bool: {type: 'boolean', nullable: true}});
    input = true;
    errors = schema.validate({bool: input});
    assert.equal(errors, false);

    input = false
    errors = schema.validate({bool: input});
    assert.equal(errors, false)

    input = null
    errors = schema.validate({bool: input});
    assert.equal(errors, false)

    input = 123
    errors = schema.validate({bool: input});
    assert.deepEqual(errors, {bool: [{msg: 'Only boolean or null are allowed', input}]})
})();

(() => {
    let schema = Schema.from({date: 'datetime'});
    let input = new Date().toISOString();
    let errors = schema.validate({date: input});
    assert.equal(errors, false)

    input = null
    errors = schema.validate({date: input});
    assert.deepEqual(errors, {date: [{msg: 'Only date is allowed', input}]})

    input = 'incorrect date'
    errors = schema.validate({date: input});
    assert.deepEqual(errors, {date: [{msg: 'Only date is allowed', input}]})

    schema = Schema.from({date: {type: 'datetime', nullable: true}})
    input = new Date().toISOString();
    errors = schema.validate({date: input});
    assert.equal(errors, false)

    input = null
    errors = schema.validate({date: input});
    assert.equal(errors, false)

    input = 'incorrect date'
    errors = schema.validate({date: input});
    assert.deepEqual(errors, {date: [{msg: 'Only date or null are allowed', input}]})
})();

(() => {
    let schema = Schema.from({int: 'integer'});
    let input = 1;
    let errors = schema.validate({int: input});
    assert.equal(errors, false)

    input = null
    errors = schema.validate({int: input});
    assert.deepEqual(errors, {int: [{msg: 'Only integer is allowed', input}]})

    input = '123'
    errors = schema.validate({int: input});
    assert.deepEqual(errors, {int: [{msg: 'Only integer is allowed', input}]})

    input = []
    errors = schema.validate({int: input});
    assert.deepEqual(errors, {int: [{msg: 'Only integer is allowed', input}]})

    schema = Schema.from({int: {type: 'integer', nullable: true}});
    input = 1;
    errors = schema.validate({int: input});
    assert.equal(errors, false)

    input = null
    errors = schema.validate({int: input});
    assert.equal(errors, false)

    input = '123'
    errors = schema.validate({int: input});
    assert.deepEqual(errors, {int: [{msg: 'Only integer or null are allowed', input}]})

    input = []
    errors = schema.validate({int: input});
    assert.deepEqual(errors, {int: [{msg: 'Only integer or null are allowed', input}]})
})();
