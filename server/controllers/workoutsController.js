const Workout = require("../models/workouts");

exports.getAllWorkouts = async (req, res) => {
  Workout.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching workouts" });
    });
};

exports.createWorkout = async (req, res) => {
  const { name, exercises } = req.body;

  if (!name || !exercises) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const workout = new Workout({ name, exercises });
  workout
    .save()
    .then(() => {
      res.status(200).json(workout);
      console.log("Workout Created: ", workout);
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};
