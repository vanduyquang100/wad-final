import Product from "../models/product.model.js";

class ProductService {
  async getProducts(filter = {}, page = 1, limit = 10) {
    const options = {
      page,
      limit,
    };

    const products = await Product.paginate(filter, options);
    return products;
  }

  async getProductById(productId) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  async addProduct(productData) {
    const newProduct = new Product(productData);
    return await newProduct.save();
  }

  async removeProduct(productId) {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
    return deletedProduct;
  }
}

export default new ProductService();
