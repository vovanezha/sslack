const COLORS = ['yellow', 'blue', 'green'];

const MAX_TIMEOUT = 3000;

const IS_ALIVE = true;

const APPLICATION_NAME = 'mock';

const STYLES = {display: 'flex', fontSize: 20};

class User {
    id = 1;
    name = 'John';
    bio = '23 y.o. designer from San Francisco';
}

const create = () => {
    return {key: 'value'};
}

const update = (obj) => {
    return Object.assign({}, obj, {key: 'random-value'});
}


module.exports = {
    COLORS,
    MAX_TIMEOUT,
    IS_ALIVE,
    APPLICATION_NAME,
    STYLES,
    User,
    create,
    update,
}
