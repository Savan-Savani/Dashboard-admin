const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
require('dotenv').config()
const mongoose = require("mongoose")






const auth = require("../controller/loginController")





router.post('/login', auth.loginController)
router.post('/signup', auth.signUpController)
router.post('/forget', auth.forgetController)
router.post('/reset', auth.resetController)




module.exports = router;