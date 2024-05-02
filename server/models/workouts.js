const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const workoutSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 1,
    },
    exercises: [
      {
        type: Schema.Types.ObjectId,
        ref: "Exercise",
        required: [true, "At least one exercise is required"],
        trim: true,
        minlength: 1,
      },
    ],
    date: { type: Date, trim: true },
    about: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema, "workouts");
