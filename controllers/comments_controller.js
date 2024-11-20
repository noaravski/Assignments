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

module.exports = {
  addComment,
};