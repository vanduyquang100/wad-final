import { Router } from "express";
import { cartController } from "../../controllers/apis/cart.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get the user's cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *       404:
 *         description: Cart not found
 */
router.get("/", cartController.getCart);

/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               additionalInfo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item added to the cart
 *       400:
 *         description: Bad request
 */
router.post("/items", cartController.addItem);

/**
 * @swagger
 * /api/cart/items:
 *   put:
 *     summary: Update an item in the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               additionalInfo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Bad request
 */
router.put("/items", cartController.updateItem);

/**
 * @swagger
 * /api/cart/items/{productId}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed successfully
 *       400:
 *         description: Bad request
 */
router.delete("/items/:productId", cartController.removeItem);

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     summary: Clear the cart
 *     tags: [Cart]
 *     responses:
 *       204:
 *         description: Cart cleared successfully
 *       400:
 *         description: Bad request
 */
router.delete("/", cartController.clearCart);

/**
 * @swagger
 * /api/cart/total:
 *   get:
 *     summary: Get the cart total
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart total retrieved successfully
 *       400:
 *         description: Bad request
 */
router.get("/total", cartController.getCartTotal);

export default router;
