async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#floatingInput").value.trim();

  const password = document.querySelector("#floatingPassword").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        username,

        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    // check the response status

    if (response.ok) {
      console.log("hi");
      document.location.replace("/");
    } else {
      alert(response.statusText);
      console.log(username, password);
    }
  }
}
document.querySelector(".login").addEventListener("submit", loginFormHandler);
