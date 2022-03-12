// Enter button work when you search any food
const searchBtn = document.getElementById("search-btn");

document.getElementById("inputField").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
})


const searchFood = async () => {
    const fieldInput = document.getElementById("inputField");
    const fieldText = fieldInput.value;
    fieldInput.value = "";

    // fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${fieldText}`)
    //     .then(response => response.json())
    //     .then(data => displayFood(data.meals))



    if (fieldText == "") {
        const searchResult = document.getElementById("search-result");
        searchResult.textContent = "";
        const notFound = document.getElementById("not-found");
        const h2 = document.createElement("h2");
        h2.classList.add("text-center")
        h2.innerText = "Search field empty!"
        notFound.appendChild(h2);
    }
    else {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${fieldText}`);
        const data = await res.json();
        displayFood(data.meals)
    }
}


const displayFood = meals => {

    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
    const notFound = document.getElementById("not-found");
    notFound.textContent = "";
    if (meals == null) {

        const h2 = document.createElement("h2");
        h2.classList.add("text-center")
        h2.innerText = "No found result!"
        notFound.appendChild(h2);
    }

    else {

        meals?.forEach(meal => {
            const div = document.createElement("div");
            div.classList.add("col");

            div.innerHTML = `
        
        <div onclick = "loadDetails(${meal.idMeal})" class="card">
                    <img height=300px; src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                    </div>
                </div>
        
        `;
            searchResult.appendChild(div);
        })
    }

}

const loadDetails = productId => {
    console.log(productId);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${productId}`)
        .then(response => response.json())
        .then(data => displayDetails(data.meals[0]))
}

const displayDetails = product => {
    const productDetails = document.getElementById("product-details");
    productDetails.textContent = "";
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
        <img src="${product.strMealThumb}" class="card-img-top mx-auto w-50" alt="...">
        <div class="card-body">
            <h5 class="card-title">${product.strMeal}</h5>
            <p class="card-text">${product.strInstructions.slice(0, 200)}</p>
            <a href="${product.strSource}" class="btn btn-primary">Go for buy</a>
        </div>
    `;

    productDetails.appendChild(div);
}

