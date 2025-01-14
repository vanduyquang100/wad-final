import { Router } from "express";
import { orderViewController } from "../../controllers/views/order.controller.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error("Not authenticated user.");
    }
    const order = await orderViewController.getOrder(req, res);
    if (!order) {
      throw new Error("No order to retrieve.");
    }
    console.log("Order retrieved: ", JSON.stringify(order));
    res.render("order", {
      title: "View Ordert",
      user: req.user,
      order: order,
    });
  } catch (e) {
    console.log("Error happened when processing the Order page: ", e);
    res.redirect("/users/login");
  }
});

router.get("/all", async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error("Not authenticated user.");
    }
    const { orders } = await orderViewController.getAllOrders(req, res);
    if (!orders) {
      throw new Error("No order to retrieve.");
    }
    console.log("Order retrieved: ", JSON.stringify(orders));
    res.render("orderlist", {
      title: "View All Orders",
      user: req.user,
      orders: orders,
    });
  } catch (e) {
    console.log("Error happened when processing the Order List page: ", e);
    res.redirect("/users/login");
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error("Not authenticated user.");
    }
    const { id } = req.params;
    const order = await orderViewController.getOrderByOrderId(id);
    if (!order) {
      throw new Error("No order to retrieve.");
    }
    console.log("Order retrieved: ", JSON.stringify(order));
    res.render("order", {
      title: "View Ordert",
      user: req.user,
      order: order,
    });
  } catch (e) {
    console.log("Error happened when processing the Order page: ", e);
    res.redirect("/users/login");
  }
});

export default router;
