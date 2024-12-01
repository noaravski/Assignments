const Comment = require("../models/comments_model");

const addComment = async (req, res) => {
  const commentBody = req.body;
  try {
    const comment = await Comment.create(commentBody);
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const readCommentById = async (req, res) => {
  const commentId = req.params.comment_id;

  try {
    const comment = await Comment.findById(commentId);
    if (comment) {
      res.send(comment);
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addComment,
  readCommentById
};