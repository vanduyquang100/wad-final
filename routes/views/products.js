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

router.get("/:id", async (req, res, next) => {
  try {
    const { product, comments } = await productViewController.getProduct(req);
    console.log(product);
    res.render("product", {
      product,
      title: "" + product.name,
      user: req.user,
      comments,
    });
  } catch (error) {
    console.log(error);
    res.status(404).render("error", { error: error.message });
  }
});

export default router;
