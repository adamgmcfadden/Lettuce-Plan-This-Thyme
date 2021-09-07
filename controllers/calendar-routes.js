const router = require("express").Router();
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");
const Calendar = require("../models/Calendar");

router.get("/", withAuth, (req, res) => {
  res.render("calendar", { style: "calendar.css", loggedIn: true });
});
router.get("/all", (req, res) => {
  Calendar.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "title",
      "summary",
      "year",
      "month",
      "day",
      "meal",

      "cook_time",
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
      //console.log(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.post("/", (req, res) => {
  Calendar.create({
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    title: req.body.title,
    meal: req.body.meal,
    cook_time: req.body.cook_time,
    summary: req.body.summary,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.render("calendar", { data: req.body }))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.delete("/:id", (req, res) => {
  Calendar.destroy({
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No recipe found with that title!" });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
