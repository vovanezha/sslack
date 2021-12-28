const assert = require('assert');

const test = (callback) => {
    callback();

    require('../lib/mock').clearModuleCache();
}


test(() => {
    const mock = require('../lib/mock');
    const {COLORS} = require('./__fixtures__/c');

    const original = COLORS;

    mock(COLORS, ['red', 'green', 'blue']);

    const {COLORS: mocked} = require('./__fixtures__/c');

    assert.notDeepEqual(original, mocked);
});

test(() => {
    const mock = require('../lib/mock');
    const Entity = require('./__fixtures__/b');

    const original = new Entity();

    mock(Entity, class {
        constructor() {
            this.entity = 'mocked-entity';
        }

        update() {
            this.entity = 'updated-mocked-entity';
        }
    });

    const MockedEntity = require('./__fixtures__/b');

    const mocked = new MockedEntity();

    assert.notDeepEqual(original.entity, mocked.entity);

    original.update();
    mocked.update()
    assert.notDeepEqual(original.entity, mocked.entity);
});

test(() => {
    const mock = require('../lib/mock');
    const MyEntity = require('./__fixtures__/a');

    const original = new MyEntity();

    mock(MyEntity, class {
        constructor() {
            this.entity = 'mocked-entity';
        }

        get type() {
            return 'my-mocked-entity'
        }
    });

    const MyMockedEntity = require('./__fixtures__/a');

    const mocked = new MyMockedEntity();

    assert.notDeepEqual(original.entity, mocked.entity);
    assert.notDeepEqual(original.type, mocked.type);
})

test(() => {
    const mock = require('../lib/mock');
    const {COLORS} = require('./__fixtures__/c');

    const original = COLORS;

    mock(COLORS, ['black', 'white']);

    const MyEntity = require('./__fixtures__/a');

    const entity = new MyEntity();

    assert.notDeepEqual(entity.colors, original);
    assert.deepEqual(entity.colors, ['black', 'white']);
})

test(() => {
    const mock = require('../lib/mock');
    const {MAX_TIMEOUT} = require('./__fixtures__/c');

    const original = MAX_TIMEOUT;

    mock(MAX_TIMEOUT, 8844);

    const MyEntity = require('./__fixtures__/a');

    const entity = new MyEntity();

    assert.notDeepEqual(entity.timeout, original);
    assert.deepEqual(entity.timeout, 8844);
})

test(() => {
    const mock = require('../lib/mock');
    const {IS_ALIVE} = require('./__fixtures__/c');

    const original = IS_ALIVE;

    mock(IS_ALIVE, 'no');

    const MyEntity = require('./__fixtures__/a');

    const entity = new MyEntity();

    assert.notDeepEqual(entity.isAlive, original);
    assert.deepEqual(entity.isAlive, 'no');
})

test(() => {
    const mock = require('../lib/mock');
    const {APPLICATION_NAME} = require('./__fixtures__/c');

    const original = APPLICATION_NAME;

    mock(APPLICATION_NAME, 'super-app-name-yeah');

    const MyEntity = require('./__fixtures__/a');

    const entity = new MyEntity();

    assert.notDeepEqual(entity.appName, original);
    assert.deepEqual(entity.appName, 'super-app-name-yeah');
})

test(() => {
    const mock = require('../lib/mock');
    const {STYLES} = require('./__fixtures__/c');

    const original = STYLES;

    mock(STYLES, {backgroundColor: 'red', color: 'white'});

    const MyEntity = require('./__fixtures__/a');

    const entity = new MyEntity();

    assert.notDeepEqual(entity.styles, original);
    assert.deepEqual(entity.styles, {backgroundColor: 'red', color: 'white'});
})

test(() => {
    const mock = require('../lib/mock');
    const {User} = require('./__fixtures__/c');

    const original = new User();

    mock(User, class extends User {
        name = 'Mocked John'
    });

    const MyEntity = require('./__fixtures__/a');

    const entity = new MyEntity();

    assert.notDeepEqual(entity.user.name, original.name);
    assert.equal(entity.user.name, 'Mocked John');
    assert.equal(entity.user.id, original.id);
    assert.equal(entity.user.bio, original.bio);
})
