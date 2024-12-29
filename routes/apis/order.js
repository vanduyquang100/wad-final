import { Router } from "express";
import { orderController } from "../../controllers/apis/order.controller.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error("Not authenticated user.");
    }
    await orderController.createOrder(req, res);
    res.redirect("/orders/");
  } catch (e) {
    console.log("Error happened while creating new order: ", e);
    res.redirect("/users/login");
  }
});

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders with pagination
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, shipped, delivered, canceled]
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
 *         description: Number of orders per page (default is 10)
 *     responses:
 *       200:
 *         description: List of orders with pagination
 *       400:
 *         description: Bad request
 */
router.get("/", orderController.getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order detail
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */
router.get("/:id", orderController.getOrderDetail);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, shipped, delivered, canceled]
 *     responses:
 *       200:
 *         description: Order status updated
 *       400:
 *         description: Bad request
 */
router.patch("/:id/status", orderController.updateOrderStatus);

export default router;
