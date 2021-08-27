// my api
// const apiKey = "ca7027577b24470592ca8275b05b47b3"
// kt api
const apiKey = "c0a5df971c94493aa3d688d219a0a28d"
const url = "https://api.spoonacular.com/recipes/complexSearch?query="
const url2 = "&addRecipeInformation=true&addRecipeNutrition=true&number=20&apiKey=c0a5df971c94493aa3d688d219a0a28d"
const searchValue = document.querySelector('.search-bar').value.trim();

async function getRecipe(event) {
    event.preventDefault();

   
    fetch(url + searchValue + url2)
    
    .then (res => {
        return res.json();
    })
    .then(res => {
        const data = {
            recipe: res.results,
        };
        console.log(data)
    })
    
    // const data = { searchValue };
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // };
    // fetch('/recipeSearch', options)
    // .then(response => {
    //     console.log(response)
    // })

    // .then(document.location.replace('/recipes'));  
};

document.querySelector('.search-form').addEventListener('submit', getRecipe);

 