async function getRecipe(event) {
    event.preventDefault();

    const apiKey = "ca7027577b24470592ca8275b05b47b3";
    const url = "https://api.spoonacular.com/recipes/complexSearch?query=";
    // const searchValue = document.querySelector('.search-bar').value.trim();

    const res = await fetch(url + 'pasta' + '&apiKey=' + apiKey);
    const data = await res.json();
   
    console.log(data)
}

document.querySelector('.search-form').addEventListener('click', getRecipe);

