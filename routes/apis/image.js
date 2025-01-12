import { Router } from "express";
import { imageController } from "../../controllers/apis/image.controller.js";
import { upload } from "../../services/image.service.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Image upload management
 */

/**
 * @swagger
 * /api/images/upload:
 *   post:
 *     summary: Upload an image to Imgur
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 link:
 *                   type: string
 *                   description: URL of the uploaded image
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Failed to upload image
 */
router.post("/upload", upload.single("file"), imageController.uploadImage);
export default router;
