const Posts = require("../models/posts_model");

const addPost = async (req, res) => {
  const postBody = req.body;
  try {
    const post = await Posts.create(postBody);
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { getAllPosts, addPost };
