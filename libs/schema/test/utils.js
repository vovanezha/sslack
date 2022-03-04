const assert = require('assert');
const { findNonEqualParts } = require('../lib/utils');


(() => {
    const object1 = { a: 1, b: 2, c: 3 };
    const object2 = { a: 1, b: 2, c: 3 };

    assert.deepEqual(findNonEqualParts(object1, object2), []);
})();

(() => {
    const object1 = { a: 1, b: 2, c: 3 };
    const object2 = { a: 1, b: 3, c: 3 };

    assert.deepEqual(findNonEqualParts(object1, object2), [{ key: 'b', left: 2, right: 3 }]);
})();

(() => {
    const object1 = { a: 1, b: 2, c: 3 };
    const object2 = { a: 1, b: 3, c: false };

    assert.deepEqual(findNonEqualParts(object1, object2), [
        { key: 'b', left: 2, right: 3 },
        { key: 'c', left: 3, right: false }
    ]);
})();

(() => {
    const object1 = { a: 1, b: 2, c: 3 };
    const object2 = { a: 1, b: 2 };

    assert.deepEqual(findNonEqualParts(object1, object2), [{ key: 'c', left: 3, right: undefined }]);
})();
