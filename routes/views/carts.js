import { Router } from "express";
import { cartViewController } from "../../controllers/views/cart.controller.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const cart = await cartViewController.getCart(req, res);
    console.log("What cart looks like: ", JSON.stringify(cart));
    if (!req.user) {
      throw new Error("Not authenticated user.");
    }
    res.render("cartview", {
      title: "View Cart",
      user: req.user,
      cart: cart,
    });
  } catch (e) {
    res.redirect("/users/login");
  }
});

export default router;
