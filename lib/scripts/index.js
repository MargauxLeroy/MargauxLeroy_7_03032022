import { getData } from "./utils/getData.js";
import { Recipe } from "./models/recipe.js";
import { initSelectsEvents } from "./features/select.js";
// import { filterRecipes } from "./features/search.js";

export const { recipes } = await getData();

const recipesSection = document.querySelector(".recipes");

/**
 * @param {Recipe []} recipes
 */
export const createRecipes = (recipes) => {
  const recipesObjects = [];

  recipes.forEach((recipe) => {
    // Création d'un nouvel objet "Recette"
    const recipeModel = new Recipe(recipe);
    recipesObjects.push(recipeModel.createHTML);
  });

  // Injection de la liste dans le HTML
  recipesSection.innerHTML += recipesObjects.join(""); // Le .join sert à ne pas injecter les virgules de la liste
};

// Fonction d'initialisation
const init = async () => {
  createRecipes(recipes);

  initSelectsEvents();
};

init();
