/// <reference types="../@types/jquery" />



let mealsList = document.getElementById("rowData")


$(document).ready(function () {
  // Toggle side bar
  $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
  $('.open_Tab .btn_open').on('click', function () {
    $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
  })

  // Input listeners
  $('#inputName').on('input', function () {
    var enteredValue = $(this).val();
    if(enteredValue.length > 0) $('#fInput').val("");
    searchWithNameOrLetter();
  });
  $('#fInput').on('input', function () {
    var enteredValue = $(this).val();
    if(enteredValue.length > 0) $('#inputName').val("");
    searchWithNameOrLetter();
  });
});


function searchWithNameOrLetter() {
  let name = $('#inputName').val()
  let letter = $('#fInput').val()
  if (name.length > 0) searchByName(name)
  else if (letter.length > 0) searchByLetter(letter)
  else emptyMealsList()
}

async function searchByName(name) {
  emptyMealsList()
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  let meals = await response.json()
  meals = meals.meals
  if (meals == null) return
  let length = Math.min(20, meals.length)
  for (i = 0; i < length; i++) {
    let meal = meals[i]
    addToHtml(meal.idMeal, meal.strMeal, meal.strMealThumb)
  }
}

async function searchByLetter(letter) {
  emptyMealsList()
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  let meals = await response.json()
  meals = meals.meals
  if (meals == null) return
  let length = Math.min(20, meals.length)
  for (i = 0; i < length; i++) {
    let meal = meals[i]
    addToHtml(meal.idMeal, meal.strMeal, meal.strMealThumb)
  }
}

function addToHtml(mealId, mealName, mealImgURL) {
  mealsList.innerHTML += `
    <div class="col-md-3 pt-4">
          <div class="card" onclick="onMealClicked('${mealId}')">
            <img src="${mealImgURL}" class="card-img-top rounded-2" alt="...">
            <div class="layer rounded-2">
              <div class="menu">
                <h6>${mealName}</h6>
              </div>
            </div>
          </div>
        </div>
    `
}

function emptyMealsList() {
  mealsList.innerHTML = ""
}

function onMealClicked(mealId) {
  localStorage.setItem('currentMealId', mealId);
  location.href = "meal.html"
}







