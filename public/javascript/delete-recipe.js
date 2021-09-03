$(".delete-post-btn").on("click", function () {
  let title = $(this).siblings(".title").text();
  console.log(title);

  const response = fetch(`/api/recipes/${title}`, {
    method: "DELETE",
  });

  document.location.reload();
});
$(".addCal").on("click", function () {
  let id = $(this).siblings(".title").attr("id");

  $(`#calInfo${id}`).show();
  $(function () {
    $(`#datepicker${id}`).datepicker({
      dateFormat: "dd-mm-yy",
    });
  });
});

$(".date").on("click", function () {
  let id = $(this).parent().siblings(".title").attr("id");
  //console.log(z);
  //   let id = z.split(" ").join("");
  let currentDate = $(`#datepicker${id}`).datepicker("getDate");
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  let meal = $(`#meal${id}`).val();
  let summary = $(this).parent().siblings(".card-link").attr("href");
  let title = $(this).parent().siblings(".title").text();
  let cook_timea = $(this).parent().siblings(".time").text();
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
});
