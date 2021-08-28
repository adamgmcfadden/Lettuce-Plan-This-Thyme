// my api
// const apiKey = "ca7027577b24470592ca8275b05b47b3"
// kt api
const apiKey = "c0a5df971c94493aa3d688d219a0a28d"
const url = "https://api.spoonacular.com/recipes/complexSearch?query="
const url2 = "&addRecipeInformation=true&addRecipeNutrition=true&number=20&apiKey=c0a5df971c94493aa3d688d219a0a28d"
const searchValue = document.querySelector('.search-bar').value.trim();

function getRecipe(event) {
    event.preventDefault();

    fetch(url + searchValue + url2)
    
    .then (res => res.json())
    .then(recipes => showRecipes(recipes.results));
   
     showRecipes = recipes => {
         const recipesDiv = document.querySelector('#recipe-container');

         recipes.forEach(recipe => {

            const recipeTitle = document.createElement('p');
            recipeTitle.innerText = `${recipe.title}`;
            recipesDiv.append(recipeTitle);

            const recipeImage = document.createElement('img');
            recipeImage.src = `${recipe.image}`;
            recipesDiv.append(recipeImage);

            const recipeServings = document.createElement('p');
            recipeServings.innerText = `Serves: ${recipe.servings}`;
            recipesDiv.append(recipeServings);

            const recipeTime = document.createElement('p');
            recipeTime.innerText = `Ready in: ${recipe.readyInMinutes} minutes`
            recipesDiv.append(recipeTime)

            const recipeURL = document.createElement('a');
            recipeURL.href = `${recipe.sourceUrl}`;
            recipeURL.target = `_blank`
            recipeURL.innerText = `Click her for recipe!`;
            recipesDiv.append(recipeURL)

            const faveBtn = document.createElement('button');
            faveBtn.innerText = `Add to favorites`;
            recipesDiv.append(faveBtn);

            const calendarBtn = document.createElement('button');
            calendarBtn.innerText = 'Add to calendar';
            recipesDiv.append(calendarBtn);
             
        });
    }
};

document.querySelector('.search-form').addEventListener('submit', getRecipe);

      // const data = {
        //     recipe: res.results,
        // };
        // recipeArray = res.results
        // recipeArray.forEach(element => {
        //     console.log(element)

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

    // document.location.replace('/recipes'); 