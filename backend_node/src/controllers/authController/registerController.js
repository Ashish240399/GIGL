// Importing required modules
const connection = require("../../database/db");
const User = require("../../models/userModel/userModel");
const bcrypt = require("bcrypt");

// Defining the register controller
const registerController = async (req, res) => {
  try {
    // Extracting username, email and password from the request body
    const { username, email, password } = req.body;

    // Querying the database for a user with the provided email
    connection.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      (error, results) => {
        // If there's an error with the query, return a 500 status code with an error message
        if (error) {
          return res.status(500).json({ message: "Internal server error" });
        }

        // If a user with the provided email is found, return a 400 status code with an error message
        if (results.length > 0) {
          return res.status(400).json({ message: "User already exists" });
        }
        // If a user with the provided email is not found
        else {
          // Hash the provided password
          const hashPassword = bcrypt.hashSync(password, 13);

          // Create a new user with the provided username, hashed password and email
          const user = new User(username, hashPassword, email);

          // Insert the new user into the database
          connection.query("INSERT INTO user SET ?", user, (error, results) => {
            // If there's an error with the query, return a 500 status code with an error message
            if (error) {
              return res.status(500).json({ message: "Internal server error" });
            }

            // If the user is created successfully, return a 200 status code with a success message
            return res
              .status(200)
              .json({ message: "User created successfully" });
          });
        }
      }
    );
  } catch (error) {
    // If there's an error with the registration process, return a 500 status code with an error message
    return res.status(500).json({ message: error });
  }
};

// Exporting the register controller
module.exports = registerController;
