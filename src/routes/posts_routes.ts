import express from "express";
const router = express.Router();
import postController from "../controllers/posts_controller";

router.get("/", postController.getAllPosts);

router.post("/", postController.addPost);

router.get("/post/:post_id", postController.getPostById);

router.get("/post", postController.getPostsBySender);

router.put("/post/:id", postController.updatePost);

export default router;
