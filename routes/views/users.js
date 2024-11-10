import { Router } from "express";
var router = Router();

/* GET home page. */
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register Account" });
});

export default router;
