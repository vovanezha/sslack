const Module = require('module');

const originalRequire = Module.prototype.require;

const storage = new Map();

Module.prototype.require = function(id) {
    const resolvedModule = originalRequire.call(this, id);

    if (storage.has(resolvedModule)) { // default export
        return storage.get(resolvedModule)
    } else { // named export
        const entry = Object.entries(resolvedModule).find(([_, val]) => storage.has(val));
        if (entry) {
            const [key, original] = entry;
            const mocked = storage.get(original);

            return Object.assign({}, resolvedModule, {[key]: mocked});
        }
    }

    return resolvedModule;
};

const mock = (original, mocked) => {
    storage.set(original, mocked);
}

mock.clear = () => storage.clear();

mock.clearModuleCache = () => {
    Object.keys(Module._cache).forEach(key => {
        delete Module._cache[key];
    })
}

module.exports = mock;
