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
