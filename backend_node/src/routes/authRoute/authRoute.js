// Importing the required modules
const express = require("express");
const registerController = require("../../controllers/authController/registerController");
const loginController = require("../../controllers/authController/loginController");

// Creating a new router
const authRouter = express.Router();

// Setting up the POST route for user registration
// When a POST request is made to /register, the registerController handles it
authRouter.post("/register", registerController);

// Setting up the POST route for user login
// When a POST request is made to /login, the loginController handles it
authRouter.post("/login", loginController);

// Exporting the router so it can be used in other parts of the application
module.exports = authRouter;
