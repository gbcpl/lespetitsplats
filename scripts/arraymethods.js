import { displayRecipes, openFood, openMachines, openTools, listRecipes, number, foodOpen, machinesOpen, toolsOpen } from "./index.js";
import { recipes } from "../data/recipes.js";

const algoSearch = document.getElementById("searchFood");
const listFood = document.getElementById("food-list");
const searchAppliance = document.getElementById("machines-list");
const listTools = document.getElementById("tools-list");
const tags = document.getElementById("list-of-tags");

let arrayOfRecipes = [];
let mainSearchFirst;

algoSearch.addEventListener("input", findFood);

// main function for the main search input
function findFood() {

  mainSearchFirst = true;

    if (algoSearch.value.length >= 3) {

      listRecipes.innerHTML = "";

      // filter returns true or false and adds the recipe if true, 
      // so first it checks if the input value is in ingredient, 
      // then if not, in the description, and if not, in the name

      arrayOfRecipes = recipes.filter(recipe => 
        recipe.ingredients.some(ingredient => 
          ingredient.ingredient.toLowerCase().includes(algoSearch.value.toLowerCase())) ||
        recipe.description.toLowerCase().includes(algoSearch.value.toLowerCase()) ||
        recipe.name.toLowerCase().includes(algoSearch.value.toLowerCase()));
            
      displayRecipes(arrayOfRecipes);

      if (arrayOfRecipes.length === 0) {
        listRecipes.innerHTML = `Aucune recette ne contient ‘${algoSearch.value}’ vous pouvez chercher «tarte aux pomme», «poisson», etc`;
      }
      
      numberOfRecipes(arrayOfRecipes);
    } 

    // display all the ingredients, appliances, and tools, of arrayOfRecipes

    displayFood(arrayOfRecipes);
    displayMachines(arrayOfRecipes);
    displayTools(arrayOfRecipes);


    // used to add / delete one or multiple tags
    getTag(arrayOfRecipes);

    // we reset the result field and display all the recipes again 
    if (algoSearch.value.length === 0) {
      displayRecipes(recipes);
      number.innerHTML = recipes.length + " recettes";
      listFood.innerHTML = "";
      searchAppliance.innerHTML = "";
      listTools.innerHTML = "";
      tags.innerHTML = "";
      mainSearchFirst = false;
      displayFood(recipes);
      displayMachines(recipes);
      displayTools(recipes);
      getTag(recipes);
    }  
}

// par défaut, afficher tous les tags 
function displayFood(array) {
  listFood.innerHTML = "";

  let arrayOfFood = [];
  
  array.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      const currentFood = ingredient.ingredient.toLowerCase();
      if (!arrayOfFood.includes(currentFood)) {
        arrayOfFood.push(currentFood);
        const ingredientList = document.createElement("p");
        ingredientList.innerHTML = currentFood;
        ingredientList.classList.add("results-list");
        listFood.appendChild(ingredientList);
      }
    });
  });
}

function displayMachines(array) {
  searchAppliance.innerHTML = "";

  let arrayOfMachines = [];

  array.forEach(recipe => {
    const currentAppliance = recipe.appliance.toLowerCase();
      if (!arrayOfMachines.includes(currentAppliance)) {
      arrayOfMachines.push(currentAppliance);
      const appliance = document.createElement("p");
      appliance.innerHTML = currentAppliance;
      appliance.classList.add("results-list");
      searchAppliance.appendChild(appliance);
    }
  });
}

function displayTools(array) {
  listTools.innerHTML = "";

  let arrayOfTools = [];

  array.forEach(recipe => {
    recipe.ustensils.forEach(ustensil => {
      const currentTools = ustensil.toLowerCase();
      if (!arrayOfTools.includes(currentTools)) {
        arrayOfTools.push(currentTools);
        const ustensil = document.createElement("p");
        ustensil.innerHTML = currentTools;
        ustensil.classList.add("results-list");
        listTools.appendChild(ustensil);
      }
    });
  });
}

displayFood(recipes);
displayMachines(recipes);
displayTools(recipes);

function numberOfRecipes(array) {

  if (array.length <= 1) {
    number.innerHTML = array.length + " recette";
  } else {
    number.innerHTML = array.length + " recettes";
  }
}

function getTag(array) {
  const list = document.querySelectorAll(".results-list");
  const tags = document.getElementById("list-of-tags");
  let arrayOfTags = [];

  
  list.forEach(listTag => {
    listTag.addEventListener("click", function(event) {

      let clickableList = event.target.style.backgroundColor === "rgb(255, 209, 91)";
      const tagText = listTag.textContent.toLowerCase();

      if (!clickableList) {
        listTag.style.backgroundColor = "rgb(255, 209, 91)";
        clickableList = true;

        if (foodOpen) {
          openFood();
        } else if (machinesOpen) {
          openMachines();
        } else if (toolsOpen) {
          openTools();
        }
        
        if (!arrayOfTags.includes(tagText)) {
          arrayOfTags.push(tagText);
          const div = document.createElement("div");
          const tag = document.createElement("p");
          const cross = document.createElement("p");
          // eslint-disable-next-line quotes
          cross.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
          tag.innerHTML = tagText;
          tag.classList.add("tag");
          div.classList.add("div-tags");
          div.appendChild(tag);
          div.appendChild(cross);
          tags.appendChild(div);

          updateRecipes(arrayOfTags);
        }
      } else if (clickableList) {

        listTag.style.backgroundColor = null;
        clickableList = false;

        const index = arrayOfTags.indexOf(tagText);
        if (index !== -1) {
          arrayOfTags.splice(index, 1);
          tags.removeChild(tags.childNodes[index]);
          updateRecipes(arrayOfTags);
        }
      }
      
      const crosses = document.querySelectorAll(".fa-xmark");
      const cross = crosses[crosses.length - 1];

        cross.addEventListener("click", function(event) {
          event.target.parentNode.parentNode.remove();
          listTag.style.backgroundColor = null;
          clickableList = false;
          console.log("test");
          const tagText = listTag.textContent.toLowerCase();
          const index = arrayOfTags.indexOf(tagText);
          if (index !== -1) {
            arrayOfTags.splice(index, 1);
            console.log(arrayOfTags);
            updateRecipes(arrayOfTags);
          }

        });
    });
  });
  
  // verify if tag clicked is present in recipe, if true, filter it in filteredRecipes, then display it
  // this function is called each time the user add or delete a tag
  function updateRecipes(tags) {
    const filteredRecipes = array.filter(recipe => {
      return tags.every(tag => {
        return (
          recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag)) 
          || recipe.appliance.toLowerCase().includes(tag) 
          || recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag))
        );
      });
    });
  
    console.log(filteredRecipes);
    displayRecipes(filteredRecipes);
    numberOfRecipes(filteredRecipes);
  }
}

getTag(recipes);

const searchbarFood = document.getElementById("searchbar-food");
searchbarFood.addEventListener("input", findFoodFilter);

function findFoodFilter() {

  let arrayOfIngredients = []; 

  if (mainSearchFirst) {

    let newRecipes = [];

    newRecipes = arrayOfRecipes.filter(recipe => 
      recipe.ingredients.some(ingredient => 
        ingredient.ingredient.toLowerCase().includes(searchbarFood.value.toLowerCase())));
    getTag(newRecipes);
    displayRecipes(newRecipes);
    numberOfRecipes(newRecipes);

    if (searchbarFood.value.length === 0) {
      displayRecipes(arrayOfRecipes);
      numberOfRecipes(arrayOfRecipes);
      displayFood(arrayOfRecipes);
      displayMachines(arrayOfRecipes);
      displayTools(arrayOfRecipes);
    }

  } else if (!mainSearchFirst) {

    let arrayOfRecipes = [];
  
    arrayOfRecipes = recipes.filter(recipe =>
      recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(searchbarFood.value.toLowerCase())
      )
    );

    arrayOfRecipes.forEach(recipe =>
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.ingredient.toLowerCase().includes(searchbarFood.value.toLowerCase())) {
          arrayOfIngredients.push(ingredient.ingredient.toLowerCase());
        }
      })
      
    );
    numberOfRecipes(arrayOfRecipes);
    displayRecipes(arrayOfRecipes);  
    
    
    listFood.innerHTML = "";
    let ingredientsList = [];

    arrayOfIngredients.forEach(ingredient => {

      const currentFood = ingredient.toLowerCase();
        
      if (!ingredientsList.includes(currentFood)) {
          ingredientsList.push(currentFood);
          console.log(ingredientsList);
          const ingredientList = document.createElement("p");
          ingredientList.innerHTML = currentFood;
          ingredientList.classList.add("results-list");
          listFood.appendChild(ingredientList);
      } else {
        console.log("nope");
      }
    });

    getTag(arrayOfRecipes);


    if (searchbarFood.value.length === 0) {
      console.log(recipes);
      displayRecipes(recipes);
      displayFood(recipes);
      displayMachines(recipes);
      displayTools(recipes);
      getTag(recipes);
      number.innerHTML = recipes.length + " recettes";
    }
  }
}


const searchbarMachines = document.getElementById("searchbar-machines");
searchbarMachines.addEventListener("input", findMachineFilter);

function findMachineFilter() {

  let arrayOfAppliances = []; 

  if (mainSearchFirst) {
    
    let newRecipes = [];

    newRecipes = arrayOfRecipes.filter(recipe => 
      recipe.appliance.toLowerCase().includes(searchbarMachines.value.toLowerCase())
    );
    getTag(newRecipes);
    displayRecipes(newRecipes);
    numberOfRecipes(newRecipes);      
    

    if (searchbarMachines.value.length === 0) {
      displayRecipes(arrayOfRecipes);
      numberOfRecipes(arrayOfRecipes);
      displayFood(arrayOfRecipes);
      displayMachines(arrayOfRecipes);
      displayTools(arrayOfRecipes);

    } 
  } else if (!mainSearchFirst) {
  
    let arrayOfRecipes = [];
  
    arrayOfRecipes = recipes.filter(recipe =>
      recipe.appliance.toLowerCase().includes(searchbarMachines.value.toLowerCase())
    );
    console.log(arrayOfRecipes);
    arrayOfRecipes.forEach(recipe =>
      arrayOfAppliances.push(recipe.appliance.toLowerCase())
    );
    console.log(arrayOfAppliances);
    numberOfRecipes(arrayOfRecipes);
    displayRecipes(arrayOfRecipes);
    
    
    searchAppliance.innerHTML = "";
    let appliancesList = [];

    arrayOfAppliances.forEach(appliance => {

      const currentAppliance = appliance.toLowerCase();
        
      if (!appliancesList.includes(currentAppliance)) {
          appliancesList.push(currentAppliance);
          console.log(appliancesList);
          const applianceList = document.createElement("p");
          applianceList.innerHTML = currentAppliance;
          applianceList.classList.add("results-list");
          searchAppliance.appendChild(applianceList);
      } else {
        console.log("nope");
      } 
    });
  
    getTag(arrayOfRecipes);

    if (searchbarMachines.value.length === 0) {
      displayRecipes(recipes);
      displayFood(recipes);
      displayMachines(recipes);
      displayTools(recipes);
      getTag(recipes);
      number.innerHTML = recipes.length + " recettes";
    }
  }
}

const searchbarTools = document.getElementById("searchbar-tools");
searchbarTools.addEventListener("input", findToolsFilter);

function findToolsFilter() {

  let arrayOfUstensils = [];

  if (mainSearchFirst) {
    
    let newRecipes = [];

    newRecipes = arrayOfRecipes.filter(recipe =>
      recipe.ustensils.some(ustensil =>
        ustensil.toLowerCase().includes(searchbarTools.value.toLowerCase())));
    
    getTag(newRecipes);
    displayRecipes(newRecipes);
    numberOfRecipes(newRecipes);
      
    if (searchbarTools.value.length === 0) {
      displayRecipes(arrayOfRecipes);
      numberOfRecipes(arrayOfRecipes);
      displayFood(arrayOfRecipes);
      displayMachines(arrayOfRecipes);
      displayTools(arrayOfRecipes);
    }
    
  } else if (!mainSearchFirst) {

    let arrayOfRecipes = [];

    arrayOfRecipes = recipes.filter(recipe =>
      recipe.ustensils.some(ustensil =>
        ustensil.toLowerCase().includes(searchbarTools.value.toLowerCase()))
      );
    arrayOfRecipes.forEach(recipe => 
      recipe.ustensils.forEach(ustensil => {
        if (ustensil.toLowerCase().includes(searchbarTools.value.toLowerCase())) {
          arrayOfUstensils.push(ustensil.toLowerCase());
        }
      })
    );
    numberOfRecipes(arrayOfRecipes);
    displayRecipes(arrayOfRecipes);  
    
  
    listTools.innerHTML = "";
    let ustensilsList = [];

    arrayOfUstensils.forEach(ustensil => {

      const currentUstensil = ustensil.toLowerCase();

      if (!ustensilsList.includes(currentUstensil)) {
        ustensilsList.push(currentUstensil);
        const toolsList = document.createElement("p");
        toolsList.innerHTML = currentUstensil;
        toolsList.classList.add("results-list");
        listTools.appendChild(toolsList);
    } else {
      console.log("nope");
    }
    });
    
    getTag(arrayOfRecipes);

    if (searchbarTools.value.length === 0) {
      displayRecipes(recipes);
      displayRecipes(recipes);
      displayFood(recipes);
      displayMachines(recipes);
      displayTools(recipes);
      getTag(recipes);
      number.innerHTML = recipes.length + " recettes";
    }
  } 
}
