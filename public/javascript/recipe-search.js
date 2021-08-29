// my api
// const apiKey = "ca7027577b24470592ca8275b05b47b3"
// kt api
// const apiKey = "c0a5df971c94493aa3d688d219a0a28d"
const url = "https://api.spoonacular.com/recipes/complexSearch?query=";
const url2 =
  "&addRecipeInformation=true&addRecipeNutrition=true&instructionsRequired=true&number=20&fillIngredients=true&apiKey=ca7027577b24470592ca8275b05b47b3";

function getRecipe(searchValue) {
  // console.log(searchValue)
  fetch(url + searchValue + url2)
    .then((res) => res.json())
    .then((recipes) => showRecipes(recipes.results));

  showRecipes = (recipes) => {
    console.log(recipes);
    const recipesDiv = document.querySelector("#recipe-container");

    recipes.forEach((recipe) => {
      const recipeCard = document.createElement("div");
      recipeCard.className = "card recipe-card col-5";
      recipesDiv.append(recipeCard);

      const recipeTitle = document.createElement("h5");
      recipeTitle.innerText = `${recipe.title}`;
      recipeCard.appendChild(recipeTitle);

      const recipeImage = document.createElement("img");
      recipeImage.src = `${recipe.image}`;
      recipeCard.appendChild(recipeImage);

      // const recipeSummary = document.createElement('span');
      // recipeSummary.innertext = `${recipe.summary}`;
      // recipeCard.appendChild(recipeSummary);

      const recipeCals = document.createElement("li");
      recipeCals.innerText = `Calories: ${recipe.nutrition.nutrients[0].amount} per serving`;
      recipeCard.appendChild(recipeCals);

      const recipeServings = document.createElement("li");
      recipeServings.innerText = `Serves: ${recipe.servings}`;
      recipeCard.appendChild(recipeServings);

      const recipeTime = document.createElement("li");
      recipeTime.innerText = `Ready in: ${recipe.readyInMinutes} minutes`;
      recipeCard.appendChild(recipeTime);

      const ingredients = document.createElement("div");
      ingredients.className = "ingredients";
      ingredients.innerText = `Ingredients: `;
      recipeCard.append(ingredients);

      for (i = 0; i < `${recipe.extendedIngredients.length}`; i++) {
        const recipeIngredients = document.createElement("span");
        recipeIngredients.innerText = `${recipe.extendedIngredients[i].name}, `;
        ingredients.appendChild(recipeIngredients);
      }

      const recipeURL = document.createElement("a");
      recipeURL.href = `${recipe.sourceUrl}`;
      recipeURL.target = `_blank`;
      recipeURL.innerText = `Click her for recipe!`;
      recipeCard.appendChild(recipeURL);

      const faveBtn = document.createElement("button");
      faveBtn.innerText = `Add to favorites`;
      recipeCard.appendChild(faveBtn);

      const calendarBtn = document.createElement("button");
      calendarBtn.innerText = "Add to calendar";
      recipeCard.appendChild(calendarBtn);
    });
  };
}

document
  .querySelector(".search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelector("#recipe-container").innerHTML = "";
    const searchValue = document.querySelector(".search-bar").value.trim();
    getRecipe(searchValue);
    document.querySelector(".search-bar").value = "";
  });
