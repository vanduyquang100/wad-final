import productService from "../../services/product.service.js";

class ProductViewController {
  async getProduct(req) {
    try {
      const product = await productService.getProductById(req.params.id);
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllProducts(req) {
    try {
      const { page, limit, ...filter } = req.query;
      const products = await productService.getProducts(filter, page, limit);
      return products;
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const productViewController = new ProductViewController();
