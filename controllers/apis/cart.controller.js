import cartService from "../../services/cart.service.js";

class CartController {
  async getCart(req, res) {
    try {
      const cart = await cartService.getCartByUserId(req.user.id);
      res.json(cart);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async addItem(req, res) {
    try {
      const { productId, quantity, additionalInfo } = req.body;
      const cart = await cartService.addItemToCart(
        req.user.id,
        productId,
        quantity,
        additionalInfo
      );
      res.status(201).json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateItem(req, res) {
    try {
      const { productId, quantity, additionalInfo } = req.body;
      const cart = await cartService.updateCartItem(
        req.user.id,
        productId,
        quantity,
        additionalInfo
      );
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async removeItem(req, res) {
    try {
      const { productId } = req.params;
      const cart = await cartService.removeItemFromCart(req.user.id, productId);
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async clearCart(req, res) {
    try {
      const cart = await cartService.clearCart(req.user.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getCartTotal(req, res) {
    try {
      const total = await cartService.getCartTotal(req.user.id);
      res.json({ total });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const cartController = new CartController();
