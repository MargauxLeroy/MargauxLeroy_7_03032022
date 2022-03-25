import { capitalize, deduplicateStrings, } from '../utils/helpers.js';
import { updateAppData } from '../index.js';
import { listenersHandler } from '../utils/helpers.js';

const eventHandler = listenersHandler();

const ingredientSelect = document.querySelector('.select-ingredients');

/**
 * Fonction
 * @param {boolean} isIngredientsSelectOpen 
 * @param {string []} selectedTags 
 * @param {string []} filteredIngredients 
 */
export const renderSelectSection = (isIngredientsSelectOpen, selectedTags, filteredIngredients) => {
    eventHandler.clearAllListeners();
    
    renderIngredientsSelect(isIngredientsSelectOpen);
    renderTags(selectedTags);
    renderIngredients(filteredIngredients);
    renderSelectFilter();

    renderEmptyMessage(ingredientSelect, filteredIngredients.length === 0);
};

/**
 * Fonction
 * @param {string []} filteredIngredients 
 */
const renderIngredients = (filteredIngredients) => {
    renderSelectList(ingredientSelect, filteredIngredients);
};

/**
 * Fonction
 * @param {boolean} isIngredientsSelectOpen 
 */
const renderIngredientsSelect = (isIngredientsSelectOpen) => {
    const selectName = ingredientSelect.querySelector('h3');
    const selectInput = ingredientSelect.querySelector('input');
    const selectChevron = ingredientSelect.querySelector('.select-header img');

    const selectUl = ingredientSelect.querySelector('.select-list');

    // Si le select doit être ouvert...
    if (isIngredientsSelectOpen) {
        selectName.style.display = 'none';
        selectInput.style.display = 'initial';
        selectUl.style.display = 'grid';
        selectChevron.style.transform = 'rotate(180deg)';
    } else {
        selectName.style.display = 'initial';
        selectInput.style.display = 'none';
        selectUl.style.display = 'none';
        selectChevron.style.transform = 'rotate(0deg)';
    }
};

const toggleIngredientSelect = () => updateAppData((appData) => {
    appData.ingredient.isSelectOpen = !appData.ingredient.isSelectOpen;
});

/**
 * 
 * @param {string} ingredient 
 * @returns 
 */
const addIngredient = (ingredient) => updateAppData((appData => 
    appData.ingredient.tags = appData.ingredient.tags
        .concat(ingredient)
        .reduce(deduplicateStrings, []))
);

/**
 * Fonction de création de la liste du select
 * @param {string []} data 
 * @param {Element} target 
 * */
const renderSelectList = (target, data) => {
    const ul = target.querySelector('ul');
    const selectChevron = target.querySelector('.select-header img');

    ul.innerHTML = '';

    eventHandler.addEventListener(selectChevron, 'click', toggleIngredientSelect);

    const elements = data.map((string) => {
        const onClick = () => addIngredient(elementLi.textContent);

        const elementLi = document.createElement('li');
        elementLi.innerHTML = capitalize(string);

        eventHandler.addEventListener(elementLi, 'click', onClick);

        return elementLi;
    });

    ul.append(...elements);
};

/**
 * Fonction de filtration de la liste du select pendant une recherche
 */
const renderSelectFilter = () => {
    const searchInput = document.querySelector('.select-input');

    const onInput = (event) => {
        const inputValue = event.target.value.toLowerCase();
        updateAppData(appData => appData.ingredient.searchValue = inputValue);
    };

    eventHandler.addEventListener(searchInput, 'input', onInput);

};

/**
 * Fonction de création d'un tag
 * @param {string []} labels
 * @returns {HTMLLIElement}
 */
const renderTags = (labels) => {
    const tagsList = document.querySelector('.tags');
    tagsList.innerHTML = '';

    const tags = labels.map((label) => {

        const tag = document.createElement('li');
        tag.classList.add('tag');

        const tagText = document.createElement('p');
        tagText.innerHTML = label;

        const tagIcon = document.createElement('img');
        tagIcon.src = '../../../assets/icons/delete.svg';
        tagIcon.alt = 'Supprimer le tag';

        tag.appendChild(tagText);
        tag.appendChild(tagIcon);

        const onClick = () => {
            updateAppData((appData) => 
                appData.ingredient.tags = 
                appData.ingredient.tags.filter(tag => tag !== label)
            );
        };

        eventHandler.addEventListener(tagIcon, 'click', onClick);

        return tag;
    });

    tagsList.append(...tags);
};

/**
 * Fonction pour déterminer si le message doit être afficher
 * @param {Element} target 
 * @param {boolean} shouldDisplayMsg 
 */
export const renderEmptyMessage = (target, shouldDisplayMsg) => {
    const noResultsText = target.querySelector('.no-result');

    noResultsText.style.display = shouldDisplayMsg 
        ? 'initial' 
        : 'none';
};