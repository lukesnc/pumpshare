const Exercise = require("../models/exercise");
const Attribute = require("../models/attributes");
const LogData = require("../models/logData");

exports.createExercise = async (req, res) => {
  const { name, attr } = req.body;
  if (!name || !attr) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const exercise = new Exercise({ name, attr });
  exercise
    .save()
    .then(() => {
      res.status(200).json(exercise);
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.logExercise = async (req, res) => {
  const { logObject } = req.body;
  console.log("logObject", logObject);
  const combinedDateString = `${logObject.date}T${logObject.time}:00Z`;
  const userTimezoneOffset = new Date().getTimezoneOffset();
  const dateObject = new Date(
    new Date(combinedDateString).getTime() + userTimezoneOffset * 60 * 1000
  );

  const newLogData = new LogData({
    name: logObject.name,
    exerciseId: logObject.exerciseId,
    type: logObject.type,
    date: dateObject,
    attributes: logObject.attributes,
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

exports.getExercise = async (req, res) => {
  const id = req.params;
  if (!id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  Exercise.findById(id.id)
    .then((exercise) => {
      res.status(200).json({ exercise });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

exports.getExerciseWithAttributes = async (req, res) => {
  let id = req.params;
  console.log(id);
  Exercise.find({ _id: id.id })
    .populate("attr")
    .then((exercises) => {
      // Convert the nested objects in the 'attr' field to strings
      const formattedExercises = exercises.map((exercise) => ({
        ...exercise.toObject(), // Convert Mongoose document to plain JavaScript object
        attr: exercise.attr.map((attr) => attr.toObject()),
      }));

      res.status(200).json(formattedExercises);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching exercises" });
    });
};

exports.deleteExercise = async (req, res) => {
  const id = req.params;
  console.log(id);
  if (!id) {
    return res.status(400).json({ error: "Invalid Exercise" });
  }

  Exercise.deleteOne({ _id: id.id })
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

exports.getAllExercisesWithAttributes = async (req, res) => {
  Exercise.find({})
    .populate("attr")
    .then((exercises) => {
      // Convert the nested objects in the 'attr' field to strings
      const formattedExercises = exercises.map((exercise) => ({
        ...exercise.toObject(), // Convert Mongoose document to plain JavaScript object
        attr: exercise.attr.map((attr) => attr.toObject()),
      }));

      res.status(200).json(formattedExercises);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching exercises" });
    });
};
exports.getAllExercises = async (req, res) => {
  Exercise.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.getAllAttributes = async (req, res) => {
  Attribute.find()
    .then((attributes) => {
      res.status(200).json(attributes);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching attributes" });
    });
};

exports.getAttributesByExercise = async (req, res) => {
  const exerciseId = req.params;
  if (!exerciseId) {
    return res.status(400).json({ error: "Invalid Exercise" });
  }

  Exercise.find({ _id: exerciseId }, "attr")
    .then((attributes) => {
      console.log(attributes);
      res.status(200).json(attributes);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching attributes" });
    });
};

exports.createNewAttribute = async (req, res) => {
  console.log("Attribute res body: ", req.body);
  const { name, units } = req.body;
  if (!name || !units) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const attribute = new Attribute({ name, short: units });
  attribute
    .save()
    .then(() => {
      res.status(200).json(attribute);
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.getAllLogData = async (req, res) => {
  LogData.find()
    .then((logData) => {
      console.log(logData);
      res.status(200).json(logData);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching attributes" });
    });
};

exports.getLogObjectTemplate = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // let template = {};

  // PLEASE KEEP THIS - ID LIKE TO LEARN WHY THIS DOESN'T WORK - FRED SCHUCK

  // Exercise.findById(id)
  //   .then((exercise) => {
  //     template = {
  //       name: exercise.name,
  //       type: "exercise",
  //       attributes: [],
  //     };
  //     exercise.attr.forEach((attribute) => {
  //       Attribute.find(attribute)
  //         .then((attr) => {
  //           // console.log("attr id: ", attr[0].name);
  //           const attributeEntry = {
  //             attributeId: attr[0]._id,
  //             short: attr[0].short,
  //             amount: "",
  //           };
  //           template.attributes = [...template.attributes, attributeEntry];
  //           console.log("template object: ", template);
  //         })
  //         .catch((error) => {
  //           res.status(500).json({ error: error.message });
  //         });
  //     });
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ error: error.message });
  //   });

  Exercise.findById(id)
    .then((exercise) => {
      const promises = exercise.attr.map((attributeId) =>
        Attribute.findById(attributeId).then((attribute) => ({
          attributeId: attribute._id,
          short: attribute.short,
          amount: "",
        }))
      );

      return Promise.all(promises)
        .then((attributes) => {
          const template = {
            name: exercise.name,
            exerciseId: exercise._id,
            type: "exercise",
            date: "",
            attributes,
            notes: "",
          };
          res.status(200).json(template);
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
