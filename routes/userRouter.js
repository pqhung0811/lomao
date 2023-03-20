const express = require('express');
const router = express.Router();
const authController = require('../controller/userController');

// Đăng ký
router.post('/register', authController.register);

// Đăng nhập
router.post('/login', authController.login);

module.exports = router;