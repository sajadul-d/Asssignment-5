'use strict';
//find id with getelement by id
const dataContainer = document.getElementById('foods');
const findButton = document.getElementById('searchBtn');
const message = document.getElementById('messege');

 findButton.addEventListener('click', function () {
    const information = document.getElementById('keyword').value;
    dataContainer.innerHTML = '';
    if (information === '') {
        message.style.display = 'block';
    } 
    else {
        getFood(information);
        message.style.display = 'none';
    }
});

const displayDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderFoodInfo(data.meals[0]);
            console.log(data.meals[0]);
        });
};

const renderFoodInfo = food => {
    const foodDetailsDiv = document.getElementById('foodsDetails');

    foodDetailsDiv.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
    <h4>${food.strMeal}</h4>
    
    <h5 class="pt-3 pb-2"><i class="icon-fire icons"></i> Ingredients</h5>
    <ul class="list-unstyled mb-0">
        <li><i class="icon-check icons"></i>${food.strMeasure1}, ${food.strIngredient1}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure2}, ${food.strIngredient2}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure3}, ${food.strIngredient3}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure4}, ${food.strIngredient4}</li>
    </ul>
    `;

};

function getFood(mealId) {
    //Added Api from themealdb.com
    const apiLink = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`;

    fetch(apiLink)
        .then(res => res.json())
        .then(data => {
            displayFoods(data.meals);
        });
//display show
    const displayFoods = foods => {
        const foodsDiv = document.getElementById('foods');
        if (foods != 0 && foods!=null) {
            foods.map(food => {
                const foodDiv = document.createElement('div');
                foodDiv.className = 'col-md-3';
                const foodInfo = `
                        <div onclick="displayDetails('${food.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="">
                        <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                        </div>
                    `;
                foodDiv.innerHTML = foodInfo;
                foodsDiv.appendChild(foodDiv);
            });
        } 

        //messege to the user
        else if(foods==null && foods==0)
        {
          alert("Soory!Enter the meals you like");
        }
        else {
          message.style.display = 'block';
        }
    };
}

//Thank you for checking my code
