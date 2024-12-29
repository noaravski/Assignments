import express, { Request, Response } from "express";
import {
  getCommentsByPostId,
  commentsController,
} from "../controllers/comments_controller";

const router = express.Router();

// Base controller routes
router.post("/add-comment", (req: Request, res: Response) => {
  commentsController.createItem(req, res);
});

router.get("/comment/:id", (req: Request, res: Response) => {
  commentsController.getItemById(req, res);
});

router.put("/comment/:id", (req: Request, res: Response) => {
  commentsController.updateItem(req, res);
});

router.delete("/comment/:id", (req: Request, res: Response) => {
  commentsController.deleteItem(req, res);
});

// Custom routes

router.get("/comments/:post_id", (req: Request, res: Response) => {
  getCommentsByPostId(req, res);
});

export default router;
