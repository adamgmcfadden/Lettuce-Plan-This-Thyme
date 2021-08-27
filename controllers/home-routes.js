const router = require("express").Router();
const sequelize = require("../config/connection");

router.get("/", (req, res) => {
  res.render("home", { style: "style.css" });
});

router.get("/signup", (req, res) => {
  res.render("signup", { style: "style.css" });
});

router.get("/login", (req, res) => {
  res.render("login", { style: "style.css" });
});

router.get("/recipes", (req, res) => {
  res.render("recipes", data);
});

module.exports = router;
