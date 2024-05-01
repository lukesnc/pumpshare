const express = require("express");
const router = express.Router();
const controller = require("../controllers/postsController");

// GET all users
router.get("/", controller.getAllPosts);

// GET one post
router.get("/:id", controller.getPost);

router.get("/:id/likes", controller.getLikes);
router.get("/:id/comments", controller.getComments);

router.get("/user/:id", controller.getPostsByUserId);
// POST a post
router.post("/post", controller.getPost);

router.post("/create", controller.createPost);

module.exports = router;
