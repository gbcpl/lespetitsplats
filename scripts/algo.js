const algoSearch = document.getElementById("searchFood");
let arrayOfRecipes = [];

algoSearch.addEventListener("input", findFood);

function findFood() {
  listRecipes.innerHTML = "";
  arrayOfRecipes = [];
  for (let i = 0; i < recipes.length; i++) {

    if (algoSearch.value.length >= 3) {

      for (let j = 0; j < recipes[i].ingredients.length; j++) {
        

        if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(algoSearch.value)) {

          arrayOfRecipes.push(recipes[i]);
          console.log(arrayOfRecipes);
          break;          
        } 
      }
      } 
    }
  displayRelevantRecipes()
}

function displayRelevantRecipes() {
  listRecipes.innerHTML = "";
  arrayOfRecipes.forEach((recipe) => {
    const photo = `assets/images/${recipe.image}`
    const divRecipes = document.createElement("div");
    const img = document.createElement("img");
    const recipeTitle = document.createElement("h2");
    const recipeRecette = document.createElement("h3");
    const description = document.createElement("p");
    const recipeFood = document.createElement("h3");
    const divFoods = document.createElement("div");
    const time = document.createElement("p");
   
    img.setAttribute("src", photo);
    divRecipes.setAttribute("class", "recipes");
    recipeTitle.innerHTML = recipe.name;
    recipeRecette.setAttribute("class", "titles")
    recipeRecette.innerHTML = "RECETTE";
    description.setAttribute("class", "description")
    description.innerHTML = recipe.description;
    recipeFood.innerHTML = "INGREDIENTS";
    recipeFood.setAttribute("class", "titles");
    divFoods.setAttribute("class", "foods");
    time.innerHTML = recipe.time + "min";
    time.setAttribute("class", "time");
    numberOfFood = recipe.ingredients;
  
    numberOfFood.forEach((food) => {
  
      const divFood = document.createElement("div");
      const listOfFood = document.createElement("p");
      const listOfNumber = document.createElement("p");
  
      listOfFood.setAttribute("class", "titleFood")
      listOfNumber.setAttribute("class", "numberFood");
      listOfFood.innerHTML = food.ingredient;
      if (food.unit) {
        listOfNumber.innerHTML = food.quantity + food.unit;
      } else {
        listOfNumber.innerHTML = food.quantity
      }
      
      divFood.setAttribute("class", "food");
      divFood.appendChild(listOfFood);
      if (food.quantity) {
        divFood.appendChild(listOfNumber);
      }
      divFoods.appendChild(divFood);
    })
  
    listRecipes.appendChild(divRecipes);
    divRecipes.appendChild(img);
    divRecipes.appendChild(recipeTitle);
    divRecipes.appendChild(recipeRecette);
    divRecipes.appendChild(description);
    divRecipes.appendChild(recipeFood);
    divRecipes.appendChild(divFoods);
    divRecipes.appendChild(time)
  
  })
}
