import express, { Request, Response } from "express";
import { postController, deletePost } from "../controllers/posts_controller";
import { authMiddleware } from "../controllers/user_controller";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The Posts API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - sender
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         sender:
 *           type: string
 *           description: The sender of the post
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns the list of all the posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: The list of the posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get("/", (req: Request, res: Response) => {
  postController.getAllItems(req, res);
});

/**
 * @swagger
 * /:
 *   post:
 *     summary: Creates a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *       400:
 *         description: Bad request
 */
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  postController.createItem(req, res);
});

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Deletes a post by id
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The post was successfully deleted
 *       404:
 *         description: The post was not found
 */
router.delete("/post/:id", authMiddleware, (req: Request, res: Response) => {
  deletePost(req, res);
});

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Gets a post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The post description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: The post was not found
 */
router.get("/post/:id", (req: Request, res: Response) => {
  postController.getItemById(req, res);
});

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Gets posts by sender
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: sender
 *         schema:
 *           type: string
 *         required: true
 *         description: The sender of the posts
 *     responses:
 *       200:
 *         description: The list of posts by the sender
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: The sender was not found
 */
router.get("/post", (req: Request, res: Response) => {
  postController.getItemBySender(req, res);
});

/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: Updates a post by id
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post was successfully updated
 *       404:
 *         description: The post was not found
 */
router.put("/post/:id", authMiddleware, (req: Request, res: Response) => {
  postController.updateItem(req, res);
});

export default router;
