const algoSearch = document.getElementById("searchFood");
let arrayOfRecipes = [];

algoSearch.addEventListener("input", findFood);

function findFood() {
  listRecipes.innerHTML = "";
  arrayOfRecipes = [];
 
  for (let i = 0; i < recipes.length; i++) {

    if (algoSearch.value.length >= 3) {

      for (let j = 0; j < recipes[i].ingredients.length; j++) {
        

        if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(algoSearch.value.toLowerCase())) {

          arrayOfRecipes.push(recipes[i]);
          displayRecipes(arrayOfRecipes);
          console.log(arrayOfRecipes);
          break;          
        } 
      }
    } 
  } 

  if (algoSearch.value.length === 0) {
    displayRecipes(recipes);
  }
}