// async function to handle login
async function loginFormHandler(event) {
  event.preventDefault();

  //get username and password from form
  const username = document.querySelector("#floatingInput").value.trim();
  const password = document.querySelector("#floatingPassword").value.trim();

  //if both are filled out (and validated?)
  if (username && password) {
    //use post route to login
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        username,

        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    //if successful, return to homepage
    if (response.ok) {
      // console.log("hi");
      document.location.replace("/");
    } else {
      alert(response.statusText);
      // console.log(username, password);
    }
  }
}
// event listener for submit button
document.querySelector(".login").addEventListener("submit", loginFormHandler);
