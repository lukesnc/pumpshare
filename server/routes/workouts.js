const express = require("express");
const router = express.Router();
const controller = require("../controllers/workoutsController");

// GET all workouts
router.get("/", controller.getAllWorkouts);

module.exports = router;
