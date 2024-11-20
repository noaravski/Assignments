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

const getPostById = async (req, res) => {
  const postId = req.params.post_id;

  try {
    const post = await Posts.findById(postId);
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPostsBySender = async (req, res) => {
  const filter = req.query.sender;
  try {
    const posts = await Posts.find({ sender: filter });
    res.send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { getAllPosts, getPostById, addPost, getPostsBySender };
