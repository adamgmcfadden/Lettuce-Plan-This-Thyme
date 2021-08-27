// const { response } = require("express");

async function getRecipe(event) {
    event.preventDefault();

    const searchValue = document.querySelector('.search-bar').value.trim();

    const data = { searchValue };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('/recipeSearch', options)
    .then(response => {
        console.log(response)
    })

    // .then(document.location.replace('/recipes'));  
};

document.querySelector('.search-form').addEventListener('submit', getRecipe);

 