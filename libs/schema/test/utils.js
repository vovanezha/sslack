const assert = require('assert');
const { isEqual } = require('../lib/utils');

(() => {
    assert.equal(isEqual(1, 1), true);
    assert.equal(isEqual('1', '1'), true);
    assert.equal(isEqual(true, true), true);
    assert.equal(isEqual(false, false), true);
    assert.equal(isEqual({}, {}), true);

    assert.equal(isEqual(1), false);
    assert.equal(isEqual(1, undefined), false);
    assert.equal(isEqual(1, null), false);
    assert.equal(isEqual(1, 2), false);
    assert.equal(isEqual('1', '2'), false);
    assert.equal(isEqual(true, false), false);
    assert.equal(isEqual(false, true), false);
    assert.equal(isEqual({}, { a: 1 }), false);
})();

(() => {
    assert.equal(isEqual({ a: 1 }, { a: 1 }), true)
    assert.equal(isEqual({ a: '1' }, { a: '1' }), true)
    assert.equal(isEqual({ a: true }, { a: true }), true)
    assert.equal(isEqual({ a: { b: 1 } }, { a: { b: 1 } }), true)
    assert.equal(isEqual({ a: { b: '1' } }, { a: { b: '1' } }), true)
    assert.equal(isEqual({ a: { b: true } }, { a: { b: true } }), true)
    assert.equal(isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } }), true)
})();

(() => {
    assert.equal(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 }), true)
    assert.equal(isEqual({ b: 1, a: 2 }, { a: 2, b: 1 }), true)
    assert.equal(isEqual({ a: 1, b: { c: false } }, { a: 1, b: { c: false } }), true)
})();

(() => {
    assert.equal(isEqual({ a: 1, b: 2 }, { a: 2, b: 1 }), false)
    assert.equal(isEqual({ a: 1, b: '2' }, { a: 1, b: 2 }), false)
    assert.equal(isEqual({ a: 1, b: false }, { a: 1, b: 2 }), false)
    assert.equal(isEqual({ a: 1, b: {} }, { a: 1, b: 2 }), false)
})();
