const algoSearch = document.getElementById("searchFood");
const listFood = document.getElementById("food-list");
const searchAppliance = document.getElementById("machines-list");
const listTools = document.getElementById("tools-list");
const tags = document.getElementById("list-of-tags");

let arrayOfRecipes = [];
let mainSearchFirst = false;
let secondSearchFirst = false;

if (mainSearchFirst === false && secondSearchFirst === false) {
  algoSearch.addEventListener("input", findFood);
} else if (mainSearchFirst === false && secondSearchFirst === true) {
  console.log("hello");
}

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
    
    numberOfRecipes(arrayOfRecipes);
  } 

  displayFood();
  displayMachines();
  displayTools();

  getTag();

  mainSearchFirst = true;

  if (algoSearch.value.length === 0) {
    displayRecipes(recipes);
    number.innerHTML = recipes.length + " recettes";
    listFood.innerHTML = "";
    searchAppliance.innerHTML = "";
    listTools.innerHTML = "";
    tags.innerHTML = "";
    mainSearchFirst = false;
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

function numberOfRecipes(array) {

  if (array.length <= 1) {
    number.innerHTML = array.length + " recette";
  } else {
    number.innerHTML = array.length + " recettes";
  }
}

function clickableTag() {
  
}

function getTag() {
  const list = document.querySelectorAll(".results-list");
  const tags = document.getElementById("list-of-tags");
  let clickableList = false;
  let arrayOfTags = [];

  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener("click", function() {
      if (!clickableList) {
        list[i].style.backgroundColor = "rgba(255, 209, 91, 1)";
        clickableList = true;

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

    for (let i = 0; i < arrayOfRecipes.length; i++) {
      let containsAllTags = true;

      for (let j = 0; j < tags.length; j++) {
        let containsTag = false;

        for (let k = 0; k < arrayOfRecipes[i].ingredients.length; k++) {
          if (arrayOfRecipes[i].ingredients[k].ingredient.toLowerCase().includes(tags[j])) {
            containsTag = true;
            break;
          }
        }

        if (arrayOfRecipes[i].appliance.toLowerCase().includes(tags[j])) {
          console.log(tags);
          containsTag = true;
          break;
        }

        for (let l = 0; l < arrayOfRecipes[i].ustensils.length; l++) {
          if (arrayOfRecipes[i].ustensils[l].toLowerCase().includes(tags[j])) {
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
        filteredRecipes.push(arrayOfRecipes[i]);
      }
    }

    displayRecipes(filteredRecipes);
    numberOfRecipes(filteredRecipes);
  }
}

function mainScenarioFoodFilter() {
  let newRecipes = []
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
}