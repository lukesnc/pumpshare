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
    type: {
      type: String,
      enum: ["exercise", "workout"],
      required: [true, "Type is required"],
      trim: true,
    },
    attributes: [{
        attributeId: {
          type: Schema.Types.ObjectId,
          ref: 'Attribute', 
        },
        amount: {
          type: Number,
        }
      }],
    exercises: [
        {
          exercise_id: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
          
        },
      ],
    date: { type: Date, trim: true },
    about: { type: String, trim: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("LogData", logSchema, "logData");
