/// <reference types="../@types/jquery" />


let mealName = document.getElementById("meal-name")
let mealImage = document.getElementById("meal-img")
let mealInstructions = document.getElementById("meal-instructions")
let mealArea = document.getElementById("meal-area")
let mealCategory = document.getElementById("meal-category")
let ingredientsList = document.getElementById("ingredientsList")
let tagsList = document.getElementById("tagsList")
let btnSource = document.getElementById("btnSource")
let btnYoutube = document.getElementById("btnYoutube")


$(document).ready(function () {
  // Toggle side bar
  $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
  $('.open_Tab .btn_open').on('click', function () {
    $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
  })
  let currentMealId = localStorage.getItem('currentMealId');
  getMealData(currentMealId)
});

async function getMealData(mealId) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  let meal = await response.json()
  meal = meal.meals[0]
  addToHtml(meal.strMeal, meal.strMealThumb, meal.strInstructions, meal.strArea, meal.strCategory, meal.strSource, meal.strYoutube)
  for (i = 1; i <= 20; i++) {
    let ingredientI = meal[`strIngredient${i}`];
    let measureI = meal[`strMeasure${i}`]
    if (ingredientI == null || ingredientI == "" || measureI == null || measureI == "")
      continue
    addIngredients(ingredientI, measureI)
  }
  let tags = meal.strTags
  if (tags != null && tags != "") {
    tags = tags.split(",")
    for (i = 0; i < tags.length; i++) {
      addTags(tags[i])
    }
  }
}

function addToHtml(name, image, instructions, area, category, srcLink, youtubeLink) {
  mealName.innerHTML = name
  mealImage.src = image
  mealInstructions.innerHTML = instructions
  mealArea.innerHTML = "Area : " + area
  mealCategory.innerHTML = "Category : " + category
  btnSource.href = srcLink
  btnYoutube.href = youtubeLink
}

function addIngredients(ingredientName, ingredientMeasure) {
  ingredientsList.innerHTML += `
    <span class="rounded-2 alert alert-info p-1 m-2">${ingredientMeasure} ${ingredientName}</span>
    `
}

function addTags(tagName) {
  tagsList.innerHTML += `
    <span class="rounded-2 alert alert-danger p-1 m-2">${tagName}</span>
    `
}

