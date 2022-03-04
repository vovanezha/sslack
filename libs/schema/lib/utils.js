const isObject = o => typeof o === 'object' && o !== null;

function swapIfNeed(arr1, arr2) {
    if (arr2.length > arr1.length) {
        return [arr2, arr1];
    }

    return [arr1, arr2];
}

function findNonEqualParts(object1, object2) {
    let keys1 = Object.keys(object1);
    let keys2 = Object.keys(object2);

    [keys1, keys2] = swapIfNeed(keys1, keys2);

    const result = [];
    for (const key of keys1) {
        const value1 = object1[key];
        const value2 = object2[key];

        if (isObject(value1) && isObject(value2)) {
            const parts = findNonEqualParts(value1, value2);
            result.push();
        } else if (value1 !== value2) {
            result.push({ key, left: value1, right: value2 })
        };
    }

    return result;
}

module.exports = { swapIfNeed, findNonEqualParts }
