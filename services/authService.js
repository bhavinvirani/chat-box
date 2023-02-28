const Errors = require('../errors');
const User = require('../models/user.model');

class AuthService {
    async signUp(payload) {
        try {
            const userExist = await User.findOne({ email: payload.email });
            if (userExist) {
                throw Errors.invalidRequestError('User already exist');
            }
            const user = await User.create(payload);
            if (user) {
                const token = await user.getJwtToken();
                return { token };
            }
        } catch (error) {
            throw Errors.serverError(error.message);
        }
    }
    async login(payload) {
        try {
            const user = await User.findOne({ email: payload.email }).select("+password");
            if(!user) {
                throw Errors.notFoundError('User not found with this email');
            }
            const isMatch = await user.matchPassword(payload.password);
            if(!isMatch) {
                throw Errors.invalidRequestError('Invalid credentials');
            }
            if(user && isMatch) {
                const token = await user.getJwtToken();
                return { token, user };
            }
        } catch (error) {
            
        }
    }
}
module.exports = new AuthService();
