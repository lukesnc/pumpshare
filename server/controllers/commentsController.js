const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");

exports.getComment = (req, res) => {
  const commentId = req.params.id;

  Comment.findById(commentId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json(post);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching comment" });
    });
};

exports.postComment = async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;

  if (!content) {
    throw Error("Your comment must include content");
  }
  const token = req.header("Authorization").replace("Bearer ", "");
  const data = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const user = await User.findById(data._id).then();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newComment = new Comment({ user: data._id, content });
    try {
      const commentRes = await newComment.save();
      if (commentRes) {
        Post.findById(postId)
          .then((post) => {
            if (post) {
              const updateData = {
                $set: {
                  comments: [...post.comments, newComment],
                },
                $currentDate: { lastUpdated: true },
              };
              Post.findByIdAndUpdate(postId, updateData).then(() => {
                res.status(201).json({
                  message: "Comment created successfully!",
                  newComment,
                });
              });
            }
          })
          .catch((error) => {
            console.error("Error finding post:", error);
          });
      }
    } catch (error) {
      console.error("Error saving comment:", error);
      res.status(500).json({ error: "Unable to create comment" });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};
