import cartService from "../../services/cart.service.js";

class CartViewController {
  async getCart(req, res) {
    try {
      if (req.user) {
        const cart = await cartService.getCartByUserId(req.user.id, res);
        return cart;
      }
    } catch (e) {
      console.log("Error: ", e);
      throw new Error("Error happened.");
    }
  }
}

export const cartViewController = new CartViewController();
