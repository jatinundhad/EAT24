import express from "express";
import User from "../model/user.js";
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("user/register.ejs");
});

router.get("/login", (req, res) => {
  res.render("user/login.ejs");
});

router.get("/profile/:id", (req, res) => {
  res.render("user/profile.ejs");
});

export default router;
