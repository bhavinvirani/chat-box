const Errors = require('.');

const endpointNotFound = (req, res) => {
    const err = new Errors(404, `Not Found - ${req.originalUrl}`);
    res.status(err.statusCode).json({
        status: false,
        message: err.message,
    });
};
module.exports = endpointNotFound;
