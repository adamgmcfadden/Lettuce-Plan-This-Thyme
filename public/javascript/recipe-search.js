// my api
<<<<<<< Updated upstream

=======
const api_key = process.env.APIKEY1;
>>>>>>> Stashed changes
const url = "https://api.spoonacular.com/recipes/complexSearch?query=";
const url2 =
  "&addRecipeInformation=true&addRecipeNutrition=true&number=20&fillIngredients=true&apiKey" +
  api_key;

function getRecipe(searchValue) {
  // console.log(searchValue)
  fetch(url + searchValue + url2)
    .then((res) => res.json())
    .then((recipes) => showRecipes(recipes.results));

  showRecipes = (recipes) => {
    //  console.log(recipes);

    const heroImage = document.querySelector(".hero-image");
    heroImage.style.background = "none";

    const recipesDiv = document.querySelector("#recipe-container");

    recipes.forEach((recipe) => {
      let z = `${recipe.title}`;
      let id = z.split(" ").join("");
      const recipeCard = document.createElement("div");
      recipeCard.className = `card recipe-card col-5 `;

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
        recipeIngredients.className = "ingredientsLi";
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

      const calendarInfo = document.createElement("div");
      calendarInfo.className = "calInfo";
      calendarInfo.id = `calInfo${id}`;
      calendarInfo.innerHTML = `
      <p class="p-style"> Meal type 
        <select name="meal" id="meal${id}">
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
        </select>
      </p>
      <p>Date: <input type="text" id="datepicker${id}" /></p>
      <button class="date btn btn-outline-success">Select</button>
      `;
      calendarInfo.style.display = "none";
      recipeCard.appendChild(calendarInfo);
      //console.log("z " + id);
    });
    $(".addFav").on("click", function () {
      let title = $(this).siblings(".title").text();
      let nutrition = $(this).siblings(".recipeCals").text();
      let servingsa = $(this).siblings(".recipeServings").text();
      let servings = parseInt(servingsa.split(":")[1].trim());

      let cook_timea = $(this).siblings(".recipeTime").text();
      let cook_time = parseInt(cook_timea.split(":")[1].trim());
      let ingred = $(this)
        .siblings(".ingredients")
        .children(".ingredientsLi")
        .text();
      let summary = $(this).siblings(".recipeURL").attr("href");
      let image = $(this).siblings(".recipeImage").attr("src");

      // console.log(ingred);

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
    $(".addCal").on("click", function () {
      let z = $(this).siblings(".title").text();
      let id = z.split(" ").join("");
      //console.log("hi");
      $(`#calInfo${id}`).show();
      $(function () {
        $(`#datepicker${id}`).datepicker({
          dateFormat: "dd-mm-yy",
        });
      });
    });

    $(".date").on("click", function () {
      let z = $(this).parent().siblings(".title").text();
      let id = z.split(" ").join("");
      let currentDate = $(`#datepicker${id}`).datepicker("getDate");
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      let day = currentDate.getDate();
      let meal = $(`#meal${id}`).val();
      let summary = $(this).parent().siblings(".recipeURL").attr("href");
      let title = $(this).parent().siblings(".title").text();
      let cook_timea = $(this).parent().siblings(".recipeTime").text();
      let cook_time = parseInt(cook_timea.split(":")[1].trim());

      const response = fetch(`/calendar`, {
        method: "POST",
        body: JSON.stringify({
          year,
          month,
          day,
          meal,
          title,
          cook_time,
          summary,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      $(`#calInfo${id}`).hide();
    });
  };
}

document
  .querySelector(".search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelector("#recipe-container").innerHTML = "";
    const searchValue = document.querySelector(".search-bar").value.trim();
    if (searchValue.length <= 0) {
      return false;
    }
    getRecipe(searchValue);
    document.querySelector(".search-bar").value = "";
  });
