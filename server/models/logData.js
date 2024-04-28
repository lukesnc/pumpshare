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
          type: Number, // Example additional data field
        }
      }],
    exercises: [
        {
          exercise_id: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
          
        },
      ],
    date: { type: Date, trim: true, required: [true, "Date is required!"] },
    about: { type: String, trim: true, required: [true, "About section is required!"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LogData", logSchema, "logData");
