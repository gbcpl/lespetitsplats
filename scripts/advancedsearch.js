const searchbarFood = document.getElementById("searchbar-food");

if (mainSearchFirst === false && secondSearchFirst === false) {
  searchbarFood.addEventListener("input", findFoodFilter);
  secondSearchFirst = true;
} else if (mainSearchFirst === true && secondSearchFirst === false) {
  searchbarFood.addEventListener("input", mainScenarioFoodFilter);
}

function findFoodFilter() {

  arrayOfRecipes = [];

  if (searchbarFood.value.length >= 3) {

    for (let i = 0; i < recipes.length; i++) {
    
      for (let j = 0; j < recipes[i].ingredients.length; j++) {

        if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(searchbarFood.value.toLowerCase())) {

          arrayOfRecipes.push(recipes[i]);
          displayRecipes(arrayOfRecipes);
          console.log(arrayOfRecipes);
          break;          
        }
      } 
    } 
  }

  displayFood();
  displayMachines();
  displayTools();
  numberOfRecipes(arrayOfRecipes);

  getTag();
  
  if (searchbarFood.value.length === 0) {
    displayRecipes(recipes);
    number.innerHTML = recipes.length + " recettes";
    listFood.innerHTML = "";
    searchAppliance.innerHTML = "";
    listTools.innerHTML = "";
    tags.innerHTML = "";
    secondSearchFirst = false;
  }
}


const searchbarMachines = document.getElementById("searchbar-machines");
searchbarMachines.addEventListener("input", findMachineFilter);

function findMachineFilter() {

  arrayOfRecipes = [];

  if (searchbarMachines.value.length >= 3) {

    for (let i = 0; i < recipes.length; i++) {
    
      if (recipes[i].appliance.toLowerCase().includes(searchbarMachines.value.toLowerCase())) {

        if (!arrayOfRecipes.includes(recipes[i])) {

          arrayOfRecipes.push(recipes[i]);
          displayRecipes(arrayOfRecipes);

        } 
      }
    } 
  }

  displayFood();
  displayMachines();
  displayTools();
  numberOfRecipes(arrayOfRecipes);

  getTag();
}


const searchbarTools = document.getElementById("searchbar-tools");
searchbarTools.addEventListener("input", findUstensilsFilter);


function findUstensilsFilter() {

  arrayOfRecipes = [];

  if (searchbarTools.value.length >= 3) {

    for (let i = 0; i < recipes.length; i++) {
    
      for (let j = 0; j < recipes[i].ustensils.length; j++) {

        if (recipes[i].ustensils[j].toLowerCase().includes(searchbarTools.value.toLowerCase())) {

          arrayOfRecipes.push(recipes[i]);
          displayRecipes(arrayOfRecipes);
          console.log(arrayOfRecipes);
          break;          
        }
      } 
    } 
  }

  displayFood();
  displayMachines();
  displayTools();
  numberOfRecipes(arrayOfRecipes);

  getTag();
}