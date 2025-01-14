import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import CartService from "./cart.service.js";

class OrderService {
  async createOrderFromCart(userId, address, paymentInfo = null) {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty or not found");
    }

    const totalPrice = cart.items.reduce((acc, item) => {
      const price = item.productId.promotePrice || item.productId.price;
      return acc + price * item.quantity;
    }, 0);

    const newOrder = new Order({
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        additionalInfo: item.additionalInfo,
      })),
      totalPrice,
      address,
      paymentInfo,
    });

    const savedOrder = await newOrder.save();

    await CartService.clearCart(userId);

    return savedOrder;
  }

  async getUserOrders(userId) {
    const orders = await Order.find({ userId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    return orders.map((order) => ({
      ...order._doc,
      userName: order.userId.name,
    }));
  }

  async getLatestOrder(userId) {
    const latestOrder = await Order.findOne({ userId })
      .sort({ createdAt: -1 })
      .populate("items.productId")
      .populate("userId", "name");

    if (!latestOrder) {
      throw new Error("No orders found for the user");
    }

    return {
      ...latestOrder._doc,
      userName: latestOrder.userId.name,
      items: latestOrder.items.map((item) => ({
        ...item._doc,
        product: item._doc.productId,
        productId: item._doc.productId._id,
      })),
    };
  }

  async getOrderById(orderId) {
    const order = await Order.findOne({ _id: orderId })
      .populate("items.productId")
      .populate("userId", "name");

    if (!order) {
      throw new Error("Order not found");
    }

    return {
      ...order._doc,
      userName: order.userId.name,
    };
  }

  async getOrderByIdWithProduct(orderId) {
    const order = await Order.findOne({ _id: orderId })
      .populate("items.productId")
      .populate("userId", "name");

    if (!order) {
      throw new Error("Order not found");
    }

    return {
      ...order._doc,
      userName: order.userId.name,
      items: order.items.map((item) => ({
        ...item._doc,
        product: item._doc.productId,
        productId: item._doc.productId._id,
      })),
    };
  }

  async updateOrderStatus(orderId, status) {
    const allowedStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "canceled",
    ];
    if (!allowedStatuses.includes(status)) {
      throw new Error("Invalid status");
    }

    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    order.status = status;
    return await order.save();
  }

  async getAllOrders(status, page = 1, limit = 10) {
    const filter = status ? { status } : {};

    const skip = (page - 1) * limit;
    const orders = await Order.find(filter)
      .populate("userId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments(filter);
    const totalPages = Math.ceil(totalOrders / limit);

    return {
      orders: orders.map((order) => ({
        ...order._doc,
        userName: order.userId.name,
      })),
      pagination: {
        totalOrders,
        totalPages,
        currentPage: page,
        limit,
      },
    };
  }

  async getAllOrdersOfUser(userId, page = 1, limit = 10) {
    const filter = { userId };

    const skip = (page - 1) * limit;
    const orders = await Order.find(filter)
      .populate("userId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments(filter);
    const totalPages = Math.ceil(totalOrders / limit);

    return {
      orders: orders.map((order) => ({
        ...order._doc,
        userName: order.userId.name,
      })),
      pagination: {
        totalOrders,
        totalPages,
        currentPage: page,
        limit,
      },
    };
  }

  /**
   * Get total revenue grouped by day within a specific time range.
   * Revenue is the sum of all total prices of non-pending and non-canceled orders for each day.
   *
   * @param {Date} startDate - The start timestamp of the range.
   * @param {Date} endDate - The end timestamp of the range.
   * @returns {Object[]} - Array of objects with date and revenue fields.
   */
  async getDailyRevenue(startDate, endDate) {
    if (!startDate || !endDate) {
      throw new Error("Both startDate and endDate are required");
    }

    const revenueData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
          status: { $nin: ["pending", "canceled"] },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return revenueData.map((entry) => ({
      date: entry._id,
      revenue: entry.totalRevenue,
    }));
  }
}

export default new OrderService();
