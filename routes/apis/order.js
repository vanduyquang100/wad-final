import { Router } from "express";
import { orderController } from "../../controllers/apis/order.controller.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error("Not authenticated user.");
    }
    await orderController.createOrder(req, res);
    res.redirect("/orders/");
  } catch (e) {
    console.log("Error happened while creating new order: ", e);
    res.redirect("/users/login");
  }
});

export default router;
