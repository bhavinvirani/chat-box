const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();

router.get('/all', userController.getAllUsers);

module.exports = router;