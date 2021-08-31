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

router.post("/", withAuth, (req, res) => {
  Recipes.create({
    title: req.body.title,
    summary: req.body.summary,
    nutrition: req.body.nutrition,
    servings: req.body.servings,
    cook_time: req.body.cook_time,
    user_id: req.session.user_id,
    image: req.body.image,
    ingred: req.body.ingred,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:title', withAuth, (req, res) => {
  Recipes.destroy({
    where: {
      title: req.params.title
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No recipe found with that title!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
