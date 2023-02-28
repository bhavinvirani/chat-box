const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
            trim: true,
            maxLength: [30, 'Your name cannot exceed 30 characters'],
        },
        username: {
            type: String,
            required: [true, 'Please enter your username'],
            trim: true,
            unique: true,
            minlength: [2, 'Your username must be at least 3 characters'],
            maxLength: [30, 'Your username cannot exceed 30 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            trim: true,
            unique: true,
            match: [
                /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
                'Please enter a valid email address',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            minlength: [6, 'Your password must be at least 6 characters'],
            maxLength: [30, 'Your password cannot exceed 30 characters'],
            select: false,
        },
        profile_picture: {
            type: String,
            default:
                'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
        },
    },
    { timestamps: true },
);

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(
        process.env.NODE_ENV === 'production' ? 10 : 1,
    );
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
// Sign JWT and return
userSchema.methods.getJwtToken = function () {
    return jwt.sign(
        { id: this._id, name: this.name, email: this.email },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRATION_TIME,
        },
    );
};
// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
