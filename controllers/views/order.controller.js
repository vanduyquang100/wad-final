import orderService from "../../services/order.service.js";

class OrderViewController {
  async getOrder(req, res) {
    const order = await orderService.getLatestOrder(req.user.id);
    if (!order) {
      throw new Error("Empty order.");
    }
    return order;
  }

  async getOrderByOrderId(orderId) {
    const order = await orderService.getOrderByIdWithProduct(orderId);
    if (!order) {
      throw new Error("Empty order.");
    }
    return order;
  }

  async getAllOrders(req, res) {
    const orders = await orderService.getAllOrdersOfUser(req.user._id);
    return orders;
  }
}

export const orderViewController = new OrderViewController();
