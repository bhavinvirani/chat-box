const HTTP_STATUS = require('../constants/httpStatusCode');
const userService = require('../services/userService');

const getAllUsers = async (req, res, next) => {
    const payload = {
        search: req.query.search,
    };
    try {
        const response = await userService.allUsers(payload);
        res.status(HTTP_STATUS.OK).json({
            status: true,
            message: 'All Users',
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllUsers };
