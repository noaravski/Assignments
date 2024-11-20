const express = require("express");
const router = express.Router();
const comments_controller = require("../controllers/comments_controller");

router.post("/add-comment", comments_controller.addComment);

module.exports = router;
