const Workout = require("../models/workouts");
const Exercise = require("../models/exercise");
const Attribute = require("../models/attributes");
const LogData = require("../models/logData");

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

exports.getWorkout = async (req, res) => {
  const id = req.params;
  if (!id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  Workout.findById(id.id)
    .then((workout) => {
      res.status(200).json({ workout });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
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

exports.logWorkout = async (req, res) => {
  const { logObject } = req.body;
  const combinedDateString = `${logObject.date}T${logObject.time}:00Z`;
  const userTimezoneOffset = new Date().getTimezoneOffset();
  const dateObject = new Date(
    new Date(combinedDateString).getTime() + userTimezoneOffset * 60 * 1000
  );

  const newLogData = new LogData({
    name: logObject.name,
    workoutId: logObject.workoutId,
    type: logObject.type,
    date: dateObject,
    exercises: logObject.exercises,
    notes: logObject.notes,
  });
  newLogData
    .save()
    .then((data) => {
      res.status(200).json(data);
      console.log("Workout Logged: ", newLogData);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

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

exports.getLogObjectTemplate = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // let template = {};
  // let exercises = {};

  // PLEASE KEEP THIS - ID LIKE TO LEARN WHY THIS DOESN'T WORK - FRED SCHUCK

  // Workout.findById(id)
  //   .then((workout) => {
  //     const exercisePromises = workout.exercises.map((exerciseId) =>
  //       Exercise.findById(exerciseId).then((exercise) => {
  //         const attributePromises = exercise.attr.map((attributeId) =>
  //           Attribute.findById(attributeId).then((attribute) => ({
  //             attributeId: attribute._id,
  //             short: attribute.short,
  //             amount: "",
  //           }))
  //         );
  //         return Promise.all(attributePromises)
  //           .then((attributes) => {
  //             exercises = {
  //               name: exercise.name,
  //               type: "exercise",
  //               attributes,
  //             };
  //             console.log("exercises: ", exercises);
  //           })
  //           .catch((error) => {
  //             res.status(500).json({ error: error.message });
  //           });
  //       })
  //     );
  //     return Promise.all(exercisePromises)
  //       .then((exercises) => {
  //         template = {
  //           name: workout.name,
  //           type: "workout",
  //           exercises,
  //         };
  //         console.log(template);
  //         // res.status(200).json(template);
  //       })
  //       .catch((error) => {
  //         res.status(500).json({ error: error.message });
  //       });
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ error: error.message });
  //   });
  Workout.findById(id)
    .then(async (workout) => {
      const exercises = await Promise.all(
        workout.exercises.map(async (exerciseId) => {
          const exercise = await Exercise.findById(exerciseId);
          const attributes = await Promise.all(
            exercise.attr.map(async (attributeId) => {
              const attribute = await Attribute.findById(attributeId);
              return {
                attributeId: attribute._id,
                short: attribute.short,
                amount: "",
              };
            })
          );
          return {
            name: exercise.name,
            exerciseId: exercise._id,
            type: "exercise",
            attributes,
          };
        })
      );

      const template = {
        name: workout.name,
        workoutId: workout._id,
        type: "workout",
        date: "",
        time: "",
        exercises,
        notes: "",
      };

      res.status(200).json(template);
    })
    .catch((error) => {
      res.status(500).json({ error: message });
    });
};
