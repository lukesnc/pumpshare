const express = require("express");
const router = express.Router();
const controller = require("../controllers/exercisesController");

// GET all exercises
router.get("/", controller.getAllExercises);

// GET one exercise
router.get('/:id', controller.getExercise);

// POST one exercise
router.post("/", controller.createExercise);

router.post("/log", controller.logExercise);

// DELETE one exercise
router.delete('/:id', controller.deleteExercise);

// UPDATE one exercise
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE one exercise" });
});

module.exports = router;
