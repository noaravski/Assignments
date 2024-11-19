const Posts = require("../models/posts_model");
const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { getAllPosts };
