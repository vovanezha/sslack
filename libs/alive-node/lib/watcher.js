const fs = require('fs');
const path = require('path');
const {debounce} = require('./utils')

const defaultOptions = {
    ignored: ['node_modules', 'package.json', '-lock.yaml'],
};

class Watcher {
    mapping = {
        'rename': (filepath, callback) => {
            fs.promises.lstat(filepath)
                .then(() => this.watch(filepath, callback)) // file is created
                .catch(error => null) // file is removed
                .finally(() => callback(filepath));
        },
        'change': (filePath, callback) => {
            callback(filePath);
        }
    }

    constructor({ignored} = defaultOptions) {
        this.ignored = ignored;
    }

    watch(target, callback) {
        this.#watchDirectories(target, (event, file) => {
            const filepath = path.join(target, file);

            if (this.ignored.some(reg => filepath.match(reg))) return;

            this.mapping[event](filepath, callback)
        })
    }

    #watchDirectories(target, callback) {
        fs.promises.lstat(target)
            .then(stat => {
                if (stat.isDirectory()) fs.watch(target, {recursive: true}, debounce(callback, 300));
            })
            .catch(error => {throw error});
    }
}

module.exports = Watcher;
