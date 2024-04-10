// Importing required modules
const connection = require("../../database/db");
const bcrypt = require("bcrypt");

// Defining the login controller
const loginController = async (req, res) => {
  try {
    // Extracting email and password from the request body
    const { email, password } = req.body;

    // Querying the database for a user with the provided email
    connection.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      (error, results) => {
        // If there's an error with the query, return a 500 status code with an error message
        if (error) {
          return res.status(500).json({ message: "Internal server error" });
        }

        // If a user with the provided email is found
        if (results.length > 0) {
          // Get the first user from the results
          const user = results[0];

          // Replace the bcrypt version in the hashed password from 2y to 2b
          const hash = user.password.replace("$2y$", "$2b$");

          // Compare the provided password with the hashed password
          bcrypt.compare(password, hash).then(function (isMatch) {
            // If the passwords match, return a 200 status code with a success message
            if (isMatch) {
              return res.status(200).json({ message: "Login successful" });
            }
            // If the passwords don't match, return a 400 status code with an error message
            else {
              return res.status(400).json({ message: "Invalid credentials" });
            }
          });
        }
        // If a user with the provided email is not found, return a 400 status code with an error message
        else {
          return res.status(400).json({ message: "User does not exist" });
        }
      }
    );
  } catch (error) {
    // If there's an error with the login process, return a 500 status code with an error message
    return res.status(500).json({ message: error });
  }
};

// Exporting the login controller
module.exports = loginController;
