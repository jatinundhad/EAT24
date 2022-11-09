import express from "express";
import User from "../model/user.js";
import AsyncCatch from "../utils/AsyncCatch.js";
import passport from "passport";
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("user/register.ejs");
});

router.post(
  "/register",
  AsyncCatch(async (req, res) => {
    try {
      const { username, email, password } = req.body.user;
      const newUser = new User({
        username,
        email,
      });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to EAT24!!!");
        res.redirect("/");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("user/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", `Welcome ${req.user.username}!!!`);
    res.redirect("/");
  }
);

router.get("/logout", (req, res, next) => {
  const username = req.user.username;
  req.logout(function (err) {
    if (err) return next(err);
    req.flash("success", `Goodbye ${username}, see you soon!!!`);
    res.redirect("/login");
  });
});

router.get("/profile/:id", (req, res) => {
  res.render("user/profile.ejs");
});

router.post("/profile/:id", (req, res) => {
  console.log(req.body.user);
  res.send(req.body.user);
});

export default router;
