import { getData, appData, getFilteredRecipes } from './utils/get-data.js';
import { Recipe } from './models/recipe.js';
import { renderSelectSection } from './features/select.js';
import { renderSearch } from './features/search.js';

/** Scope rendant la variable privée, inaccessible */
{
    const { recipes } = await getData();
    appData.recipes = recipes;
}

/**
 * Fonction de mise à jour du contenu de la page
 * > À chaque changement du modèle : gestion de la vue 
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
 * > Gestion de la mise à jour du modèle et notification d'un changement (listener)
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
    const recipesSection = document.querySelector('.recipes');
    const recipesObjects = [];

    recipes.forEach((recipe) => {
        const recipeModel = new Recipe(recipe);
        recipesObjects.push(recipeModel.createHTML);
    });

    // Le .join sert à ne pas injecter les virgules de la liste
    recipesSection.innerHTML = recipesObjects.join(''); 
};

/**
 * Appel de la fonction qui éxécute le 
 * premier rendu de l'application
 */
onAppUpdate();