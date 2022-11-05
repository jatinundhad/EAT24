import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
const app = express();

// connecting with thw database
mongoose
  .connect("mongodb://localhost:27017/RMS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected with database");
  })
  .catch((err) => {
    console.log("Error while connecting with database");
    console.log(("Errror >> ", err));
  });

app.set("view engine", "ejs");
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: "true" }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

import userRoutes from "./routes/user.js";
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.listen(4000, () => {
  console.log("Hey i am running at port 4000");
});
