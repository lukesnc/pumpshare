const express = require("express");
const router = express.Router();
const controller = require("../controllers/exercisesController");

// GET all exercises
router.get("/", controller.getAllExercises);

router.get("/attributes", controller.getAllAttributes);

router.get("/attributes/:id", controller.getAttributesByExercise);

router.get("/populate-attributes", controller.getAllExercisesWithAttributes);

// GET one exercise
router.get("/:id", controller.getExercise);

// POST one exercise
router.post("/", controller.createExercise);

router.post("/log", controller.logExercise);

router.post("/attributes", controller.createNewAttribute);

// DELETE one exercise
router.delete("/:id", controller.deleteExercise);

// UPDATE one exercise
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE one exercise" });
});

module.exports = router;
