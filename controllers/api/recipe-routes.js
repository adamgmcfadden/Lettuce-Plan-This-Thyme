//---Import dependencies
const router = require("express").Router();

// import models - comment to me used a in a later app release
const { User, Recipes, Comment } = require("../../models");

// withAuth only allows route with authorization - located in utils
const withAuth = require("../../utils/auth");

// get all recipes
router.get("/", (req, res) => {
  Recipes.findAll()
    //return recipes with all associated data
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create new recipe
router.post("/", withAuth, (req, res) => {
  Recipes.findOrCreate({
    defaults: {
      title: req.body.title,
      summary: req.body.summary,
      nutrition: req.body.nutrition,
      servings: req.body.servings,
      cook_time: req.body.cook_time,
      user_id: req.session.user_id,
      image: req.body.image,
      ingred: req.body.ingred,
    },
    where: {
      title: req.body.title,
      user_id: req.session.user_id,
    },
  })
    //create recipe
    .then((dbPostData) => res.json(dbPostData))
    //if error , return error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete recipe by title
router.delete("/:title", withAuth, (req, res) => {
  Recipes.destroy({
    where: {
      title: req.params.title,
      user_id: req.session.user_id,
    },
  })
    .then((dbCommentData) => {
      //if no recipe with that title, send error not found
      if (!dbCommentData) {
        res.status(404).json({ message: "No recipe found with that title!" });
        return;
      }
      //delete recipe for user
      res.json(dbCommentData);
    })
    //if error, return error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// export recipe routes
module.exports = router;
