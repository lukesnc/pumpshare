const express = require("express");
const router = express.Router();
const controller = require("../controllers/exercisesController");

// GET
router.get("/", controller.getAllExercises);

router.get("/attributes", controller.getAllAttributes);

router.get("/attributes/:id", controller.getAttributesByExercise);

router.get("/populate-attributes", controller.getAllExercisesWithAttributes);

router.get("/:id", controller.getExercise);

router.get("/log-data", controller.getAllLogData);

router.get("/template/:id", controller.getLogObjectTemplate);

// POST
router.post("/", controller.createExercise);

router.post("/attributes", controller.createNewAttribute);

router.post("/log/:id", controller.logExercise);

// DELETE
router.delete("/:id", controller.deleteExercise);

// UPDATE
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE one exercise" });
});

module.exports = router;
