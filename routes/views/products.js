import { Router } from "express";
import { productViewController } from "../../controllers/views/product.controller.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await productViewController.getAllProducts(req);
    res.render("products", {
      products,
      title: "Products Page",
      user: req.user,
    });
  } catch (error) {
    res.status(404).render("error", { error: error.message });
  }
});

router.get("/cart", async (req, res, next) => {
  if (req.user) {
    res.render("cartview", {
      title: "View Cart",
      user: req.user,
    });
  } else {
    res.redirect("/users/login");
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await productViewController.getProduct(req);
    console.log(product);
    res.render("product", {
      product,
      title: "" + product.name,
      user: req.user,
    });
  } catch (error) {
    res.status(404).render("error", { error: error.message });
  }
});

export default router;
