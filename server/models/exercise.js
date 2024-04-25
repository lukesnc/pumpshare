const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const exerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 1,
    },
    attr: [
      {
        type: String,
        required: [true, "Attribute is required"],
        trim: true,
        minlength: 1,
      },
    ],
    date: { type: Date, trim: true },
    sets: { type: String, trim: true },
    reps: { type: String, trim: true },
    weight: { type: String, trim: true },
    about: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exercise", exerciseSchema, "exercises");
