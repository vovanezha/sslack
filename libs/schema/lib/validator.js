const typeCheckerMapping = {
    boolean: input => input === true || input === false,
    datetime: input => input && !isNaN(new Date(input).getTime()),
    integer: input => typeof input === 'number',
    char: input => typeof input === 'string',
}

const composeValidators = (...fns) => (...args) => {
    const errors = fns.reduce((acc, fn) => {
        const err = fn(...args);
        if (err) return acc.concat(err);
        return acc;
    }, []);

    return errors.length > 0 ? errors : null;
}

const validateType = (checker, name) => (input, field) => {
    if (field.nullable) {
        if (input === null || checker(input)) return null;
        return {msg: `Only ${name} or null are allowed`, input};
    }

    if (checker(input)) return null;
    return {msg: `Only ${name} is allowed`, input};
}

const validatorByType = {
    boolean: composeValidators(validateType(typeCheckerMapping.boolean, 'boolean')),
    datetime: composeValidators(validateType(typeCheckerMapping.datetime, 'date')),
    integer: composeValidators(
        validateType(typeCheckerMapping.integer, 'integer'),
        (input, field) => {
            if (Reflect.has(field, 'min') && input < field.min) {
                return {msg: `Only value more than ${field.min} is allowed`, input};
            }
            if (Reflect.has(field, 'max') && input > field.max) {
                return {msg: `Only value less than ${field.max} is allowed`, input};
            }
        }
    ),
    char: composeValidators(
        validateType(typeCheckerMapping.char, 'string'),
        (input, field) => {
            if (Reflect.has(field, 'min') && input.length < field.min) {
                return {msg: `Only string with length more than ${field.min} is allowed`, input};
            }
            if (Reflect.has(field, 'max') && input.length > field.max) {
                return {msg: `Only string with length less than ${field.max} is allowed`, input};
            }
        }
    ),
}

module.exports = {validatorByType}
