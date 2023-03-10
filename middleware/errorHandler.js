const errorHandler = (err, req, res, next) => {
    console.error('Stack: ', err.stack);
    res.status(err.statusCode || 500).json({
        status: false,
        message: err.message || 'internal server error',
    });
};

module.exports = errorHandler