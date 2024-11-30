import { Router } from "express";
import passport from "passport";
var router = Router();

/* GET home page. */
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register Account" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Log In", error: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/users/login");
  });
});

export default router;
