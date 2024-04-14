const User = require("../models/user");
const { posts } = require("./postsController"); // This to be removed - for testing only
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/*** JSON WebToken ***/
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "10d", // 10 days
  });
};

exports.registerUser = async (req, res) => {
  // Get the email and password from the request body (json object)
  const { firstName, lastName, username, email, password } = req.body;

  // Check if the email and password are not empty
  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if the username exists
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    return res.status(400).json({ error: "Username is taken" });
  }

  // Check if the email exists
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ error: "Email is taken" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const user = new User({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
  });
  user
    .save()
    .then(() => {
      // Create a token
      const token = createToken(user._id);
      // Send the response
      res.status(200).json({ user, username, email, token });
    }) // add a toast alert
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  User.findOne({ email: email.toLowerCase() })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      } else {
        return user
          .comparePassword(password)
          .then((match) => {
            if (!match) {
              return res.status(400).json({ error: "Invalid credentials" });
            } else {
              // Create a token
              const token = createToken(user._id);
              // Send the response (sent as 'data' in the client side)
              res.status(200).json({ user, email, token });
            }
          })
          .catch((error) => res.status(500).json({ error: error.message }));
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

// This function has errors, but connection has been established
exports.getProfile = (req, res) => {
  const username = req.params.username;

  User.findOne({ username })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
