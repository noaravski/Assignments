const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments_controller");

router.post("/add-comment", commentsController.addComment);

router.get("/comment/:comment_id", commentsController.readCommentById);

router.put("/comment/:comment_id", commentsController.updateComment);

router.delete("/comment/:comment_id", commentsController.deleteCommentById);

module.exports = router;
