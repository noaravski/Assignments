import express from "express";
const router = express.Router();
import commentsController from "../controllers/comments_controller";

router.post("/add-comment", commentsController.addComment);

router.get("/comment/:comment_id", commentsController.readCommentById);

router.put("/comment/:comment_id", commentsController.updateComment);

router.delete("/comment/:comment_id", commentsController.deleteCommentById);

router.get("/comments/:post_id", commentsController.getCommentsByPostId);

export default router;
