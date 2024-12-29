import Posts from "../models/posts_model";
import { Request, Response } from "express";


const addPost = async (req: Request, res: Response) => {
  const postBody = req.body;
  try {
    const post = await Posts.create(postBody);
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Posts.find();
    res.send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPostById = async (req: Request, res: Response) => {
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

const getPostsBySender = async (req: Request, res: Response) => {
  const filter = req.query.sender;
  try {
    const posts = await Posts.find({ sender: filter });
    res.send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Posts.findById(postId);
    if (post) {
      post.content = req.body.content;
      await post.save();
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default {
  getAllPosts,
  getPostById,
  addPost,
  getPostsBySender,
  updatePost,
};
