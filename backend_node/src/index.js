// Importing the required modules
const express = require("express");
const cors = require("cors");
const connection = require("./database/db");
const authRouter = require("./routes/authRoute/authRoute");

// Creating a new Express application
const app = express();

// Using the built-in JSON middleware to parse JSON request bodies
app.use(express.json());

// Configuring CORS options
const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

// Using the CORS middleware with the configured options
app.use(cors(corsOptions));

// Setting up a middleware to set CORS headers
app.use(function (req, res, next) {
  // Allowing all origins
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Allowing specific request methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Allowing specific request headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Passing control to the next middleware
  next();
});

// Using the authRouter for routes starting with /auth
app.use("/auth", authRouter);

// Setting the port to listen on
const PORT = process.env.PORT || 8090;

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
