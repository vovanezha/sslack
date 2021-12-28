class ValidationError extends Error {
    constructor(message, value) {
        let msg = `${message}`
        if (value) msg += `, but passed ${JSON.stringify(value)}`;

        super(msg);
        this.name = 'ValidationError';
    }
}

module.exports = ValidationError;
