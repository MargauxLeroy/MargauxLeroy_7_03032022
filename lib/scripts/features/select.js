import { getAllIngredients, getAllUstensils, getAllAppliances } from '../utils/get-data.js';
import { capitalize, deduplicateStrings, listenersHandler } from '../utils/helpers.js';
import { updateAppData } from '../index.js';

const eventHandler = listenersHandler();

const ingredientSelect = document.querySelector('.select-ingredients');
const ustensilSelect = document.querySelector('.select-ustensils');
const applianceSelect = document.querySelector('.select-appliances');

const INGREDIENTS_KEY = 'ingredients';
const USTENSILS_KEY = 'ustensils';
const APPLIANCE_KEY = 'appliances';

const tagBuilder = (key) => (label) => ({label, key});

/**
 * Fonction
 * @param {Recipe []} recipes 
 * @param {boolean} isIngredientsSelectOpen 
 * @param {string []} selectedTags 
 * @param {string []} filteredIngredients 
 */
export const renderSelectSection = (recipes, ingredientsData, ustensilsData, appliancesData) => {

    const ingredients = getAllIngredients(recipes, ingredientsData.searchValue);
    const ustensils = getAllUstensils(recipes, ustensilsData.searchValue);
    const appliances = getAllAppliances(recipes, appliancesData.searchValue);

    eventHandler.clearAllListeners();
    
    renderTags(
        [
            ...ingredientsData.tags.map(tagBuilder(INGREDIENTS_KEY)), 
            ...ustensilsData.tags.map(tagBuilder(USTENSILS_KEY)), 
            ...appliancesData.tags.map(tagBuilder(APPLIANCE_KEY))
        ]
    );

    // Gère les ingrédients
    renderItemsSelect(ingredientSelect, ingredients, ingredientsData.isSelectOpen, INGREDIENTS_KEY);
    renderEmptyMessage(ingredientSelect, ingredients.length === 0);
    renderSelectFilter(ingredientSelect);

    // Gère les ustensiles
    renderItemsSelect(ustensilSelect, ustensils, ustensilsData.isSelectOpen, USTENSILS_KEY);
    renderEmptyMessage(ustensilSelect, ustensils.length === 0);
    renderSelectFilter(ustensilSelect);

    // Gère les appareils
    renderItemsSelect(applianceSelect, appliances, appliancesData.isSelectOpen, APPLIANCE_KEY);
    renderEmptyMessage(applianceSelect, appliances.length === 0);
    renderSelectFilter(applianceSelect);
};

/**
 * Fonction
 * @param {boolean} isIngredientsSelectOpen 
 */
const renderItemsSelect = (target, data, isIngredientsSelectOpen, key) => {
    const selectName = target.querySelector('h3');
    const selectInput = target.querySelector('input');
    const selectChevron = target.querySelector('.select-header img');
    const ul = target.querySelector('ul');

    const selectUl = target.querySelector('.select-list');

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


    ul.innerHTML = '';

    eventHandler.addEventListener(selectChevron, 'click', () => toggleSelect(key));

    const elements = data.map((string) => {
        const onClick = () => addItem(elementLi.textContent, key);

        const elementLi = document.createElement('li');
        elementLi.innerHTML = capitalize(string);

        eventHandler.addEventListener(elementLi, 'click', onClick);

        return elementLi;
    });

    ul.append(...elements);
};

const toggleSelect = (key) => updateAppData((appData) => {
    [ INGREDIENTS_KEY, USTENSILS_KEY, APPLIANCE_KEY ]
        .filter(k => k !== key).forEach((key)=> {
            appData[key].isSelectOpen = false;
        });
  

    appData[key].isSelectOpen = !appData[key].isSelectOpen;
});

/**
 * 
 * @param {string} item 
 * @param {string} key 
 * @returns 
 */
const addItem = (item, key) => updateAppData((appData => 
    appData[key].tags = appData[key].tags
        .concat(item)
        .reduce(deduplicateStrings, []))
);

/**
 * Fonction de filtration de la liste du select pendant une recherche
 */
const renderSelectFilter = (target) => {
    const searchInput = target.querySelector('.select-input');

    const onInput = (event) => {
        const inputValue = event.target.value.toLowerCase();
        updateAppData(appData => appData.ingredients.searchValue = inputValue);
    };

    eventHandler.addEventListener(searchInput, 'input', onInput);

};

/**
 * Fonction de création d'un tag
 * @param {string []} tags
 * @returns {HTMLLIElement}
 */
const renderTags = (tags) => {
    const tagsList = document.querySelector('.tags');
    tagsList.innerHTML = '';

    const tagsNodes = tags.map((tag) => {

        const tagLi = document.createElement('li');

        tagLi.dataset.key = tag.key;
        tagLi.classList.add('tag');

        const tagText = document.createElement('p');
        tagText.innerHTML = tag.label;

        const tagIcon = document.createElement('img');
        tagIcon.src = '../../../assets/icons/delete.svg';
        tagIcon.alt = 'Supprimer le tag';

        tagLi.appendChild(tagText);
        tagLi.appendChild(tagIcon);

        const onClick = () => {
            updateAppData((appData) => 
                appData[tag.key].tags = 
                appData[tag.key].tags.filter(tagLabel => tagLabel !== tag.label)
            );
        };

        eventHandler.addEventListener(tagIcon, 'click', onClick);

        return tagLi;
    });

    tagsList.append(...tagsNodes);
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