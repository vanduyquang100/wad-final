import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

class CartService {
  async getCartByUserId(userId) {
    let cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    return {
      totalItems: cart.items.length,
      items: cart.items.map((item) => ({
        ...item._doc,
        productId: item._doc.productId._id.toString(),
        product: item._doc.productId,
      })),
    };
  }

  async addItemToCart(userId, productId, quantity = 1, additionalInfo = null) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      if (additionalInfo) {
        existingItem.additionalInfo = additionalInfo;
      }
    } else {
      cart.items.push({
        productId,
        quantity,
        additionalInfo,
      });
    }

    return await cart.save();
  }

  async updateCartItem(userId, productId, quantity, additionalInfo = null) {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error("Cart not found for this user");
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      throw new Error("Product not found in the cart");
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
      if (additionalInfo) {
        cart.items[itemIndex].additionalInfo = additionalInfo;
      }
    }

    return await cart.save();
  }

  async removeItemFromCart(userId, productId) {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error("Cart not found for this user");
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    return await cart.save();
  }

  async clearCart(userId) {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error("Cart not found for this user");
    }

    cart.items = [];
    return await cart.save();
  }

  async getCartTotal(userId) {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      throw new Error("Cart not found for this user");
    }

    const total = cart.items.reduce((acc, item) => {
      const price = item.productId.promotePrice || item.productId.price;
      return acc + price * item.quantity;
    }, 0);

    return total;
  }
}

export default new CartService();
