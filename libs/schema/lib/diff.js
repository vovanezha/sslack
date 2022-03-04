const { findNonEqualParts, swapIfNeed } = require("./utils");

module.exports = function diffSchemas(schemas1, schemas2) {
    const resultSchemas = [];

    [schemas1, schemas2] = swapIfNeed(schemas1, schemas2);

    schemas1.forEach((item1, index) => {
        const item2 = schemas2[index];

        let keys1 = Object.keys(item1.fields);
        let keys2 = Object.keys(item2.fields);
        [keys1, keys2] = swapIfNeed(keys1, keys2);

        keys1.forEach(key1 => {
            const field1 = item1.fields[key1];
            const field2 = item2.fields[key1];

            const nonEqualParts = findNonEqualParts(field1, field2);
            if (nonEqualParts.length > 0) {
                console.dir({ nonEqualParts }, { depth: null })
                // console.dir({ item1, item2 }, { depth: null })
            }
        });
    });
}
