const express = require('express');
const authController = require('../Controllers/auth.controller');
const router = express()

router.post('/registerUser', authController.registerUser);

router.post('/loginUser',authController.LoginUser);


module.exports = router