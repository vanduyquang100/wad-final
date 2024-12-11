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

export default router;
