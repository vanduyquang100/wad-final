import { Router } from "express";
var router = Router();

/* GET home page. */
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register Account" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Log In" });
});

export default router;
