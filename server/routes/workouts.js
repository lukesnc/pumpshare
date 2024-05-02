const express = require("express");
const router = express.Router();
const controller = require("../controllers/workoutsController");

router.get("/", controller.getAllWorkouts);

router.get("/:id", controller.getWorkout);

router.get("/template/:id", controller.getLogObjectTemplate);

router.post("/create", controller.createWorkout);

router.post("/log/:id", controller.logWorkout);

router.delete("/:id", controller.deleteWorkout);

module.exports = router;
