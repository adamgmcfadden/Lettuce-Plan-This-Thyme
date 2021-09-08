// async function to handle sending confirmation email
async function emailHandler(event) {
  event.preventDefault();

  // value: id=floating email as email and trim it
  const email = document.querySelector("#floatingEmail").value.trim();

  // send email to user
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

// event listener for signup button
document.querySelector(".signup-form").addEventListener("submit", emailHandler);
