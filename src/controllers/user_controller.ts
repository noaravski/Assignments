import userModel, { IUser } from "../models/user_model";
import postModel from "../models/posts_model";
import commentModel from "../models/comments_model";
import BaseController from "./base_controller";
import { Request, Response } from "express";

const usersController = new BaseController<IUser>(userModel);

const createUser = async (req: Request, res: Response) => {
  const body = req.body;
  const userExists = await userModel.find({ username: body.username });
  if (body && userExists.length == 0) {
    try {
      const item = await userModel.create(body);
      res.status(201).send(item);
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(400).send("User already exists or missing fields!");
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const userExists = await userModel.find({ _id: id });
  const usernameTaken = await userModel.find({ username: body.username });
  if (body && userExists.length == 1 && usernameTaken.length == 0) {
    try {
      const item = await userModel.findByIdAndUpdate(id, body, {
        new: true,
      });
      if (item) {
        res.status(200).send(item);
      } else {
        res.status(404).send("Item not found");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    res
      .status(400)
      .send("Username or email is taken or user to update doesnt exists!");
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    if (user) {
      await commentModel.deleteMany({ sender: user.username });
      await postModel.deleteMany({ sender: user.username });
      await user.deleteOne();
      res.status(200).send("User deleted");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export { usersController, createUser, updateUser, deleteUser };
