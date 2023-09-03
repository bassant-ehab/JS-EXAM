
/// <reference types="../@types/jquery" />

/*$('.open_Tab li').css('color' , 'white')*/


let ingredientsList = document.getElementById("ingredientsList")



$(document).ready(function () {
    // Toggle side bar
    $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
    $('.open_Tab .btn_open').on('click', function () {
        $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
    })
    getIngredients()
});

async function getIngredients() {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    let ingredients = await response.json()
    ingredients = ingredients.meals
    let length = Math.min(20, ingredients.length)
    for (i = 0; i < length; i++) {
        let ingredient = ingredients[i]
        addToHtml(ingredient.strIngredient, ingredient.strDescription)
    }
}

function addToHtml(ingredientName, ingredientDescription) {
    ingredientsList.innerHTML += `
    <div class="col-md-3 pt-4">
                    <div class="card text-center text-white" onclick="onClick('${ingredientName}')">
                        <span class="Ing_icon"><i class="fa-solid fa-drumstick-bite fa-2xl"
                                style="color: #ffffff;"></i></span>
                        <h2 class="text-white">${ingredientName}</h2>
                        <p class="line-clamp">${ingredientDescription}</p>
                    </div>
                </div>
    `
}

function onClick(ingredient) {
    console.log("jajajaj")
    localStorage.setItem('isFilter', "1");
    localStorage.setItem('filterParam', `i=${ingredient}`);
    location.href = "index.html"
}

