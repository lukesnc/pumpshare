const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      minlength: 1,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema, "comments");
