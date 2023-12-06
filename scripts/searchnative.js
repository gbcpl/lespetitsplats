const algoSearch = document.getElementById("searchFood");
const listFood = document.getElementById("food-list");
const searchAppliance = document.getElementById("machines-list");
const listTools = document.getElementById("tools-list");

let arrayOfRecipes = [];

algoSearch.addEventListener("input", findFood);

function findFood() {
  
  if (algoSearch.value.length >= 3) {

    listRecipes.innerHTML = "";
    arrayOfRecipes = [];
  
    for (let i = 0; i < recipes.length; i++) {
    
      for (let j = 0; j < recipes[i].ingredients.length; j++) {
        

        if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(algoSearch.value.toLowerCase())) {

          arrayOfRecipes.push(recipes[i]);
          displayRecipes(arrayOfRecipes);
          console.log(arrayOfRecipes);
          break;          
        } 
      }

      if (recipes[i].description.toLowerCase().includes(algoSearch.value.toLowerCase())) {

        if (!arrayOfRecipes.includes(recipes[i])) {

          arrayOfRecipes.push(recipes[i]);
          displayRecipes(arrayOfRecipes);

        } else {
          console.log("déjà présent")
        }
      }

      if (recipes[i].name.toLowerCase().includes(algoSearch.value.toLowerCase())) {

        if (!arrayOfRecipes.includes(recipes[i])) {

          arrayOfRecipes.push(recipes[i]);
          displayRecipes(arrayOfRecipes);

        } else {
          console.log("déjà présent")
        }
      }
    } 

    if (arrayOfRecipes.length === 0) {
      listRecipes.innerHTML = `Aucune recette ne contient ‘${algoSearch.value}’ vous pouvez chercher «tarte aux pomme», «poisson», etc`;
    }
    
    numberOfRecipes();
  } 

  displayFood();
  displayMachines();
  displayTools();

  getTag();

  if (algoSearch.value.length === 0) {
    displayRecipes(recipes);
    number.innerHTML = recipes.length + " recettes";
    listFood.innerHTML = "";
    searchAppliance.innerHTML = "";
    listTools.innerHTML = "";
  }

}

function displayFood() {
  listFood.innerHTML = "";

  let arrayOfFood = [];

  for (let i = 0; i < arrayOfRecipes.length; i++) {

    for (let j = 0; j < arrayOfRecipes[i].ingredients.length; j++) {

      const currentFood = arrayOfRecipes[i].ingredients[j].ingredient.toLowerCase();

      if (!arrayOfFood.includes(currentFood)) {
        arrayOfFood.push(currentFood);
        console.log(arrayOfFood);
        const ingredient = document.createElement("p");
        ingredient.innerHTML = currentFood;
        ingredient.classList.add("results-list");
        listFood.appendChild(ingredient);
      }
    }
  }
}

function displayMachines() {
  searchAppliance.innerHTML = "";

  let arrayOfMachines = [];

  for (let i = 0; i < arrayOfRecipes.length; i++) {
    const currentAppliance = arrayOfRecipes[i].appliance.toLowerCase();
    if (!arrayOfMachines.includes(currentAppliance)) {
      arrayOfMachines.push(currentAppliance);
      const appliance = document.createElement("p");
      appliance.innerHTML = currentAppliance;
      appliance.classList.add("results-list");
      searchAppliance.appendChild(appliance);
    }
  }
}

function displayTools() {
  listTools.innerHTML = "";

  let arrayOfTools = [];

  for (let i = 0; i < arrayOfRecipes.length; i++) {

    for (let j = 0; j < arrayOfRecipes[i].ustensils.length; j++) {

      const currentTools = arrayOfRecipes[i].ustensils[j].toLowerCase();

      if (!arrayOfTools.includes(currentTools)) {
        arrayOfTools.push(currentTools);
        console.log(arrayOfTools);
        const ustensil = document.createElement("p");
        ustensil.innerHTML = currentTools;
        ustensil.classList.add("results-list");
        listTools.appendChild(ustensil);
      }
    }
  }
}

function numberOfRecipes() {

  if (arrayOfRecipes.length <= 1) {
    number.innerHTML = arrayOfRecipes.length + " recette";
  } else {
    number.innerHTML = arrayOfRecipes.length + " recettes";
  }
}

function clickableTag() {
  
}

function getTag() {
  const list = document.querySelectorAll(".results-list");
  const tags = document.getElementById("list-of-tags");
  let clickableList = false;

  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener("click", () => {
      if (clickableList === false) {
        list[i].style.backgroundColor = "rgba(255, 209, 91, 1)";
        clickableList = true;

        const tag = document.createElement("p");
        tag.innerHTML = list[i].textContent;
        tag.classList.add("tag");
        tags.appendChild(tag);

        let filteredRecipes = [];

        for (let j = 0; j < arrayOfRecipes.length; j++) {
          let containsIngredient = false;

          for (let h = 0; h < arrayOfRecipes[j].ingredients.length; h++) {
            if (arrayOfRecipes[j].ingredients[h].ingredient.toLowerCase().includes(list[i].textContent.toLowerCase())) {
              containsIngredient = true;
              break;
            }
          }

          if (containsIngredient) {
            filteredRecipes.push(arrayOfRecipes[j]);
          }
        }

        displayRecipes(filteredRecipes);

      } else {
        list[i].style.backgroundColor = null;
        clickableList = false;

        tags.innerHTML = "";
        displayRecipes(arrayOfRecipes);
      }
    });
  }
}