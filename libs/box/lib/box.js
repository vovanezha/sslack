const path = require('path');
const vm = require('vm');
const fsp = require('fs').promises;

const EMPTY_CONTEXT = vm.createContext({});

const COMMON_CONTEXT = vm.createContext(
    Object.freeze({
        Buffer,
        console,
        setTimeout,
        clearTimeout,
        setInterval,
        clearInterval,
    })
)

const createContext = (context = EMPTY_CONTEXT) => {
    return vm.createContext(context);
}

const execute = async (scriptPath, options = {}) => {
    const src = await fsp.readFile(scriptPath, 'utf-8');

    if (src === '') {
        throw new SyntaxError(`File ${scriptPath} is empty`)
    }

    const filename = options.filename || path.basename(scriptPath, '.js');
    const context = options.context || createContext();

    const script = new vm.Script(src);
    const exports = script.runInContext(context);

    return {filename, exports};
}

module.exports = {
    createContext,
    execute,
    COMMON_CONTEXT,
};
