const {create, update} = require('./c');

class Entity {
    constructor() {
        this.entity = create();
    }

    update() {
        this.entity = update();
    }
}

module.exports = Entity;
