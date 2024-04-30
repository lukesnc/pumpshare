const Comment = require("../models/comment");

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
