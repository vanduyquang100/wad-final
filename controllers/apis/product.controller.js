import productService from "../../services/product.service.js";
import { commentService } from "../../services/comment.service.js";

class ProductController {
  async createProduct(req, res) {
    try {
      const product = await productService.addProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getProduct(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) {
        throw new Error("Product not found");
      }
      res.json(product);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await productService.removeProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllProducts(req, res) {
    try {
      const { page, limit, sortBy, sortOrder, ...filter } = req.query; // Extracting pagination and filters from query
      const products = await productService.getProducts(
        filter,
        page,
        limit,
        sortBy,
        sortOrder
      );
      res.json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const productData = req.body;
      const updatedProduct = await productService.updateProduct(
        productId,
        productData
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getProductsWithRevenue(req, res) {
    try {
      const { start, end } = req.query;
      const startTime = Number(start);
      const endTime = Number(end);

      if (isNaN(startTime) || isNaN(endTime)) {
        throw new Error("Invalid start or end timestamp");
      }
      const products = await productService.getProductsWithRevenue(
        startTime,
        endTime
      );
      res.json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getCommentsByProduct(req, res) {
    try {
      const { id: productId } = req.params;
      const { page, limit } = req.query;
      const userId = req.user?._id; // Ensure `req.user` exists if authentication is applied

      const result = await commentService.getCommentsByProduct({
        productId,
        userId,
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
      });

      if (!result) {
        return res
          .status(404)
          .json({ message: "Product or comments not found" });
      }

      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async postComment(req, res) {
    try {
      const { id: productId } = req.params;
      const { content, rating } = req.body;
      const userId = req.user?._id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const result = await commentService.postComment({
        userId,
        productId,
        content,
        rating,
      });

      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const productController = new ProductController();
