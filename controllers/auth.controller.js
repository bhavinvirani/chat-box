const Errors = require('../errors');
const authService = require('../services/authService');
const HTTP_STATUS = require('../constants/httpStatusCode');
const isDevelopment = process.env.NODE_ENV === 'development';

const registerUser = async (req, res, next) => {
    try {
        const { token } = await authService.signUp(req.body);
        res.cookie(process.env.AUTH_COOKIE_NAME, token, {
            httpOnly: true,
            sameSite: isDevelopment ? true : 'none',
            secure: !isDevelopment,
        });
        res.status(HTTP_STATUS.CREATED).json({
            status: true,
            message: 'New User created successfully',
            data: { token },
        });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { token, user } = await authService.login(req.body);
        console.log(user);
        res.cookie(process.env.AUTH_COOKIE_NAME, token, {
            httpOnly: true,
            sameSite: isDevelopment ? true : 'none',
            secure: !isDevelopment,
        });
        res.status(HTTP_STATUS.OK).json({
            status: true,
            message: 'User logged in successfully',
            data: { token },
        });
    } catch (error) {
        next(error);
    }
};

const userLogout = async (req, res, next) => {
    try {
        res.cookie(process.env.AUTH_COOKIE_NAME, '', { maxAge: 1 });
        res.status(HTTP_STATUS.OK).json({
            status: true,
            message: 'User logout successfully',
            data: [],
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser, loginUser, userLogout };
