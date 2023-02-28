const express = require('express');
const { chatController } = require('../controllers');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.use(verifyToken);
router.post('/create', chatController.accessChat);

module.exports = router;