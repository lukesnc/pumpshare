const express = require("express");
const router = express.Router();
const controller = require("../controllers/postsController");

// GET all users
router.get("/", controller.getAllPosts);

// GET one post
router.get("/:id", controller.getPost);

router.get("/user/:id", controller.getPostsByUserId);
// POST a post
router.post("/post", controller.getPost);

router.get("/create", controller.create);
    
module.exports = router;
