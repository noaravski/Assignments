const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts_controller");

router.get("/", postController.getAllPosts);

module.exports = router;
