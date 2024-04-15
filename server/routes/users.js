const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");
const checkUsername = require("../middleware/validator");

// GET all users
router.get("/", (req, res) => {
  res.json({ mssg: "GET all users" });
});

// GET one user
router.get("/:username", checkUsername, controller.getProfile);

router.get("/:username/followers", checkUsername, controller.getFollowers);

router.get("/:username/following", checkUsername, controller.getFollowing);

router.get("/find/:id", controller.getUserById);

router.post("/login", controller.loginUser);

router.post("/register", controller.registerUser);

module.exports = router;
