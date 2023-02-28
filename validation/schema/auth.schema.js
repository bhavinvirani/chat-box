const Joi = require('joi');
const signupSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().lowercase().email().required(),
    username: Joi.string().min(2).max(30).required(),
    password: Joi.string()
        .min(3)
        .max(30)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    confirm_password: Joi.ref('password'),
});
const loginSchema = Joi.object({
    email: Joi.string().lowercase().email(),
    password: Joi.string()
        .min(3)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
});

module.exports = {
    signupSchema,
    loginSchema,
};
