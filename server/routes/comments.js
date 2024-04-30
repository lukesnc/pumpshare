const express = require("express");
const router = express.Router();
const controller = require("../controllers/commentsController");

// GET comments for particular post
router.get("/:id", controller.getComment);

module.exports = router;
