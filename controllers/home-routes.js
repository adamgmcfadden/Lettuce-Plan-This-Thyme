const router = require("express").Router();
const sequelize = require("../config/connection");
const fetch = require("node-fetch");
const { response } = require("express");
var nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  res.render("home", {
    style: "style.css",
    loggedIn: req.session.loggedIn,
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", { style: "style.css" });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
  }
  res.render("login", { style: "style.css" });
});

router.post("/send", (req, res) => {
  //  console.log(req.email)

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lettuceplanthisthyme@gmail.com",
      pass: "Thisthyme1234!",
    },
  });

  const mailOptions = {
    from: "lettuceplanthisthyme@gmail.com",
    to: req.body.email,
    // to: "tylerladas@hotmail.com",
    subject: "Welcome!",
    text: "Let's get cooking!",
  };

  transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.error("there was an error: ", err);
    } else {
      console.log("here is the res: ", res);
    }
  });
});

// router.get('/recipes', (req, res) => {
//     res.render('recipes', { style: "style.css" });
// });

// router.post('/recipeSearch', (req, res) => {

//     const search = (req.body)
//     console.log(search)
//     // const result =
//     // await
//     fetch("https://api.spoonacular.com/recipes/complexSearch?query=" + search + "&addRecipeInformation=true&addRecipeNutrition=true&number=20&apiKey=ca7027577b24470592ca8275b05b47b3")
//     .then (response => {
//         return response.json();
//     })
//     .then(json => {
//         const data = {
//             recipes: json.results,
//         };
//         console.log(data)
//         res.render('recipes', { data })
//         // res.json({
//         //     status: 'success',
//         //     recipe: data
//         // })
//     })
//     .catch(err => {
//         console.log(err);
//         // res.status(500).json(err);
//       });
// })

module.exports = router;
