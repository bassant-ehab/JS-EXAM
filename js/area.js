/// <reference types="../@types/jquery" />




let areasList = document.getElementById("areaData")


$(document).ready(function () {
    // Toggle side bar
    $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
    $('.open_Tab .btn_open').on('click', function () {
        $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
    })
    getMealData()
});

async function getMealData() {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    let areas = await response.json()
    areas = areas.meals
    for (i = 0; i < areas.length; i++) {
        let area = areas[i]
        addToHtml(area.strArea)
    }
}


function addToHtml(areaName) {
    areasList.innerHTML += `
   
        <div class="col-md-3">
                        <div class="area rounded-2 text-center cursor-pointer text-white" onclick="onClick('${areaName}')">
                        <i class="fa-solid fa-house-laptop fa-2xl" style="color: #ffffff;"></i>
                            <h3>${areaName}</h3>

                        </div>
                    </div>
    `
}

function onClick(area) {
    localStorage.setItem('isFilter', "1");
    localStorage.setItem('filterParam', `a=${area}`);
    location.href = "index.html"
}










