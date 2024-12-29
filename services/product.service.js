import Product from "../models/product.model.js";

class ProductService {
  async getProducts(
    filter = {},
    page = 1,
    limit = 9,
    sortBy = "createdAt",
    sortOrder = "asc"
  ) {
    const options = {
      page,
      limit,
      sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 }, // Set sort options
    };

    const searchQuery = filter.name || filter.description;

    // Initialize the main filter
    let finalFilter = {};

    // Handle search in `name` and `description`
    if (searchQuery) {
      const regexQuery = { $regex: searchQuery, $options: "i" };
      finalFilter.$or = [{ name: regexQuery }, { description: regexQuery }];
    }
    if (filter.category) {
      finalFilter.$and = [
        ...(finalFilter.$and || []),
        { category: { $regex: filter.category, $options: "i" } },
      ];
    }

    // Handle price filtering
    const priceConditions = [];
    if (filter.minPrice) {
      priceConditions.push({ price: { $gte: filter.minPrice } });
      priceConditions.push({ promotePrice: { $gte: filter.minPrice } });
    }
    if (filter.maxPrice) {
      priceConditions.push({ price: { $lte: filter.maxPrice } });
      priceConditions.push({ promotePrice: { $lte: filter.maxPrice } });
    }

    if (priceConditions.length > 0) {
      // Combine price conditions with $or
      finalFilter.$and = [
        ...(finalFilter.$and || []),
        { $or: priceConditions },
      ];
    }

    // Add any additional filters (like category, tags, etc.)
    const {
      name,
      description,
      minPrice,
      maxPrice,
      category,
      ...additionalFilters
    } = filter;

    finalFilter = {
      ...finalFilter,
      ...additionalFilters,
    };

    const products = await Product.paginate(finalFilter, options);
    return products;
  }

  async getRelevantProducts(id, category) {
    const products = await Product.paginate(
      { category, _id: { $ne: id } },
      { page: 1, limit: 3 }
    );
    return products;
  }

  async getPromotionProducts() {
    const products = await Product.paginate(
      { promotePrice: { $ne: null } },
      { page: 1, limit: 3 }
    );
    return products;
  }

  async getCategories() {
    return await Product.distinct("category");
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

  async updateProduct(productId, updateData) {
    const excludedFields = ["_id", "id", "createdAt", "updatedAt"];
    excludedFields.forEach((field) => delete updateData[field]);

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      throw new Error("Product not found");
    }

    return updatedProduct;
  }
}

export default new ProductService();
