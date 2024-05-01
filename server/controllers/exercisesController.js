const Exercise = require("../models/exercise");
const Attribute = require("../models/attributes");
const LogData = require("../models/logData");
const mongoose = require("mongoose");

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
  
  const removeItemWithValue = (arrayOfObjects, valueToRemove) => {
    
    return arrayOfObjects.filter(obj => Object.values(obj)[0] !== valueToRemove);
  };

  const exercise = req.body.exercise;
  const about = req.body.about;
  const values = req.body.values;
  
  if (!exercise || !about || !values) {
    return res.status(400).json({ error: "All fields are required" });
  }
  

  const id = exercise._id;
  const name = exercise.name;
  let attributes = values
  .filter(attr => attr[Object.keys(attr)[0]] !== '') // Filter out entries with null values
  .map(attr => {
    console.log(Object.entries(attr)[0]);
    const [attributeId, amount] = Object.entries(attr)[0]; // Get the first entry
    return { attributeId, amount };
  });
  const newValues = removeItemWithValue(attributes, '');
  const type = "exercise"
  const exercises = null;
  

  console.log(newValues);
  const log = new LogData({name, type, attributes, exercises, about});
  console.log("log object: ", log);
  log
    .save()
    .then((exercise) => {
      res.status(200).json({ exercise });
      //res.redirect(`/:${exercise._id}`);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

exports.getExercise = async (req, res) => {
  const id = req.params;
  if (!id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  Exercise.findById(id.id)
    .then((exercise) => {
      console.log("No error");
      res.status(200).json({ exercise });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

exports.getExerciseWithAttributes = async (req, res) => {
  let id = req.params;
  console.log(id);
  Exercise.find({_id: id.id})
    .populate('attr')
    .then((exercises) => {
      // Convert the nested objects in the 'attr' field to strings
      const formattedExercises = exercises.map((exercise) => ({
        ...exercise.toObject(), // Convert Mongoose document to plain JavaScript object
        attr: exercise.attr.map((attr) => attr.toObject())
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
    .populate('attr')
    .then((exercises) => {
      // Convert the nested objects in the 'attr' field to strings
      const formattedExercises = exercises.map((exercise) => ({
        ...exercise.toObject(), // Convert Mongoose document to plain JavaScript object
        attr: exercise.attr.map((attr) => attr.toObject())
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

  Exercise.find({ _id: exerciseId }, 'attr')
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
