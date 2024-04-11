const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [false, "First Name is required"],
      trim: true,
      minlength: 1,
    },
    lastName: {
      type: String,
      required: [false, "Last Name is required"],
      trim: true,
      minlength: 1,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: 8,
    },
    username: { type: String, trim: true, minlength: 1 },
    displayName: { type: String, trim: true, minlength: 1 },
    avatar: { type: String, trim: true },
    bio: { type: String, trim: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function (inputPassword) {
  let user = this;
  return bcrypt.compare(inputPassword, user.password);
};

module.exports = mongoose.model("User", userSchema, "users"); // The third argument is the name of the collection in the database (if it is not provided, it will be the lowercase-plural of the first argument)
