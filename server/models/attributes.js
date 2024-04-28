const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const attributeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 1,
    },
    unitType: {
      type: String,
      trim: true,
    },
    short: {
      type: String,
      required: [true, 'Abbreviation of unit is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attribute', attributeSchema, 'attributes');
