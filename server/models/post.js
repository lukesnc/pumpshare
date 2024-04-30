const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      minlength: 1,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema, "posts");
