import productService from "../../services/product.service.js";

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
      const products = await productService.getProductsWithRevenue();
      res.json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const productController = new ProductController();
