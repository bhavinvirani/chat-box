const express = require('express');
const { userController } = require('../controllers');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.get('/all', [verifyToken], userController.getAllUsers);

module.exports = router;
