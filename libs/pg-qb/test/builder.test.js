const assert = require('assert');
const Builder = require('../lib/builder');

const builder = new Builder();

(() => {
    const {sql, args} = builder.from('User')
        .select(['name', 'login'])
        .resolve();

    assert.equal(sql, 'FROM User SELECT name, login');
    assert.deepEqual(args, []);
})();


// WHERE
(() => {
    const {sql, args} = builder.from('User')
        .where({})
        .resolve();

    assert.equal(sql, 'FROM User SELECT *');
    assert.deepEqual(args, [])
})();

(() => {
    const qb = builder.from('User');

    assert.throws(() => qb.where(null), {message: 'Conditions should be an object, but passed null'});
})();

(() => {
    const qb = builder.from('User');

    assert.throws(() => qb.where(), {message: 'Conditions should be an object, but passed undefined'});
})();

(() => {
    const {sql, args} = builder.from('User')
        .where({name: 'john'})
        .resolve();

    assert.equal(sql, 'FROM User SELECT * WHERE name = $1');
    assert.deepEqual(args, ['john'])
})();

(() => {
    const {sql, args} = builder.from('User')
    .where({
        name: 'john',
        friends: '<5',
        age: '>18',
        login: '<>user123',
        respect: '<=20',
        cash: '>=1000$',
        password: 'qwer?y',
        surname: 'bu*ck',
    })
    .resolve();

    assert.equal(sql, 'FROM User SELECT * WHERE name = $1 AND friends < $2 AND age > $3 AND login <> $4 AND respect <= $5 AND cash >= $6 AND password LIKE $7 AND surname LIKE $8');
    assert.deepEqual(args, ['john', '5', '18', 'user123', '20', '1000$', 'qwer_y', 'bu%ck'])
})();

(() => {
    const {sql, args} = builder.from('User')
        .where({name: 'john'})
        .where({lastname: 'buck'})
        .where({password: 'john*buck'})
        .where({age: '>10'})
        .resolve();

    assert.equal(sql, 'FROM User SELECT * WHERE name = $1 AND lastname = $2 AND password LIKE $3 AND age > $4');
    assert.deepEqual(args, ['john', 'buck', 'john%buck', '10'])
})();
