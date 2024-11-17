import productService from "../../services/product.service.js";

class ProductViewController {
  async getProduct(req) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (product) {
        console.log("found product");
        const relevantProducts = await productService.getRelevantProducts(
          product.id,
          product.category
        );
        console.log("relevant product", relevantProducts);
        product.relevantProducts = relevantProducts.docs;
        console.log("product in the end", product);
      }
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllProducts(req) {
    try {
      const { page, limit, ...filter } = req.query;
      const products = await productService.getProducts(filter, page, limit);
      const categories = await productService.getCategories();
      return { ...products, categories };
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const productViewController = new ProductViewController();
