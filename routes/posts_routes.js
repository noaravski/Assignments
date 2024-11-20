const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts_controller");

router.get("/", postController.getAllPosts);

router.post("/", postController.addPost);

router.get("/post/:post_id", postController.getPostById);

router.get("/post", postController.getPostsBySender);

router.put("/post/:id", postController.updatePost);

module.exports = router;
