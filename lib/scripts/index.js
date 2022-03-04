import { getData } from "./utils/getData.js";
import { Recipe } from "./models/recipe.js";

// Initialisation //
const recipesSection = document.querySelector(".recipes");
const selectIngredients = document.querySelector(".select-ingredients");


/**
 * @param {Recipe []} recipes
 */
const createRecipes = (recipes) => {
  const recipesObjects = [];

  recipes.forEach((recipe) => {
    // Création d'un nouvel objet "Recette"
    const recipeModel = new Recipe(recipe);
    recipesObjects.push(recipeModel.createHTML);
  });

  // Injection de la liste dans le HTML
  recipesSection.innerHTML += recipesObjects.join(""); // Le .join sert à ne pas injecter les virgules de la liste
};



// Fonction d'initialisation des events sur les selects'
const initSelectsEvents = () => {
  const selectTitle = selectIngredients.firstElementChild;

  selectIngredients.addEventListener("click", () => {
    if (selectTitle.innerHTML === 'Ingrédients') {
      selectTitle.innerHTML = 'Rechercher un ingrédient';
      selectTitle.style.opacity = 0.5;
    } else {
      selectTitle.innerHTML = 'Ingrédients';
      selectTitle.style.opacity = 1;
    }
  })
}

// const getAllIngredients = (recipes) => {
//   const 
// }


// Fonction d'initialisation
const init = async () => {
  const { recipes } = await getData();
  createRecipes(recipes);

  initSelectsEvents();
};

init();
