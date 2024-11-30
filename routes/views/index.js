import { Router } from "express";
import { productViewController } from "../../controllers/views/product.controller.js";

var router = Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const products = await productViewController.getPromotionProducts(res);
  res.render("index", { title: "Home", products, user: req.user });
});

router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Contact Us", user: req.user });
});

router.get("/about", function (req, res, next) {
  res.render("about", { title: "About Us", user: req.user });
});

export default router;
