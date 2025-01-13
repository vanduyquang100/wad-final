import { Router } from "express";
import { commentApiController } from "../../controllers/apis/comment.controller.js";

const router = Router();

/**
 * @swagger
 * /api/comments/{productId}:
 *   get:
 *     summary: Get comments for a product with pagination
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           description: Product ID
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number (default is 1)
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of comments per page (default is 10)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order (asc or desc)
 *     responses:
 *       200:
 *         description: List of comments with pagination
 */
router.get("/:productId", commentApiController.getComments);

/**
 * @swagger
 * /api/comments/{productId}:
 *   post:
 *     summary: Post a comment for a product
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               rating:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comment created successfully
 */
router.post("/:productId", commentApiController.postComment);

/**
 * @swagger
 * /api/comments/{commentId}/like:
 *   post:
 *     summary: Like a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *           description: Comment ID
 *     responses:
 *       200:
 *         description: Comment liked successfully
 */
router.post("/:commentId/like", commentApiController.likeComment);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *           description: Comment ID
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 */
router.delete("/:commentId", commentApiController.deleteComment);

export default router;
