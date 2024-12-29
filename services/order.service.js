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

    await Order.deleteMany({ userId, status: "pending" });

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

    console.log("Current order is ", newOrder);

    const savedOrder = await newOrder.save();

    await CartService.clearCart(userId);

    return savedOrder;
  }

  async getUserOrders(userId) {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    console.log("Latest orders: ", JSON.stringify(orders));
    return orders;
  }

  async getLatestOrder(userId) {
    const latestOrder = await Order.findOne({ userId })
      .sort({ createdAt: -1 })
      .populate("items.productId");

    if (!latestOrder) {
      throw new Error("No orders found for the user");
    }

    console.log("Latest order data: ", JSON.stringify(latestOrder));

    return {
      items: latestOrder.items.map((item) => ({
        ...item._doc,
        product: item._doc.productId,
        productId: item._doc.productId._id,
      })),
    };
  }

  async getOrderById(userId, orderId) {
    const order = await Order.findOne({ _id: orderId, userId }).populate(
      "items.productId"
    );
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
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
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments(filter);
    const totalPages = Math.ceil(totalOrders / limit);

    return {
      orders,
      pagination: {
        totalOrders,
        totalPages,
        currentPage: page,
        limit,
      },
    };
  }
}

export default new OrderService();
