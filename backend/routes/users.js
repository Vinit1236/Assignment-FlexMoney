const router = require("express").Router();
let User = require("../models/user.model");

// Route to get all users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route to add a new user
router.route("/").post((req, res) => {
  // Extracting user data from the request body
  const name = req.body.name;
  const age = req.body.age;
  const gender = req.body.gender;
  const contact = req.body.contact;
  const fee = req.body.fee;
  const slot = req.body.slot;

  // Creating a new User instance
  const newUser = new User({
    name,
    age,
    gender,
    contact,
    fee,
    slot,
  });

  // Saving the new user to the database
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
