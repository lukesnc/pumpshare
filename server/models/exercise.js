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
    attr: [{ type: Schema.Types.ObjectId, ref: "Attribute" }],
    date: { type: Date, trim: true },
    about: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exercise", exerciseSchema, "exercises");
