const Post = require("../models/post");
const { countDocuments } = require("../models/workouts");

exports.getPost = (req, res) => {
  const postId = req.params.id;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(post);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching post" });
    });
};

exports.getAllPosts = (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching posts" });
    });
};

exports.getPostsByUserId = (req, res) => {
  const userId = req.params.id;

  Post.find({ user: userId })
    .then((posts) => {
      if (!posts) {
        return res
          .status(404)
          .json({ message: "No posts found for this user" });
      }
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching posts" });
    });
};

exports.createPost = async (req,res) => {
  console.log("hi")
  const { content } = req.body;
  const token = req.header("Authorization").replace("Bearer ", "");
  const data = jwt.verify(token, process.env.JWT_SECRET);

  console.log("data", data);
};

