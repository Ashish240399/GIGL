// Importing the mysql2 module
const mysql = require("mysql2");

// Creating a connection to the MySQL database
const connection = mysql.createConnection({
  // The host where the MySQL server is located
  host: "localhost",
  // The MySQL user to authenticate as
  user: "root",
  // The password of the MySQL user
  password: "@Ashish7797",
  // The name of the database to use
  database: "gigl",
});

// Connecting to the MySQL server
connection.connect((err) => {
  // If there's an error with the connection, log the error and return
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }

  // If the connection is successful, log the thread ID of the connection
  console.log("Connected to MySQL as id " + connection.threadId);
});

// Exporting the connection so it can be used in other parts of the application
module.exports = connection;
