//function for signup button
async function signupFormHandler(event) {
  event.preventDefault();

  //get username, email and password from form
  const username = document.querySelector("#floatingInput").value.trim();
  const email = document.querySelector("#floatingEmail").value.trim();
  const password = document.querySelector("#floatingPassword").value.trim();

  //if all three filled
  if (username && email && password) {
    //create user using user post API
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    //if successful, return to homepage
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
      //  console.log(username, email, password);
    }
  }
}

//event listener for signup button
document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
