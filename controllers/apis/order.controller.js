import orderService from "../../services/order.service.js";

class OrderController {
  async createOrder(req, res) {
    try {
      const order = await orderService.createOrderFromCart(req.user.id);
      return order;
    } catch (error) {
      throw new Error("Error happened. ", {
        cause: error,
      });
    }
  }
}

export const orderController = new OrderController();
