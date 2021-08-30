const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipes, Comment, User } = require("../models");

router.get("/", (req, res) => {
  Recipes.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "title",
      "summary",
      "nutrition",
      "servings",
      "cook_time",
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbRecipesData) => {
      // serialize data before passing to template
      const recipes = dbRecipesData.map((recipe) =>
        recipe.get({ plain: true })
      );
      res.render("dashboard", { style: "style.css", recipes, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
