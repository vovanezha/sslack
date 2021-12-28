const mock = require('mock');
const {Pool} = require('pg');
const assert = require('assert');

mock(Pool, class {
    async query(sql) {
        switch (sql) {
            case 'SELECT * FROM User':
                return Promise.resolve({
                    rows: [
                        {id: 1, name: 'john'},
                        {id: 2, name: 'bike'},
                    ]
                })
            case 'INSERT INTO User (name) VALUES ($1)':
                return Promise.resolve({
                    rows: [
                        {id: 1, name: 'alex'},
                    ]
                })
            default:
                return Promise.resolve({rows: []})
        }
    }
});

const Database = require('../lib/database');

(async () => {
    const qb = new Database();

    const result = await qb.in('User')
        .select()
        .resolve();

    assert.deepEqual(result, [
        {id: 1, name: 'john'},
        {id: 2, name: 'bike'},
    ])
})();

(async () => {
    const qb = new Database();

    const result = await qb.in('User')
        .insert({name: 'alex'})
        .resolve();

    assert.deepEqual(result, [
        {id: 1, name: 'alex'},
    ])
})();
