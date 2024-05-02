const User = require("../models/user");
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
  const { firstName, lastName, username, email, password } = req.body;

  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    return res.status(400).json({ error: "Username is taken" });
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ error: "Email is taken" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

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
      const token = createToken(user._id);
      res.status(200).json({ user, username, email, token });
    })
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

exports.getFollowers = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username }).populate("followers");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followers = user.followers;
    res.status(200).json({ usersList: followers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFollowing = (req, res) => {
  const username = req.params.username;

  User.findOne({ username })
    .populate("following")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const following = user.following;
      User.find({ _id: { $in: following } })
        .then((followingUsers) => {
          res.status(200).json({ usersList: followingUsers });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: "Error fetching following users" });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    });
};

exports.getMe = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const data = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const user = await User.findById({ _id: data._id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  console.log("req.body:", req.body);
  const { firstName, lastName, email, password, id } = req.body;
  const userId = id;
  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(404)
      .json({ message: "User not found while trying to update user data" });
  }

  const updateData = {
    $set: {
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
    },
  };

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    updateData.$set.password = hashedPassword;
  }

  const filter = { _id: user._id }; // Update users matching this filter

  User.findOneAndUpdate(filter, updateData, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        console.log("User not found");
      }
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  console.log("DELETE USER");
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User deleted successfully");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    console.log("Server error");
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyPassword = async (req, res) => {
  const { password, userId } = req.body;
  const token = req.header("Authorization").replace("Bearer ", "");
  const data = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const user = await User.findById(data._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    res.status(200).json({ message: "Password verified" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.follow = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const data = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Data:", data);
  const userId = data._id;
  const username = req.params.username;

  try {
    const user = await User.findOne({ _id: userId });
    const userToFollow = await User.findOne({ username });
    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }
    const following = user.following;
    const followers = userToFollow.followers;

    if (following.includes(userToFollow._id)) {
      return res.status(400).json({ message: "Already following user" });
    }

    following.push(userToFollow._id);
    followers.push(user._id);

    const filter = { _id: user._id };
    const updateData = {
      $set: {
        following,
      },
    };

    const filter2 = { _id: userToFollow._id };
    const updateData2 = {
      $set: {
        followers,
      },
    };

    Promise.all([
      User.findOneAndUpdate(filter, updateData, { new: true }),
      User.findOneAndUpdate(filter2, updateData2, { new: true }),
    ])
      .then(([updatedUser, updatedUser2]) => {
        if (updatedUser && updatedUser2) {
          res.status(200).json({ updatedUser, updatedUser2 });
        } else {
          console.log("User not found");
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
