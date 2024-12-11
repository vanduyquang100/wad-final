import orderService from "../../services/order.service.js";

class OrderViewController {
  async getOrder(req, res) {
    const order = await orderService.getLatestOrder(req.user.id);
    if (!order) {
      throw new Error("Empty order.");
    }
    return order;
  }
}

export const orderViewController = new OrderViewController();
