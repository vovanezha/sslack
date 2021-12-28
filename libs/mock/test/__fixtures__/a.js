const Entity = require('./b');
const {COLORS, MAX_TIMEOUT, IS_ALIVE, APPLICATION_NAME, STYLES, User} = require('./c');

class MyEntity extends Entity {
    constructor() {
        super();
    }

    get type() {
        return 'my-entity';
    }

    get colors() {
        return COLORS;
    }

    get timeout() {
        return MAX_TIMEOUT;
    }

    get isAlive() {
        return IS_ALIVE;
    }

    get appName() {
        return APPLICATION_NAME;
    }

    get styles () {
        return STYLES;
    }

    get user() {
        return new User();
    }
}

module.exports = MyEntity;
