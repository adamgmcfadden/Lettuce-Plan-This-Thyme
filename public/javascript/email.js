async function emailHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#floatingEmail").value.trim();

  const response = await fetch("/send", {
    method: "post",
    body: JSON.stringify({
      email,
    }),
    headers: { "Content-Type": "application/json" },
  });
  // console.log(response)
}
//   return fetch("/send", options)
//     .then(res => res.json())
//     .then(res => {
//       console.log("here is the response: ", res);
//     })
//     .catch(err => {
//       console.error("here is the error: ", err);
//     });
//   }
document.querySelector(".signup-form").addEventListener("submit", emailHandler);
