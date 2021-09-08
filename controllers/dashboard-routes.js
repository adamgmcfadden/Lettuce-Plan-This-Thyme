// import dependecies
const router = require("express").Router();
const sequelize = require("../config/connection");

// import models - comment to me used a in a later app release
const { Recipes, Comment, User } = require("../models");
// withAuth only allows route with authorization - located in utils
const withAuth = require("../utils/auth");

// get all recipes
router.get("/", withAuth, (req, res) => {
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
      "ingred",
      "image",
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
    // if error, return error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// export route
module.exports = router;
