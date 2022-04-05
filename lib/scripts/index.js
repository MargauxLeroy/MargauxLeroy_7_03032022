import { getData, appData, getFilteredRecipes } from './utils/get-data.js';
import { Recipe } from './models/recipe.js';
import { renderSelectSection } from './features/select.js';
import { renderSearch } from './features/search.js';

export const { recipes } = await getData();
const recipesSection = document.querySelector('.recipes');

/**
 * Fonction de mise à jour du contenu de la page
 */
const onAppUpdate = () => {
    const recipes = getFilteredRecipes();
    console.log(appData, recipes);

    renderRecipes(recipes);
    renderSelectSection(recipes, appData.ingredients, appData.ustensils, appData.appliances);
    renderSearch(recipes.length === 0);
};

/**
 * Fonction pour effectuer des mises à jour des données de l'application
 * @param {Function} updateFunction 
 */
export const updateAppData = (updateFunction) => {
    updateFunction(appData);
    onAppUpdate();
};

/**
 * Fonction de création et d'injection des recettes dans le DOM
 * @param {Recipe []} recipes
 */
export const renderRecipes = (recipes) => {
    const recipesObjects = [];

    recipes.forEach((recipe) => {
        const recipeModel = new Recipe(recipe);
        recipesObjects.push(recipeModel.createHTML);
    });

    recipesSection.innerHTML = recipesObjects.join(''); // Le .join sert à ne pas injecter les virgules de la liste
};

/**
 * Appel de la fonction qui éxécute le premier rendu de l'application
 */
onAppUpdate();