const InputError = require('../exceptions/InputError');

function errorHandler(err, req, res, next) {
    if (err instanceof InputError) {
        return res.status(400).json({ status: 'fail', message: err.message });
    }

    res.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;