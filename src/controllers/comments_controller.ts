import commentsModel, { IComments } from "../models/comments_model";
import BaseController from "./base_controller";
import { Request, Response } from "express";
import Comment from "../models/comments_model";

const getCommentsByPostId = async (req: Request, res: Response) => {
  const postId = req.params.post_id;
  try {
    const comments = await Comment.find({ postId: postId });
    if (comments) {
      res.status(200).send(comments);
    } else {
      res.status(404).send("Comments not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const commentsController = new BaseController<IComments>(commentsModel);

export { getCommentsByPostId, commentsController };
