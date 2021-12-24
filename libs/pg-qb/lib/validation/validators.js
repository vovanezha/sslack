const ValidationError = require("./error");

const where = (conditions) => {
    if (typeof conditions !== 'object' || conditions === null) {
        throw new ValidationError('Conditions in WHERE clause should be and object', conditions)
    }
}

const orderBy = (columns) => {
    if (!columns || !Array.isArray(columns)) {
        throw new ValidationError('Columns in ORDER_BY clause should be an array', columns)
    }
}

const insertFields = (fields) => {
    if (Array.isArray(fields)) {
        const columns = Object.keys(fields[0]);

        const hasDifferentColumns = fields.some(field =>
            !columns.every(col => col in field) ||
            columns.length !== Object.keys(field).length
        );

        if (hasDifferentColumns) {
            throw new ValidationError('Fields in INSERT clause should have the same keys in each objects', fields)
        }
    }
}

const updateFields = (fields) => {
    if (typeof fields !== 'object' || fields === null) {
        throw new ValidationError('Fields in UPDATE clause should be and object', fields)
    }
}

module.exports = {
    where,
    orderBy,
    insertFields,
    updateFields,
}
