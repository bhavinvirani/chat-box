const jwt = require('jsonwebtoken');
const Errors = require('../errors');

const verifyToken = (req, res, next) => {
    const { jwtToken } = req.cookies;
    if (!jwtToken) {
        throw Errors.UnauthorizedError('Token missing');
    }
    try {
        jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                throw Errors.UnauthorizedError('Invalid Token');
            } else {
                res.locals.userId = decoded.id;
                res.locals.name = decoded.name;
                res.locals.email = decoded.email;
                res.locals.username = decoded.username;
                next();
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = verifyToken;
