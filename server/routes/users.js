const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");
const checkUsername = require("../middleware/validator");

router.get("/me", controller.getMe);

router.get("/:username", checkUsername, controller.getProfile);

router.get("/:username/followers", checkUsername, controller.getFollowers);

router.get("/:username/following", checkUsername, controller.getFollowing);

router.get("/find/:id", controller.getUserById);

router.post("/login", controller.loginUser);

router.post("/register", controller.registerUser);

router.post("/settings", controller.updateUser);

router.delete("/delete", controller.deleteUser);

// NOTE: Authorization middleware needed for routes where only logged-in users should have access to

module.exports = router;
