import Comment from "../models/comments_model";
import { Request, Response } from "express";

const addComment = async (req: Request, res: Response) => {
  const commentBody = req.body;
  try {
    const comment = await Comment.create(commentBody);
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const readCommentById = async (req: Request, res: Response) => {
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

const updateComment = async (req: Request, res: Response) => {
  const commentId = req.params.comment_id;
  const commentContent = req.body;

  try {
    const comment = await Comment.findByIdAndUpdate(commentId, commentContent, {
      new: true,
    });
    if (comment) {
      res.send(comment);
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteCommentById = async (req: Request, res: Response) => {
  const commentId = req.params.comment_id;

  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (comment) {
      res.send(comment);
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getCommentsByPostId = async (req: Request, res: Response) => {
  const postId = req.params.post_id;

  try {
    const comments = await Comment.find({ postId: postId });
    if (comments) {
      res.send(comments);
    } else {
      res.status(404).send("Comments not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export default {
  addComment,
  readCommentById,
  updateComment,
  deleteCommentById,
  getCommentsByPostId
};
