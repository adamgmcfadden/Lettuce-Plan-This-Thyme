const router = require("express").Router();
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  res.render("calandar", { style: "calandar.css" });
});

module.exports = router;
