const algoSearch = document.getElementById("searchFood");
const listFood = document.getElementById("food-list");
const searchAppliance = document.getElementById("machines-list");
const listTools = document.getElementById("tools-list");
const tags = document.getElementById("list-of-tags");

let arrayOfRecipes = [];
let mainSearchFirst;
let secondSearchFirst;

algoSearch.addEventListener("input", findFood);

// main function for the main search input
function findFood() {

  // if we didn't search something via the filters first, we enter the following if
  if (!secondSearchFirst) {
    
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
        recipe.name.toLowerCase().includes(algoSearch.value.toLowerCase()))
            
      displayRecipes(arrayOfRecipes);

      if (arrayOfRecipes.length === 0) {
        listRecipes.innerHTML = `Aucune recette ne contient ‘${algoSearch.value}’ vous pouvez chercher «tarte aux pomme», «poisson», etc`;
      }
      
      numberOfRecipes(arrayOfRecipes);
    } 

    // display all the ingredients, appliances, and tools, of arrayOfRecipes

    displayFood();
    displayMachines();
    displayTools();


    // used to add / delete one or multiple tags
    getTag();

    // we reset the result field and display all the recipes again 
    if (algoSearch.value.length === 0) {
      displayRecipes(recipes);
      number.innerHTML = recipes.length + " recettes";
      listFood.innerHTML = "";
      searchAppliance.innerHTML = "";
      listTools.innerHTML = "";
      tags.innerHTML = "";
      mainSearchFirst = false;
    }

  // activated when we have searched via the filters first 
  } else if (secondSearchFirst) {

    let newRecipes = [];

    if (algoSearch.value.length >= 3) {
      
      newRecipes = arrayOfRecipes.filter(recipe => 
        recipe.ingredients.some(ingredient => 
          ingredient.ingredient.toLowerCase().includes(algoSearch.value.toLowerCase())) ||
        recipe.description.toLowerCase().includes(algoSearch.value.toLowerCase()) ||
        recipe.name.toLowerCase().includes(algoSearch.value.toLowerCase()))
            
      displayRecipes(newRecipes);
      }

    if (newRecipes.length === 0) {
      listRecipes.innerHTML = `Aucune recette ne contient ‘${algoSearch.value}’ vous pouvez chercher «tarte aux pomme», «poisson», etc`;
    }

    numberOfRecipes(newRecipes);

    displayFood();
    displayMachines();
    displayTools();

    getTag();

    if (algoSearch.value.length === 0) {
      displayRecipes(arrayOfRecipes);
      number.innerHTML = arrayOfRecipes.length + " recettes";
      listFood.innerHTML = "";
      searchAppliance.innerHTML = "";
      listTools.innerHTML = "";
      tags.innerHTML = "";
      mainSearchFirst = false;
    }
  }
}

function displayFood() {
  listFood.innerHTML = "";

  let arrayOfFood = [];
  
  arrayOfRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      const currentFood = ingredient.ingredient.toLowerCase();
      if (!arrayOfFood.includes(currentFood)) {
        arrayOfFood.push(currentFood);
        const ingredientList = document.createElement("p");
        ingredientList.innerHTML = currentFood;
        ingredientList.classList.add("results-list");
        listFood.appendChild(ingredientList);
      }
    })
  })
}

function displayMachines() {
  searchAppliance.innerHTML = "";

  let arrayOfMachines = [];

  arrayOfRecipes.forEach(recipe => {
    const currentAppliance = recipe.appliance.toLowerCase();
      if (!arrayOfMachines.includes(currentAppliance)) {
      arrayOfMachines.push(currentAppliance);
      const appliance = document.createElement("p");
      appliance.innerHTML = currentAppliance;
      appliance.classList.add("results-list");
      searchAppliance.appendChild(appliance);
    }
  })
}

function displayTools() {
  listTools.innerHTML = "";

  let arrayOfTools = [];

  arrayOfRecipes.forEach(recipe => {
    recipe.ustensils.forEach(ustensil => {
      const currentTools = ustensil.toLowerCase();
      if (!arrayOfTools.includes(currentTools)) {
        arrayOfTools.push(currentTools);
        const ustensil = document.createElement("p");
        ustensil.innerHTML = currentTools;
        ustensil.classList.add("results-list");
        listTools.appendChild(ustensil);
      }
    })
  })
}

function numberOfRecipes(array) {

  if (array.length <= 1) {
    number.innerHTML = array.length + " recette";
  } else {
    number.innerHTML = array.length + " recettes";
  }
}

function getTag() {
  const list = document.querySelectorAll(".results-list");
  const tags = document.getElementById("list-of-tags");
  let clickableList = false;
  let arrayOfTags = [];

  list.forEach(listTag => {
    listTag.addEventListener("click", function() {
      const tagText = listTag.textContent.toLowerCase();

      if (!clickableList) {
        listTag.style.backgroundColor = "rgba(255, 209, 91, 1)";
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
          const tag = document.createElement("p");
          tag.innerHTML = tagText;
          tag.classList.add("tag");
          tags.appendChild(tag);

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
    })
  })
  
  // verify if tag clicked is present in recipe, if true, filter it in filteredRecipes, then display it
  // this function is called each time the user add or delete a tag
  function updateRecipes(tags) {
    const filteredRecipes = arrayOfRecipes.filter(recipe => {
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

const searchbarFood = document.getElementById("searchbar-food");
searchbarFood.addEventListener("input", findFoodFilter);

function findFoodFilter() {

  if (mainSearchFirst) {
    let newRecipes = [];

    if (searchbarFood.value.length >= 3) {

    for (let i = 0; i < arrayOfRecipes.length; i++) {
    
      for (let j = 0; j < arrayOfRecipes[i].ingredients.length; j++) {

        if (arrayOfRecipes[i].ingredients[j].ingredient.toLowerCase().includes(searchbarFood.value.toLowerCase())) {

          newRecipes.push(arrayOfRecipes[i]);
          displayRecipes(newRecipes);
          numberOfRecipes(newRecipes);
          break;          
        }
      } 
    } 
  }

    if (searchbarFood.value.length === 0) {
      displayRecipes(arrayOfRecipes);
      numberOfRecipes(arrayOfRecipes);
    }

  } else if (!mainSearchFirst) {

    secondSearchFirst = true;
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
}

const searchbarMachines = document.getElementById("searchbar-machines");

searchbarMachines.addEventListener("input", findMachineFilter);


function findMachineFilter() {

  if (mainSearchFirst) {
    
    let newRecipes = [];

    if (searchbarMachines.value.length >= 3) {
    for (let i = 0; i < arrayOfRecipes.length; i++) {
    
      if (arrayOfRecipes[i].appliance.toLowerCase().includes(searchbarMachines.value.toLowerCase())) {

          newRecipes.push(arrayOfRecipes[i]);
          displayRecipes(newRecipes);
          numberOfRecipes(newRecipes);
          break;
        } 
      }
    } 

    if (searchbarMachines.value.length === 0) {
      displayRecipes(arrayOfRecipes);
      numberOfRecipes(arrayOfRecipes);

    } 
  } else if (!mainSearchFirst) {
    arrayOfRecipes = [];
    secondSearchFirst = true;
  
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
  
    if (searchbarMachines.value.length === 0) {
      displayRecipes(recipes);
      number.innerHTML = recipes.length + " recettes";
      listFood.innerHTML = "";
      searchAppliance.innerHTML = "";
      listTools.innerHTML = "";
      tags.innerHTML = "";
      secondSearchFirst = false;
    }
  }
}
const searchbarTools = document.getElementById("searchbar-tools");
searchbarTools.addEventListener("input", findToolsFilter);

function findToolsFilter() {
  
  if (mainSearchFirst) {
    
    let newRecipes = [];

    if (searchbarTools.value.length >= 3) {

      for (let i = 0; i < arrayOfRecipes.length; i++) {
          
         for (let j = 0; j < arrayOfRecipes[i].ustensils.length; j++) {

           if (arrayOfRecipes[i].ustensils[j].toLowerCase().includes(searchbarTools.value.toLowerCase())) {

            newRecipes.push(recipes[i]);
            displayRecipes(newRecipes);
            numberOfRecipes(newRecipes);
            break;          
          }
        } 
      } 
    }
      
    if (searchbarTools.value.length === 0) {
      displayRecipes(arrayOfRecipes);
      numberOfRecipes(arrayOfRecipes);
    }
    
  } else if (!mainSearchFirst) {

    arrayOfRecipes = [];
    secondSearchFirst = true;
  
    if (searchbarTools.value.length >= 3) {
  
      for (let i = 0; i < recipes.length; i++) {
      
        for (let j = 0; j < recipes[i].ustensils.length; j++) {
  
          if (recipes[i].ustensils[j].toLowerCase().includes(searchbarTools.value.toLowerCase())) {
  
            arrayOfRecipes.push(recipes[i]);
            displayRecipes(arrayOfRecipes);
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
  
    if (searchbarTools.value.length === 0) {
      displayRecipes(recipes);
      number.innerHTML = recipes.length + " recettes";
      listFood.innerHTML = "";
      searchAppliance.innerHTML = "";
      listTools.innerHTML = "";
      tags.innerHTML = "";
      secondSearchFirst = false;
    }
  } 
}
