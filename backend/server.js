// Importing required modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Loading environment variables from a .env file
require("dotenv").config();

// Creating an instance of the Express application
const app = express();
const port = process.env.PORT || 5000;

// Middleware: Allowing Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware: Parsing incoming JSON requests
app.use(express.json());

// Connecting to MongoDB
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongoDB databse successfully!!");
  })
  .catch((err) => {
    console.log(err);
  });

// Routing: Using the usersRouter for handling requests to the root path
const usersRouter = require("./routes/users");
app.use("/", usersRouter);

// Starting the server and listening on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
