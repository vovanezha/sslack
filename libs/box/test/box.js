const path = require('path');
const assert = require('assert');
const box = require('../lib/box');

const buildFilePath = name => path.join(__dirname, `./__fixtures__/${name}`);

(async () => {
    const {filename, exports} = await box.execute(buildFilePath('object.js'));

    assert.deepEqual(exports, {name: 'string', password: 'string', email: 'email'})
    assert.equal(filename, 'object')
})();

(async () => {
    assert.rejects(async () => box.execute(buildFilePath('empty.js')), {name: 'SyntaxError'});
})();
