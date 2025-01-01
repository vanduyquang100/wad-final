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

  async getAllOrders(req, res) {
    try {
      const { status } = req.query;
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;

      const data = await orderService.getAllOrders(status, page, limit);

      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getOrderDetail(req, res) {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderById(id);
      res.json(order);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedOrder = await orderService.updateOrderStatus(id, status);
      res.json(updatedOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getRevenueInRange(req, res) {
    try {
      const { start, end } = req.query;

      if (!start || !end) {
        return res
          .status(400)
          .json({ error: "Start and end timestamps are required." });
      }

      const startDate = new Date(parseInt(start, 10));
      const endDate = new Date(parseInt(end, 10));

      if (isNaN(startDate) || isNaN(endDate)) {
        return res.status(400).json({ error: "Invalid timestamps provided." });
      }

      const revenue = await orderService.getDailyRevenue(startDate, endDate);
      res.json({ totalRevenue: revenue });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const orderController = new OrderController();
