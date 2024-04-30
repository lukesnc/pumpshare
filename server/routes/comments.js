const express = require("express");
const router = express.Router();
const controller = require("../controllers/commentsController");

router.get("/:id", controller.getComment);

router.post("/:id", controller.postComment);

module.exports = router;
