const Exercise = require("../models/exercise");
const Attribute = require("../models/attributes");

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
  const id = req.body.id;
  const name = req.body.name || "";
  const attr = req.body.attr || "";
  const date = req.body.date || "";
  const distance = req.body.distance || "";
  const sets = req.body.sets || "";
  const time = req.body.time || "";
  const laps = req.body.laps || "";
  const reps = req.body.reps || "";
  const weight = req.body.weight || "";
  const about = req.body.about || "";
  const measurement = req.body.measurement || "";
  const timeUnit = req.body.timeUnit || "";

  /**if (!date || !sets || !reps || !weight || !about){
        return res.status(400).json({error: 'All fields are required'});
    }**/

  Exercise.findOneAndUpdate(
    { _id: id },
    {
      name: name !== "" ? name : undefined,
      attr: attr !== "" ? attr : undefined,
      date: date !== "" ? date : undefined,
      distance: distance,
      sets: sets,
      time: time,
      laps: laps,
      reps: reps,
      weight: weight,
      measurement: measurement,
      timeUnit: timeUnit,
      about: about !== "" ? about : undefined,
    },
    { new: true }
  )
    .then((exercise) => {
      console.log(exercise);
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

exports.getAllExercises = async (req, res) => {
  Exercise.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching exercises" });
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
