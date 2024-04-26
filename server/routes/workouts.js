const express = require("express");
const router = express.Router();
const controller = require("../controllers/workoutsController");

// GET all workouts
router.get("/", controller.getAllWorkouts);

router.post("/create", controller.createWorkout);

module.exports = router;
