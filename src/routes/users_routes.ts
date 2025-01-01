import express, { Request, Response } from "express";
import {
  usersController,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
  refresh,
} from "../controllers/user_controller";

const router = express.Router();

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh", refresh);

router.get("/", (req: Request, res: Response) => {
  usersController.getAllItems(req, res);
});

router.post("/", (req: Request, res: Response) => {
  createUser(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
  usersController.getItemById(req, res);
});

router.put("/:id", (req: Request, res: Response) => {
  updateUser(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  deleteUser(req, res);
});

export default router;
