import postModel, { IPost } from "../models/posts_model";
import commentModel from "../models/comments_model";
import userModel from "../models/user_model";
import BaseController from "./base_controller";
import { Request, Response } from "express";

const postController = new BaseController<IPost>(postModel);

const createPost = async (req: Request, res: Response) => {
  const body = req.body;
  const userExists = await userModel.find({ username: body.sender });
  if (body && userExists.length == 1) {
    try {
      const item = await postModel.create(body);
      res.status(201).send(item);
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(400).send("User doesn't exists!");
  }
};

const deletePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const post = await postModel.findById(id);
      if (post) {
        await commentModel.deleteMany({ sender: post.sender });
        await post.deleteOne();
        res.status(200).send("Post deleted");
      } else {
        res.status(404).send("Post was not found");
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

export { postController, createPost, deletePost };
