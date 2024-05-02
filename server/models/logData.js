const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const logSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
      minlength: 1,
    },
    workoutId: {
      type: Schema.Types.ObjectId,
      ref: "Workout",
    },
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
    },
    type: {
      type: String,
      enum: ["exercise", "workout"],
      required: [true, "Type is required"],
      trim: true,
    },
    date: { type: Date, trim: true },
    attributes: {
      type: Schema.Types.Mixed,
      required: false,
    },
    exercises: {
      type: Schema.Types.Mixed,
      required: false,
      default: {},
    },
    notes: { type: String, trim: true },
    // KEEP COMMENTED CODE
    // attributes: [
    //   {
    //     attributeId: {
    //       type: Schema.Types.ObjectId,
    //       ref: "Attribute",
    //     },
    //     short: {
    //       type: String,
    //     },
    //     amount: {
    //       type: Number,
    //     },
    //   },
    // ],
    // exercises: [
    //   {
    //     exerciseId: {
    //       type: Schema.Types.ObjectId,
    //       ref: "Exercise",
    //     },
    //     name: { type: String },
    //     attributes: [
    //       {
    //         attributeId: {
    //           type: Schema.Types.ObjectId,
    //           ref: "Attribute",
    //         },
    //         short: {
    //           type: String,
    //         },
    //         amount: {
    //           type: Number,
    //         },
    //       },
    //     ],
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("LogData", logSchema, "logData");
