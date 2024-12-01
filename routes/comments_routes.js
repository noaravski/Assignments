const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments_controller");

router.post("/add-comment", commentsController.addComment);

module.exports = router;
