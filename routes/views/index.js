import { Router } from "express";
var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home" });
});

router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Contact Us" });
});

router.get("/about", function (req, res, next) {
  res.render("about", { title: "About Us" });
});

export default router;
