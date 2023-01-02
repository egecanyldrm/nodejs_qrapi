const express = require('express');
const router = express.Router();

//Controller
const accountController = require('../controllers/account')

//JsonWeb Token Middleware
const isLogin = require('../middleware/isLogin');

//Routes 

router.post('/login', accountController.postLogin);

router.post('/islogin', isLogin);

router.post('/forgot-password', accountController.forgotPassword)
router.post('/reset-password', accountController.resetPassword)


module.exports = router;
