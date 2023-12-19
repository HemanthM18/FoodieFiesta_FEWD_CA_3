// Function to handle the search button click
document.getElementById("button").addEventListener('click', () => {
  // Fetch the input value
  const inputValue = document.getElementById('inputName').value;
  const details = document.getElementById("details");
  details.innerHTML = "";

  // Fetch data based on the input value
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then(response => response.json())
    .then(data => {
      const items = document.getElementById("items");
      items.innerHTML = "";

      // Check if there are meals matching the search
      if (data.meals == null) {
        document.getElementById("msg").style.display = "block";
      } else {
        document.getElementById("msg").style.display = "none";
        // Loop through each meal and display as an item
        data.meals.forEach(meal => {
          const itemDiv = document.createElement("div");
          itemDiv.className = "m-2 singleItem";
          itemDiv.setAttribute('onclick', `details('${meal.idMeal}')`);
          const itemInfo = `
            <div class="card " style="width: 12rem;">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body text-center">
                    <h5 class="card-text">${meal.strMeal}</h5>
                </div>
            </div>
          `;
          itemDiv.innerHTML = itemInfo;
          items.appendChild(itemDiv);
        });
      }
    });
});

// Function to fetch and display meal details
function details(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(detail => {
      const meal = detail.meals[0];
      const details = document.getElementById("details");
      details.innerHTML = "";

      // Create a div to display meal details
      const detailsDiv = document.createElement("div");
      const detailsInfo = `
        <div class="card " style="width: 19rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body ">
                <h3 class="card-text">${meal.strMeal}</h3>
                <h6>Ingredients</h6>
                <ul>
                    <li>${meal.strArea}</li>
                    <li>${meal.strCategory}</li>
                    <li>${meal.strIngredient1}</li>
                    <li>${meal.strIngredient2}</li>
                    <li>${meal.strIngredient3}</li>
                    <li>${meal.strIngredient4}</li>
                    <li>${meal.strIngredient5}</li>
                </ul>
            </div>
        </div>
      `;
      detailsDiv.innerHTML = detailsInfo;
      details.appendChild(detailsDiv);
    });
}

// Function to handle the random meal button click
document.getElementById("randomButton").addEventListener('click', () => {
  // Fetch a random meal
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
      const randomMeal = data.meals[0];
      if (randomMeal) {
        // Display details of the random meal
        displayRandomMeal(randomMeal);
      } else {
        console.log('No meal found');
      }
    })
    .catch(error => {
      console.log('Error fetching random meal:', error);
    });
});

// Function to display details of a random meal
function displayRandomMeal(meal) {
  const details = document.getElementById("details");
  details.innerHTML = "";

  // Create div to display random meal details
  const detailsDiv = document.createElement("div");
  const detailsInfo = `
    <div class="card " style="width: 19rem;">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body ">
            <h3 class="card-text">${meal.strMeal}</h3>
            <h6>Ingredients</h6>
            <ul>
                <li>${meal.strArea}</li>
                <li>${meal.strCategory}</li>
                <li>${meal.strIngredient1}</li>
                <li>${meal.strIngredient2}</li>
                <li>${meal.strIngredient3}</li>
                <li>${meal.strIngredient4}</li>
                <li>${meal.strIngredient5}</li>
            </ul>
        </div>
    </div>
  `;
  detailsDiv.innerHTML = detailsInfo;
  details.appendChild(detailsDiv);
}