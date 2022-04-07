import { updateAppData } from '../index.js';
import { listenersHandler } from '../utils/helpers.js';

const eventHandler = listenersHandler();

/**
 * Fonction d'initialisaion des différents événements liés à la recherche
 * @param {boolean} shouldDisplayMsg 
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
            const updateFunction = (appData) => appData.searchValue = inputValue;
            updateAppData(updateFunction);
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