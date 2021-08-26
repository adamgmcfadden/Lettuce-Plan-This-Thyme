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
    fetch('/recipes', options);
    document.location.replace('/recipes');   
};

document.querySelector('.search-form').addEventListener('submit', getRecipe);

 