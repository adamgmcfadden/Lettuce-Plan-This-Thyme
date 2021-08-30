// my api
// const apiKey = "ca7027577b24470592ca8275b05b47b3"
// kt api
// const apiKey = "c0a5df971c94493aa3d688d219a0a28d"
const url = "https://api.spoonacular.com/recipes/complexSearch?query=";
const url2 =
  "&addRecipeInformation=true&addRecipeNutrition=true&number=20&fillIngredients=true&apiKey=ca7027577b24470592ca8275b05b47b3";

function getRecipe(searchValue) {
  // console.log(searchValue)
  fetch(url + searchValue + url2)
    .then((res) => res.json())
    .then((recipes) => showRecipes(recipes.results));

  showRecipes = (recipes) => {
    //  console.log(recipes);
    const recipesDiv = document.querySelector("#recipe-container");

    recipes.forEach((recipe) => {
      const recipeCard = document.createElement("div");
      recipeCard.className = `card recipe-card col-5 `;
      recipeCard.id = recipe;
      recipesDiv.append(recipeCard);

      const recipeTitle = document.createElement("h5");
      recipeTitle.className = "title";
      recipeTitle.innerText = `${recipe.title}`;
      recipeCard.appendChild(recipeTitle);

      const recipeImage = document.createElement("img");
      recipeImage.className = "recipeImage";
      recipeImage.src = `${recipe.image}`;
      recipeCard.appendChild(recipeImage);

      const recipeCals = document.createElement("li");
      recipeCals.innerText = `Calories: ${recipe.nutrition.nutrients[0].amount} per serving`;
      recipeCals.className = "list-group-item recipeCals";
      recipeCard.appendChild(recipeCals);

      const recipeServings = document.createElement("li");
      recipeServings.innerText = `Serves: ${recipe.servings}`;
      recipeServings.className = "list-group-item recipeServings";
      recipeCard.appendChild(recipeServings);

      const recipeTime = document.createElement("li");
      recipeTime.innerText = `Ready in: ${recipe.readyInMinutes} minutes`;
      recipeTime.className = "list-group-item recipeTime";
      recipeCard.appendChild(recipeTime);

      const ingredients = document.createElement("div");
      ingredients.className = "ingredients";
      ingredients.innerText = `Ingredients: `;
      recipeCard.append(ingredients);

      for (i = 0; i < `${recipe.extendedIngredients.length}`; i++) {
        const recipeIngredients = document.createElement("span");
        recipeIngredients.innerText = `${recipe.extendedIngredients[i].name}, `;
        recipeIngredients.className = "ingredientsLi"
        ingredients.appendChild(recipeIngredients);
      }

      const recipeURL = document.createElement("a");
      recipeURL.className = "recipeURL";
      recipeURL.href = `${recipe.sourceUrl}`;
      recipeURL.target = `_blank`;
      recipeURL.innerText = `Click here for recipe!`;
      recipeCard.appendChild(recipeURL);

      const faveBtn = document.createElement("button");
      faveBtn.innerText = `Add to favorites`;
      faveBtn.className = "addFav btn btn-outline-success";
      recipeCard.appendChild(faveBtn);

      const calendarBtn = document.createElement("button");
      calendarBtn.innerText = "Add to calendar";
      calendarBtn.className = "addCal btn btn-outline-success";
      recipeCard.appendChild(calendarBtn);
    });
    $(".addFav").on("click", function () {
      let title = $(this).siblings(".title").text();
      let nutrition = $(this).siblings(".recipeCals").text();
      let servingsa = $(this).siblings(".recipeServings").text();
      let servings = parseInt(servingsa.split(":")[1].trim());

      let cook_timea = $(this).siblings(".recipeTime").text();
      let cook_time = parseInt(cook_timea.split(":")[1].trim());
      let ingred = $(this).siblings(".ingredients").children(".ingredientsLi").text();
      let summary = $(this).siblings(".recipeURL").attr("href");
      let image = $(this).siblings(".recipeImage").attr("src");
      
      console.log(ingred);
      
      const response = fetch(`/api/recipes`, {
        method: "POST",
        body: JSON.stringify({
          title,
          summary,
          nutrition,
          servings,
          cook_time,
          image,
          ingred,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      //alert(title + " " + cals + " " + servings + " " + time + " " + url);
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
