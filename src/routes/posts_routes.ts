import express, { Request, Response } from "express";
import { postController, deletePost } from "../controllers/posts_controller";
import { authMiddleware } from "../controllers/user_controller";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  postController.getAllItems(req, res);
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  postController.createItem(req, res);
});

router.delete("/post/:id", authMiddleware, (req: Request, res: Response) => {
  deletePost(req, res);
});

router.get("/post/:id", (req: Request, res: Response) => {
  postController.getItemById(req, res);
});

router.get("/post", (req: Request, res: Response) => {
  postController.getItemBySender(req, res);
});

router.put("/post/:id", authMiddleware, (req: Request, res: Response) => {
  postController.updateItem(req, res);
});

export default router;
