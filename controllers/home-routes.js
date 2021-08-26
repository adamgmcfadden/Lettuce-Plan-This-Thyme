const router = require('express').Router();
const sequelize = require('../config/connection');
const fetch = require("node-fetch");


router.get('/', (req, res) => {
    res.render('home');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/recipes', (req, res) => {
    res.render('recipes');
});


router.post('/recipes', async (req, res) => {
    console.log(req.body.searchValue)
    
    const search = req.body.search
    
    const result = await fetch("https://api.spoonacular.com/recipes/complexSearch?query=" + search + '&addRecipeInformation=true&addRecipeNutrition=true&number=20&apiKey=ca7027577b24470592ca8275b05b47b3')

    // const fetchResult = await result.json();

    const data = {
        recipe: await result.json()
    }

    // console.log(fetchResult)
    console.log(data)
    res.render('recipes', data)

})

module.exports = router;