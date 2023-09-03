/// <reference types="../@types/jquery" />

let mealsList = document.getElementById("rowData")

//open and close side nav
$(document).ready(function () {
  // Toggle side bar
  $('.open_Tab .open_box').toggle()
  $('.open_Tab .btn_open').on('click', function () {
    $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
  })
  let isFilter = localStorage.getItem('isFilter');
  if (isFilter == "1") {
    localStorage.setItem('isFilter', "0");
    let filterParam = localStorage.getItem('filterParam');
    filterMeals(filterParam)
  }
  else fetchMeals()
});

async function fetchMeals() {
  let response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
  let meals = await response.json()
  meals = meals.meals
  let length = Math.min(20, meals.length)
  for (i = 0; i < length; i++) {
    let meal = meals[i]
    addToHtml(meal.idMeal, meal.strMeal, meal.strMealThumb)
  }
}

async function filterMeals(filterParam) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${filterParam}`)
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
                  <h4>${mealName}</h4>
                </div>
              </div>
            </div>
          </div>
      `
}

function onMealClicked(mealId) {
  localStorage.setItem('currentMealId', mealId);
  location.href = "meal.html"
}

