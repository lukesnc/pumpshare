const Post = require("../models/post");

exports.getPost = (req, res) => {
  // Get a single post by ID
  const postId = req.params.id; // Assuming the post ID is in the request params

  Post.findById(postId) // Replace with your ODM's query method
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(post); // Use 200 for successful retrieval
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching post" });
    });
};

exports.getAllPosts = (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts); // Use 200 for successful retrieval
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching posts" });
    });
};

exports.getPostsByUserId = (req, res) => {
  const userId = req.params.id; // Assuming the user ID is in the request params

  // Find posts by user ID using Mongoose or similar ODM
  Post.find({ user: userId }) // Replace with your ODM's query method
    .then((posts) => {
      if (!posts) {
        return res
          .status(404)
          .json({ message: "No posts found for this user" });
      }
      res.status(200).json(posts); // Use 200 for successful retrieval
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching posts" });
    });
};

exports.create = (req, res) => {
  res.send("Create");
};
