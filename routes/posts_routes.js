const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts_controller");

router.get("/", postController.getAllPosts);

router.post("/", postController.addPost);

module.exports = router;
