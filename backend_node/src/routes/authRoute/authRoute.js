const express = require('express');
const registerController = require('../../controllers/authController/registerController');
const loginController = require('../../controllers/authController/loginController');

const authRouter = express.Router();

authRouter.post("/register", registerController)
authRouter.post("/login", loginController)

module.exports = authRouter;