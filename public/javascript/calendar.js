// Setup the calendar with the current date
$(document).ready(function () {
  const data = fetch("/calendar/all")
    .then((res) => res.json())
    .then((recipes) => {
      const recipesData = recipes;
      meal_data["meals"] = recipesData;
      //  console.log(meal_data);
      var date = new Date();
      var today = date.getDate();
      // Set click handlers for DOM elements
      $(".right-button").click({ date: date }, next_year);
      $(".left-button").click({ date: date }, prev_year);
      $(".month").click({ date: date }, month_click);
      $("#add-button").click({ date: date }, new_meal);
      // Set current month as active
      $(".months-row").children().eq(date.getMonth()).addClass("active-month");
      init_calendar(date);
      var meals = check_meals(today, date.getMonth() + 1, date.getFullYear());
      show_meals(meals, months[date.getMonth()], today);
    });
});

// Initialize the calendar by appending the HTML dates
function init_calendar(date) {
  $(".tbody").empty();
  $(".meals-container").empty();
  var calendar_days = $(".tbody");
  var month = date.getMonth();
  var year = date.getFullYear();
  var day_count = days_in_month(month, year);
  var row = $("<tr class='table-row'></tr>");
  var today = date.getDate();
  // Set date to 1 to find the first day of the month
  date.setDate(1);
  var first_day = date.getDay();
  // 35+firstDay is the number of date elements to be added to the dates table
  // 35 is from (7 days in a week) * (up to 5 rows of dates in a month)
  for (var i = 0; i < 35 + first_day; i++) {
    // Since some of the elements will be blank,
    // need to calculate actual date from index
    var day = i - first_day + 1;
    // If it is a sunday, make a new row
    if (i % 7 === 0) {
      calendar_days.append(row);
      row = $("<tr class='table-row'></tr>");
    }
    // if current index isn't a day in this month, make it blank
    if (i < first_day || day > day_count) {
      var curr_date = $("<td class='table-date nil'>" + "</td>");
      row.append(curr_date);
    } else {
      var curr_date = $("<td class='table-date'>" + day + "</td>");
      var meals = check_meals(day, month + 1, year);
      if (today === day && $(".active-date").length === 0) {
        curr_date.addClass("active-date");
        show_meals(meals, months[month], day);
      }
      // If this date has any meals, style it with .meal-date
      if (meals.length !== 0) {
        curr_date.addClass("meal-date");
      }
      // Set onClick handler for clicking a date
      curr_date.click(
        { meals: meals, month: months[month], day: day },
        date_click
      );
      row.append(curr_date);
    }
  }
  // Append the last row and set the current year
  calendar_days.append(row);
  $(".year").text(year);
}

// Get the number of days in a given month/year
function days_in_month(month, year) {
  var monthStart = new Date(year, month, 1);
  var monthEnd = new Date(year, month + 1, 1);
  return (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
}

//  handler for when a date is clicked
function date_click(meal) {
  $(".meals-container").show(250);
  $("#dialog").hide(250);
  $(".active-date").removeClass("active-date");
  $(this).addClass("active-date");
  show_meals(meal.data.meals, meal.data.month, meal.data.day);
}

//  handler for when a month is clicked
function month_click(meal) {
  $(".meals-container").show(250);
  $("#dialog").hide(250);
  var date = meal.data.date;
  $(".active-month").removeClass("active-month");
  $(this).addClass("active-month");
  var new_month = $(".month").index(this);
  date.setMonth(new_month);
  init_calendar(date);
}

//  handler for when the year right-button is clicked
function next_year(meal) {
  $("#dialog").hide(250);
  var date = meal.data.date;
  var new_year = date.getFullYear() + 1;
  $("year").html(new_year);
  date.setFullYear(new_year);
  init_calendar(date);
}

//  handler for when the year left-button is clicked
function prev_year(meal) {
  $("#dialog").hide(250);
  var date = meal.data.date;
  var new_year = date.getFullYear() - 1;
  $("year").html(new_year);
  date.setFullYear(new_year);
  init_calendar(date);
}

//  handler for clicking the new meal button
function new_meal(meal) {
  // if a date isn't selected then do nothing
  if ($(".active-date").length === 0) return;
  // remove red error input on click
  $("input").click(function () {
    $(this).removeClass("error-input");
  });
  // empty inputs and hide meals
  $("#dialog input[type=text]").val("");
  $("#dialog input[type=number]").val("");
  $(".meals-container").hide(250);
  $("#dialog").show(250);
  //  handler for cancel button
  $("#cancel-button").click(function () {
    $("#name").removeClass("error-input");
    $("#count").removeClass("error-input");
    $("#dialog").hide(250);
    $(".meals-container").show(250);
  });
  //  handler for ok button
  $("#ok-button")
    .unbind()
    .click({ date: meal.data.date }, function () {
      var date = meal.data.date;
      let type = $("#type").val();
      var name = $("#name").val().trim();
      var time = $("#time").val();
      var day = parseInt($(".active-date").html());
      // Basic form validation
      if (name.length === 0) {
        $("#name").addClass("error-input");
      } else if (time.length == 0) {
        $("#time").addClass("error-input");
      } else {
        $("#dialog").hide(250);
        console.log("new meal");
        new_meal_json(name, time, type, date, day);
        date.setDate(day);
        init_calendar(date);
      }
    });
}

// Adds a json meal to meal_data
function new_meal_json(name, time, type, date, day) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let cook_time = time;
  let summary = "abc";
  //let day = day;
  let meal = type;
  let title = name;

  const newMeal = {
    meal: type,
    title: name,
    cook_time: time,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: day,
    summary: "abc",
  };
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
  meal_data["meals"].push(newMeal);
}

// Display all meals of the selected date in card views
function show_meals(meals, month, day) {
  // Clear the dates container
  $(".meals-container").empty();
  $(".meals-container").show(250);
  //console.log(meal_data["meals"]);
  // If there are no meals for this date, notify the user
  if (meals.length === 0) {
    var meal_card = $("<div class='meal-card'></div>");
    var meal_name = $(
      "<div class='meal-name'>There are no meals planned for " +
        month +
        " " +
        day +
        ".</div>"
    );

    $(meal_card).css({ "border-left": "10px solid #FF1744" });
    $(meal_card).append(meal_name);

    $(".meals-container").append(meal_card);
  } else {
    // Go through and add each meal as a card to the meals container
    for (var i = 0; i < meals.length; i++) {
      if (meals[i] !== "abc") {
        var meal_card = $(`<div class="card">
      <h5 class="card-header">${meals[i]["meal"]}</h5>
      <div class="card-body">
        <h5 id="${meals[i]["id"]}" class="card-title">${meals[i]["title"]}</h5>
        <p class="card-text">${meals[i]["cook_time"]}+ mins</p>
        <a href="${meals[i]["summary"]}" target="_blank" class="btn btn-primary">Click Here for Recipe</a>
        <button class='btn btn-primary destroy'>delete</button>
        </div>
    </div>`);
        $(".meals-container").append(meal_card);
      } else {
        var meal_card = $(`<div class="card">
    <h5 class="card-header">${meals[i]["meal"]}</h5>
    <div class="card-body">
      <h5 id="${meals[i]["id"]}" class="card-title">${meals[i]["title"]}</h5>
      <p class="card-text">${meals[i]["cook_time"]}+ mins</p>
      
      <button class='btn btn-primary destroy'>delete</button>
      </div>
  </div>`);
      }
    }
  }
  $(".destroy").on("click", function () {
    //alert("hi");
    let title = $(this).siblings(".card-title").text();
    //let title = temp.split(":")[1].trim();
    console.log(title);

    const response = fetch(`/calendar/${title}`, {
      method: "DELETE",
    });

    document.location.reload();
  });
}

// Checks if a specific date has any meals
function check_meals(day, month, year) {
  var meals = [];
  for (var i = 0; i < meal_data["meals"].length; i++) {
    var meal = meal_data["meals"][i];
    if (
      meal["day"] === day &&
      meal["month"] === month &&
      meal["year"] === year
    ) {
      meals.push(meal);
      //    console.log("found");
    }
  }
  return meals;
}

// Given data for meals in JSON format
var meal_data = {
  meals: [],
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
