const path = require('path');
const fs = require('fs');

const isObject = o => typeof o === 'object' && o !== null;

function isEqual(newObject, oldObject) {
    if (isObject(newObject) && isObject(oldObject)) {
        const newKeys = Object.keys(newObject);
        const oldKeys = Object.keys(oldObject);
        if (newKeys.length !== oldKeys.length) {
            return false;
        }

        return newKeys.every(key => {
            return isEqual(newObject[key], oldObject[key]);
        });
    }

    return newObject === oldObject;
}

async function cpHistory(schemasPath, historyPath) {
    await fs.promises.rm(historyPath, { force: true, recursive: true });
    await fs.promises.mkdir(historyPath);

    const files = (await fs.promises.readdir(schemasPath, { withFileTypes: true }))
        .filter(dirent => dirent.isFile());

    await Promise.all(
        files.map(dirent => fs.promises.copyFile(
            path.join(schemasPath, dirent.name),
            path.join(historyPath, dirent.name)
        )));

    await Promise.all(
        files.map(dirent => fs.promises.chmod(path.join(historyPath, dirent.name), '0444'))
    )
}

async function getOrCreateHistory(schemasPath) {
    const historyPath = path.join(schemasPath, './history');
    const exists = await fs.existsSync(historyPath);

    if (!exists) {
        await fs.promises.mkdir(historyPath);
    }

    return [exists, historyPath];
}


module.exports = { cpHistory, getOrCreateHistory, isEqual }
