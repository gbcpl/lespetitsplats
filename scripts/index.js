const number = document.getElementById("number-of-recipes");

number.innerHTML = recipes.length + " recettes";

const listRecipes = document.getElementById("recipes-container");

// Creating recipes cards from recipes array


function displayRecipes(array) {
  listRecipes.innerHTML = "";

  array.forEach((recipe) => {
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

displayRecipes(recipes);

// Using food button

const food = document.getElementById("food");
const searchFood = document.getElementById("search-food");

foodOpen = false;

function openFood() {
  if (!foodOpen) {
    searchFood.style.display = "block";
    searchMachines.style.display = "none";
    searchTools.style.display = "none"
    foodOpen = true;
    machinesOpen = false;
    toolsOpen = false;
  } else {
    searchFood.style.display = "none";
    foodOpen = false;
  }
}

food.addEventListener("click", openFood);

// Using machines button

const machines = document.getElementById("machines");
const searchMachines = document.getElementById("search-machines");

machinesOpen = false;

function openMachines() {
  if (!machinesOpen) {
    searchMachines.style.display = "block";
    searchFood.style.display = "none";
    searchTools.style.display = "none"
    machinesOpen = true;
    foodOpen = false;
    toolsOpen = false;
  } else {
    searchMachines.style.display = "none";
    machinesOpen = false;
  }
}

machines.addEventListener("click", openMachines);

// Using tools button;

const tools = document.getElementById("tools");
const searchTools = document.getElementById("search-tools");
toolsOpen = false;

function openTools() {
  if (!toolsOpen) {
    searchTools.style.display = "block";
    searchFood.style.display = "none";
    searchMachines.style.display = "none";
    toolsOpen = true;
    foodOpen = false;
    machinesOpen = false;
  } else {
    searchTools.style.display = "none";
    toolsOpen = false;
  }
}

tools.addEventListener("click", openTools);

