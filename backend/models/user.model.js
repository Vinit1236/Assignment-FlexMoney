// Importing Mongoose library
const mongoose = require("mongoose");

// Creating a Mongoose Schema
const Schema = mongoose.Schema;

// Defining the user schema with fields
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "minimum length should be 3"],
      trim: true,
    },
    age: {
      type: Number,
      minlength: [18, "minimum age should be 18"],
      maxlength: [65, "maximum age should be 65"],
    },
    gender: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      minlength: [10, "Mobile number should have length of 10 only"],
      maxlength: [10, "Mobile number should have length of 10 only"],
      required: true,
      unique: true,
    },
    fee: {
      type: Number,
      required: true,
      default: 500,
    },
    slot: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Creating a Mongoose model named "User" using the user schema
const User = mongoose.model("User", userSchema);

// Exporting the User model for use in other files
module.exports = User;
