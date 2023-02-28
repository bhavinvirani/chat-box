const express = require('express');
const { authController } = require('../controllers');
const validateJoi = require('../middleware/joi');
const { signupSchema, loginSchema } = require('../validation/schema/auth.schema');
const router = express.Router();

//* /api/auth
router.post(
    '/signup',
    [validateJoi(signupSchema)],
    authController.registerUser,
);
router.post(
    '/login',
    [validateJoi(loginSchema)],
    authController.loginUser,
);
router.get(
    '/logout',
    authController.userLogout,
);

module.exports = router;
