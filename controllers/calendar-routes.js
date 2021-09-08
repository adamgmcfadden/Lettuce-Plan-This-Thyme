//  import dependencies
const router = require("express").Router();
const sequelize = require("../config/connection");

// withAuth only allows route with authorization - located in utils
const withAuth = require("../utils/auth");

// import calendar model
const Calendar = require("../models/Calendar");

// get entire calendar
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
      // calendar by user, worked around this in that app, cannot happen
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      // return calendar and all calendar data
      res.json(dbUserData);
      //console.log(dbUserData);
    })
    // if error, return error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post to the calendar (meals)
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
    // post meal to calendar
    .then((dbPostData) => res.render("calendar", { data: req.body }))
    // if error, return error
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

// export routes
module.exports = router;
