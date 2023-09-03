/// <reference types="../@types/jquery" />

/*$('.open_Tab li').css('color' , 'white')*/

let categoriesList = document.getElementById("categoriesList")


$(document).ready(function () {
    // Toggle side bar
    $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
    $('.open_Tab .btn_open').on('click', function () {
        $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
    })
    getCategories()
});

async function getCategories() {
  let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  let categories = await response.json()
  categories = categories.categories
  for (i = 0; i < categories.length; i++) {
      let category = categories[i]
      addToHtml(category.strCategory, category.strCategoryDescription, category.strCategoryThumb)
  }
}

function addToHtml(categoryName, categoryDescription, categoryImgURL) {
    categoriesList.innerHTML += `
    <div class="col-md-3 pt-4">
          <div class="card" onclick="onClick('${categoryName}')">
            <img src="${categoryImgURL}" class="card-img-top rounded-2 bg-transparent" alt="...">
            <div class="layer rounded-2">
              <h4>${categoryName}</h4>
              <p>${categoryDescription}</p>
            </div>
          </div>
        </div>
    `
}

function onClick(ingredient) {
  localStorage.setItem('isFilter', "1");
  localStorage.setItem('filterParam', `c=${ingredient}`);
  location.href = "index.html"
}

