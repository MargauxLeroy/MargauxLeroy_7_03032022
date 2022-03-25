import { updateAppData } from '../index.js';
import { listenersHandler } from '../utils/helpers.js';

const eventHandler = listenersHandler();

/**
 * Fonction
 * @param {boolean} renderNoRecipes 
 */
export const renderSearch = (shouldDisplayMsg) => {
    eventHandler.clearAllListeners();
    renderFilterRecipes();
    renderNoRecipesMsg(shouldDisplayMsg);
};

/**
 * Fonction de filtration des recettes lors de la recherche globale
 */
const renderFilterRecipes = () => {
    const searchInput = document.getElementById('search-input');

    eventHandler.
        addEventListener(searchInput, 'input', (event) => {
            const inputValue = event.target.value.toLowerCase();      
            updateAppData(appData => appData.searchValue = inputValue);
        });
};

/**
 * Fonction pour déterminer si le message doit être afficher
 * @param {boolean} shouldDisplayMsg 
 */
const renderNoRecipesMsg = (shouldDisplayMsg) => {
    const noRecipeText = document.querySelector('.no-recipe');

    noRecipeText.style.display = shouldDisplayMsg 
        ? 'initial' 
        : 'none';
};