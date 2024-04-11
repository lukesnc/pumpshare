const User = require("../models/user");
const { isValidObjectId } = require("mongoose");

async function checkUsername(req, res, next) {
  const username = req.params.username; // Get the username from request parameters
  try {
    // Query the database to find the user with the given username
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404);
      throw new Error(`Profile for ${username} does not exist`);
    }

    // Obtain the user ID from the user object
    const userId = user._id;

    // Perform validation on the user ID
    if (!isValidObjectId(userId)) {
      res.status(404);
      throw new Error(`Invalid user @${username}`);
    }

    // Call next middleware if everything is fine
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = checkUsername;
