//---Import dependencies
const router = require("express").Router();

// import models - comment to me used a in a later app release
const { User, Recipes, Comment } = require("../../models");

// withAuth only allows route with authorization - located in utils
const withAuth = require("../../utils/auth");

// get all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    //return all user information (exclude password)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      //if error, return error
      console.log(err);
      res.status(500).json(err);
    });
});

//get single user by id
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Recipes,
        attributes: [
          "id",
          "title",
          "summary",
          "nutrition",
          "servings",
          "cook_time",
        ],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Recipes,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbUserData) => {
      //if no user exists with id, return error 404
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      //return user by id
      res.json(dbUserData);
    })
    //if error return error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create new user
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    //create new user with username, email and password
    .then((dbUserData) => {
      req.session.save(() => {
        //save session when logged in
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        //create new user
        res.json(dbUserData);
      });
    })
    //if error, return error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//login with username
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((dbUserData) => {
    //username does not exist error
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that name!" });
      return;
    }
    //save valid passowrd as variable
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    //if password okay, save session and log user in
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
      console.log("logged");
    });
  });
});

//end session to log out
router.post("/logout", withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//delete user info (not used anywhere in app, just there for backend control when needed)
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

//export user routes
module.exports = router;
