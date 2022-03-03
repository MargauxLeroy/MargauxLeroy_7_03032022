import { getData } from "./utils/getData.js";
import { Recipe } from "./models/recipe.js";
import { searchRecipes } from "./features/search.js";

// Initialisation //
const recipesSection = document.querySelector(".recipes");

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

// Fonction d'initialisation
const init = async () => {
  const { recipes } = await getData();
  createRecipes(recipes);
};

init();
