const router = require("express").Router();

const { User, Recipes, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Recipes.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Recipes.create({
    title: req.body.title,
    summary: req.body.summary,
    nutrition: req.body.nutrition,
    servings: req.body.servings,
    cook_time: req.body.cook_time,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;