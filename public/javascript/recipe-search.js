async function getRecipe(event) {
    event.preventDefault();

    // const apiKey = "ca7027577b24470592ca8275b05b47b3";
    // const url = "https://api.spoonacular.com/recipes/complexSearch?query=";
    const searchValue = document.querySelector('.search-bar').value.trim();

    const response = await fetch('/recipes', {
        method: 'POST',
        body: JSON.stringify(searchValue)  
    });
    // const res = await fetch(url + searchValue + '&addRecipeInformation=true&addRecipeNutrition=true&number=20&apiKey=' + apiKey);
    // const data = await res.json();
    if (response.ok) {
        console.log('success');
        document.location.replace('/recipes');
      } else {
        alert(response.statusText);
      }
      

    // return(data);
}

document.querySelector('.search-form').addEventListener('submit', getRecipe);

