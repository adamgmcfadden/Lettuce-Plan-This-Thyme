const router = require('express').Router();
const sequelize = require('../config/connection');
const fetch = require("node-fetch");
const { response } = require('express');

router.get("/", (req, res) => {
  res.render("home", { style: "style.css" });
});

router.get("/signup", (req, res) => {
  res.render("signup", { style: "style.css" });
});

router.get("/login", (req, res) => {
  res.render("login", { style: "style.css" });
});

router.get('/recipes', (req, res) => {
    res.render('recipes', { style: "style.css" });
});

router.post('/recipeSearch', (req, res) => {

    const search = (req.body.searchValue)
    console.log(search)
    // const result = 
    // await 
    fetch("https://api.spoonacular.com/recipes/complexSearch?query=" + search + "&addRecipeInformation=true&addRecipeNutrition=true&number=20&apiKey=c0a5df971c94493aa3d688d219a0a28d")
    .then (response => {
        return response.json();
    })
    .then(json => {
        const data = {
            recipes: json.results,
        };
        console.log(data)
        res.render('recipes', { data })
        // res.json({
        //     status: 'success',
        //     recipe: data
        // })
    })
    .catch(err => {
        console.log(err);
        // res.status(500).json(err);
      });
})

module.exports = router;

// kt api
const apiKey = "c0a5df971c94493aa3d688d219a0a28d"