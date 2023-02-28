const Errors = require('../errors');
const User = require('../models/user.model');

class UserService {
    async allUsers(payload) {
        const keyWord = payload.search
            ? {
                  $or: [
                      { name: { $regex: payload.search, $options: 'i' } },
                      { username: { $regex: payload.search, $options: 'i' } },
                  ],
              }
            : {};
        try {
            const users = await User.find(keyWord);
            if(!users) {
                throw Errors.notFoundError('No users found');
            }
            return users;
        } catch (error) {
            throw Errors.serverError(error.message);
        }
    }
}
module.exports = new UserService();
