const ErrorResponse = require('../utils/ErrorResponse')


const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message

    // mongoose cast error
    if (err.name === 'castError') {
        const message = 'Resource Not Found'
        error = new ErrorResponse(message, 404)
    }

    // duplicate key error
    if (err.code === 11000) {
        const message = ' Duplicate Field value entered '
        new ErrorResponse(message, 400)
    }
    // mognoose validation

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Server Error",
        });
    }
}

module.exports = errorHandler;