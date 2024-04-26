const Workout = require("../models/workouts");
const Exercises = require("../models/exercise");

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

exports.logWorkout = async (req,res) =>{
  const date = req.body.date;
  const workout = req.body.workout;
  const about = req.body.about;
  const id = workout._id;

  if (!date || !workout || !about) {
    return res.status(400).json({ error: "All fields are required" });
  }

  
  console.log("log workout controller: " ,workout);

  Workout.findOneAndUpdate(
    { _id: id },
    {
      date:date,
      about:about
    },
    { new: true }
  )
  .populate('exercises')
    .then((workout) => {
      res.status(200).json({ workout });
      //res.redirect(`/:${exercise._id}`);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
  
}

exports.deleteWorkout = async (req, res) => {
  const id = req.params;
  
  if (!id) {
    return res.status(400).json({ error: "Invalid Exercise" });
  }

  Workout.deleteOne({ _id: id.id })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      console.log(result);
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
