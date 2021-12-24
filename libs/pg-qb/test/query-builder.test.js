const assert = require('assert');
const QueryBuilder = require('../lib/query-builder');

const builder = new QueryBuilder();

(() => {
    assert.throws(() => builder.in('Users').select().select());
    assert.throws(() => builder.in('Users').select().insert());
    assert.throws(() => builder.in('Users').select().update());
    assert.throws(() => builder.in('Users').select().delete());

    assert.throws(() => builder.in('Users').insert().select());
    assert.throws(() => builder.in('Users').insert().insert());
    assert.throws(() => builder.in('Users').insert().update());
    assert.throws(() => builder.in('Users').insert().delete());

    assert.throws(() => builder.in('Users').update().select());
    assert.throws(() => builder.in('Users').update().insert());
    assert.throws(() => builder.in('Users').update().update());
    assert.throws(() => builder.in('Users').update().delete());

    assert.throws(() => builder.in('Users').delete().select());
    assert.throws(() => builder.in('Users').delete().insert());
    assert.throws(() => builder.in('Users').delete().update());
    assert.throws(() => builder.in('Users').delete().delete());
})();

// SELECT
(() => {
    const {sql, args} = builder.in('User')
        .select()
        .where({})
        .resolve();

    assert.equal(sql, 'SELECT * FROM User');
    assert.deepEqual(args, [])
})();

(() => {
    const {sql, args} = builder.in('User')
        .select()
        .where({
            name: 'john',
            friends: ['<', 5],
            age: ['>', 18],
            login: ['<>', 'user123'],
            respect: ['<=' , 20],
            cash: ['>=', '1000$'],
            password: ['like', 'qwer_y'],
            surname: ['like', 'bu%ck'],
        })
        .resolve();

    assert.equal(sql, 'SELECT * FROM User WHERE name = $1 AND friends < $2 AND age > $3 AND login <> $4 AND respect <= $5 AND cash >= $6 AND password LIKE $7 AND surname LIKE $8');
    assert.deepEqual(args, ['john', 5, 18, 'user123', 20, '1000$', 'qwer_y', 'bu%ck'])
})();

(() => {
    const {sql, args} = builder.in('User')
        .select()
        .orderBy(['createdDate'])
        .resolve();

    assert.equal(sql, 'SELECT * FROM User ORDER BY createdDate');
    assert.deepEqual(args, []);
})();

(() => {
    const {sql, args} = builder.in('User')
        .select()
        .orderBy([['createdDate', 'decs']])
        .resolve();

    assert.equal(sql, 'SELECT * FROM User ORDER BY createdDate DECS');
    assert.deepEqual(args, []);
})();

(() => {
    const {sql, args} = builder.in('User')
        .select()
        .orderBy(['login', ['createdDate', 'decs'], ['modifiedDate', 'asc']])
        .resolve();

    assert.equal(sql, 'SELECT * FROM User ORDER BY login, createdDate DECS, modifiedDate ASC');
    assert.deepEqual(args, []);
})();


// INSERT
(() => {
    const {sql, args} = builder.in('User')
        .insert({login: 'john3000', password: '123123', email: 'john_super_cool@mail.com'})
        .resolve();

    assert.equal(sql, 'INSERT INTO User (login, password, email) VALUES ($1, $2, $3)');
    assert.deepEqual(args, ['john3000', '123123', 'john_super_cool@mail.com'])
})();

(() => {
    const {sql, args} = builder.in('User')
        .insert([
            {login: 'john3000', password: '123123', email: 'john_super_cool@mail.com'},
            {login: 'alex_man', email: 'alex_turbo@mail.com', password: 'qwerty' },
        ])
        .resolve();

    assert.equal(sql, 'INSERT INTO User (login, password, email) VALUES ($1, $2, $3), ($4, $5, $6)');
    assert.deepEqual(args, ['john3000', '123123', 'john_super_cool@mail.com', 'alex_man', 'qwerty', 'alex_turbo@mail.com'])
})();

(() => {
    assert.throws(() => {
        builder.in('User')
            .insert([
                {login: 'john3000', password: '123123', email: 'john_super_cool@mail.com'},
                {login: 'alex_man', email: 'alex_turbo@mail.com', password: 'qwerty', test: 123},
            ])
    })
})();

// UPDATE
(() => {
    const {sql, args} = builder.in('User')
        .update({login: 'my_login', email: 'user@mail.com'})
        .resolve();

    assert.equal(sql, 'UPDATE User SET login = $1 AND email = $2');
    assert.deepEqual(args, ['my_login', 'user@mail.com'])
})();

(() => {
    const {sql, args} = builder.in('User')
        .update({login: 'my_login', email: 'user@mail.com'})
        .where({id: 1, age: ['>=', 16]})
        .resolve();

    assert.equal(sql, 'UPDATE User SET login = $1 AND email = $2 WHERE id = $3 AND age >= $4');
    assert.deepEqual(args, ['my_login', 'user@mail.com', 1, 16])
})();

(() => {
    assert.throws(() => builder.in('User').update());
    assert.throws(() => builder.in('User').update(null));
    assert.throws(() => builder.in('User').update({id: 1}).where());
})();

// DELETE
(() => {
    const {sql, args} = builder.in('User')
        .delete()
        .resolve();

    assert.equal(sql, 'DELETE FROM User');
    assert.deepEqual(args, []);
})();

(() => {
    const {sql, args} = builder.in('User')
        .delete()
        .where({id: 1})
        .resolve();

    assert.equal(sql, 'DELETE FROM User WHERE id = $1');
    assert.deepEqual(args, [1]);
})();

(() => {
    const {sql, args} = builder.in('User')
        .delete()
        .where({name: ['like', 'ne%ha'], surname: ['like', 'vl_d']})
        .resolve();

    assert.equal(sql, 'DELETE FROM User WHERE name LIKE $1 AND surname LIKE $2');
    assert.deepEqual(args, ['ne%ha', 'vl_d']);
})();
