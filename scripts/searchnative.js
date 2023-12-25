const algoSearch = document.getElementById("searchFood");
const listFood = document.getElementById("food-list");
const searchAppliance = document.getElementById("machines-list");
const listTools = document.getElementById("tools-list");
const tags = document.getElementById("list-of-tags");

let arrayOfRecipes = [];
let mainSearchFirst;

algoSearch.addEventListener("input", findFood);

function findFood() {

    mainSearchFirst = true;

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
      
      numberOfRecipes(arrayOfRecipes);
    } 

    displayFood(arrayOfRecipes);
    displayMachines(arrayOfRecipes);
    displayTools(arrayOfRecipes);

    getTag(arrayOfRecipes);

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
    }
}

function displayFood(array) {
  listFood.innerHTML = "";

  let arrayOfFood = [];

  for (let i = 0; i < array.length; i++) {

    for (let j = 0; j < array[i].ingredients.length; j++) {

      const currentFood = array[i].ingredients[j].ingredient.toLowerCase();

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

function displayMachines(array) {
  searchAppliance.innerHTML = "";

  let arrayOfMachines = [];

  for (let i = 0; i < array.length; i++) {
    const currentAppliance = array[i].appliance.toLowerCase();
    if (!arrayOfMachines.includes(currentAppliance)) {
      arrayOfMachines.push(currentAppliance);
      const appliance = document.createElement("p");
      appliance.innerHTML = currentAppliance;
      appliance.classList.add("results-list");
      searchAppliance.appendChild(appliance);
    }
  }
}

function displayTools(array) {
  listTools.innerHTML = "";

  let arrayOfTools = [];

  for (let i = 0; i < array.length; i++) {

    for (let j = 0; j < array[i].ustensils.length; j++) {

      const currentTools = array[i].ustensils[j].toLowerCase();

      if (!arrayOfTools.includes(currentTools)) {
        arrayOfTools.push(currentTools);
        const ustensil = document.createElement("p");
        ustensil.innerHTML = currentTools;
        ustensil.classList.add("results-list");
        listTools.appendChild(ustensil);
      }
    }
  }
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

  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener("click", function(event) {
      let clickableList = event.target.style.backgroundColor === "rgb(255, 209, 91)";

      if (!clickableList) {
        list[i].style.backgroundColor = "rgb(255, 209, 91)";
        clickableList = true;

        if (foodOpen) {
          openFood();
        } else if (machinesOpen) {
          openMachines();
        } else if (toolsOpen) {
          openTools();
        }
        
        const tagText = list[i].textContent.toLowerCase();
        if (!arrayOfTags.includes(tagText)) {
          arrayOfTags.push(tagText);
          const tag = document.createElement("p");
          tag.innerHTML = tagText;
          tag.classList.add("tag");
          tags.appendChild(tag);

          updateRecipes(arrayOfTags);
        }
      } else {
        list[i].style.backgroundColor = null;
        clickableList = false;

        const tagText = list[i].textContent.toLowerCase();
        const index = arrayOfTags.indexOf(tagText);
        if (index !== -1) {
          arrayOfTags.splice(index, 1);
          tags.removeChild(tags.childNodes[index]);
          updateRecipes(arrayOfTags);
        }
      }
    });
  }

  function updateRecipes(tags) {
    const filteredRecipes = [];

    for (let i = 0; i < array.length; i++) {
      let containsAllTags = true;

      for (let j = 0; j < tags.length; j++) {
        let containsTag = false;

        for (let k = 0; k < array[i].ingredients.length; k++) {
          if (array[i].ingredients[k].ingredient.toLowerCase().includes(tags[j])) {
            containsTag = true;
            break;
          }
        }

        if (array[i].appliance.toLowerCase().includes(tags[j])) {
          console.log(tags);
          containsTag = true;
          break;
        }

        for (let l = 0; l < array[i].ustensils.length; l++) {
          if (array[i].ustensils[l].toLowerCase().includes(tags[j])) {
            containsTag = true;
            break;
          }
        }

        if (!containsTag) {
          containsAllTags = false;
          break;
        }
      }

      if (containsAllTags) {
        filteredRecipes.push(array[i]);
      }
    }

    displayRecipes(filteredRecipes);
    numberOfRecipes(filteredRecipes);
  }
}

getTag(recipes);

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
          displayFood(newRecipes);
          displayMachines(newRecipes);
          displayTools(newRecipes);
          break;          
        }
      } 
    } 
  }

    if (searchbarFood.value.length === 0) {
      displayRecipes(arrayOfRecipes);
      numberOfRecipes(arrayOfRecipes);
      displayFood(arrayOfRecipes);
      displayMachines(arrayOfRecipes);
      displayTools(arrayOfRecipes);
    }

  } else if (!mainSearchFirst) {

    arrayOfRecipes = [];
    let arrayOfIngredients = [];
  
    if (searchbarFood.value.length >= 3) {
  
      for (let i = 0; i < recipes.length; i++) {
        
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
  
          if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(searchbarFood.value.toLowerCase())) {
              
            arrayOfIngredients.push(recipes[i].ingredients[j].ingredient)
            console.log(arrayOfIngredients);
            arrayOfRecipes.push(recipes[i]);
            displayRecipes(arrayOfRecipes);
            console.log(arrayOfRecipes);
            break;          
          }
        } 
      } 
    }
  
    listFood.innerHTML = "";
    let ingredientsList = [];

    for (let i = 0; i < arrayOfIngredients.length; i++) {

      const currentFood = arrayOfIngredients[i].toLowerCase();

      if (!ingredientsList.includes(currentFood)) {
          ingredientsList.push(currentFood);
          console.log(ingredientsList);
          const ingredientList = document.createElement("p");
          ingredientList.innerHTML = currentFood;
          ingredientList.classList.add("results-list");
          listFood.appendChild(ingredientList);
      } else {
        console.log("nope")
      }
    }

    getTag(arrayOfRecipes);
    numberOfRecipes(arrayOfRecipes);
    
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

  if (mainSearchFirst) {
    
    let newRecipes = [];

    if (searchbarMachines.value.length >= 3) {
      for (let i = 0; i < arrayOfRecipes.length; i++) {
    
        if (!arrayOfRecipes[i].appliance.toLowerCase().includes(searchbarMachines.value.toLowerCase())) {

          newRecipes.push(arrayOfRecipes[i].appliance);
          displayRecipes(newRecipes);
          numberOfRecipes(newRecipes);
          displayFood(newRecipes);
          displayMachines(newRecipes);
          displayTools(newRecipes);
          break;
        } 
      }
    } 

    if (searchbarMachines.value.length === 0) {
      displayRecipes(arrayOfRecipes);
      numberOfRecipes(arrayOfRecipes);
      displayFood(arrayOfRecipes);
      displayMachines(arrayOfRecipes);
      displayTools(arrayOfRecipes);

    } 
  } else if (!mainSearchFirst) {

    arrayOfRecipes = [];
    let arrayOfAppliances = [];
  
    if (searchbarMachines.value.length >= 3) {
  
      for (let i = 0; i < recipes.length; i++) {
      
        if (recipes[i].appliance.toLowerCase().includes(searchbarMachines.value.toLowerCase())) {
  
          if (!arrayOfRecipes.includes(recipes[i])) {
            
            arrayOfAppliances.push(recipes[i].appliance)
            arrayOfRecipes.push(recipes[i]);
            displayRecipes(arrayOfRecipes);
          } 
        }
      } 
    }
    
    searchAppliance.innerHTML = "";
    let appliancesList = [];

    for (let i = 0; i < arrayOfAppliances.length; i++) {

      const currentAppliance = arrayOfAppliances[i].toLowerCase();

      if (!appliancesList.includes(currentAppliance)) {
        appliancesList.push(currentAppliance);
          console.log(appliancesList);
          const applianceList = document.createElement("p");
          applianceList.innerHTML = currentAppliance;
          applianceList.classList.add("results-list");
          searchAppliance.appendChild(applianceList);
      } else {
        console.log("nope")
      }
    }
  
    getTag(arrayOfRecipes);
    numberOfRecipes(arrayOfRecipes);

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
  
  if (mainSearchFirst) {
    
    let newRecipes = [];

    if (searchbarTools.value.length >= 3) {

      for (let i = 0; i < arrayOfRecipes.length; i++) {
          
         for (let j = 0; j < arrayOfRecipes[i].ustensils.length; j++) {

           if (arrayOfRecipes[i].ustensils[j].toLowerCase().includes(searchbarTools.value.toLowerCase())) {

            newRecipes.push(arrayOfRecipes[i]);
            displayRecipes(newRecipes);
            numberOfRecipes(newRecipes);
            displayFood(newRecipes);
            displayMachines(newRecipes);
            displayTools(newRecipes);
            break;           
          }
        } 
      } 
    }
      
    if (searchbarTools.value.length === 0) {
      displayRecipes(arrayOfRecipes);
      numberOfRecipes(arrayOfRecipes);
      displayFood(arrayOfRecipes);
      displayMachines(arrayOfRecipes);
      displayTools(arrayOfRecipes);
    }
    
  } else if (!mainSearchFirst) {

    arrayOfRecipes = [];
    let arrayOfUstensils = [];

    if (searchbarTools.value.length >= 3) {
  
      for (let i = 0; i < recipes.length; i++) {
      
        for (let j = 0; j < recipes[i].ustensils.length; j++) {
  
          if (recipes[i].ustensils[j].toLowerCase().includes(searchbarTools.value.toLowerCase())) {
  
            arrayOfUstensils.push(recipes[i].ustensils[j])
            console.log(arrayOfUstensils);
            arrayOfRecipes.push(recipes[i]);
            displayRecipes(arrayOfRecipes);
            break;          
          }
        } 
      } 
    }
  
    listTools.innerHTML = "";
    let ustensilsList = [];

    for (let i = 0; i < arrayOfUstensils.length; i++) {

      const currentUstensil = arrayOfUstensils[i].toLowerCase();

      if (!ustensilsList.includes(currentUstensil)) {
        ustensilsList.push(currentUstensil);
          const ustensilList = document.createElement("p");
          ustensilList.innerHTML = currentUstensil;
          ustensilList.classList.add("results-list");
          listTools.appendChild(ustensilList);
      } else {
        console.log("nope")
      }
    }
  
    
    getTag(arrayOfRecipes);
    numberOfRecipes(arrayOfRecipes);

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
