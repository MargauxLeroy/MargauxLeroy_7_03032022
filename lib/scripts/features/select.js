import { getAllIngredients, getAllUstensils, getAllAppliances } from '../utils/get-data.js';
import { capitalize, deduplicateStrings, listenersHandler } from '../utils/helpers.js';
import { updateAppData } from '../index.js';

const eventHandler = listenersHandler();

// Récupération des composants-listes HTML
const ingredientSelect = document.querySelector('.select-ingredients');
const ustensilSelect = document.querySelector('.select-ustensils');
const applianceSelect = document.querySelector('.select-appliances');

// Création des clefs
const INGREDIENTS_KEY = 'ingredients';
const USTENSILS_KEY = 'ustensils';
const APPLIANCE_KEY = 'appliances';

/**
 * Fonction
 * @param {Recipe []} recipes 
 * @param {Object []} ingredientsData 
 * @param {Object []} ustensilsData 
 * @param {Object []} appliancesData 
 */
export const renderSelectSection = (recipes, ingredientsData, ustensilsData, appliancesData) => {
    // Supprime les listeners du rendu précédent
    eventHandler.clearAllListeners();

    // On récupère les différentes données nécessaires
    const ingredients = getAllIngredients(recipes, ingredientsData.searchValue);
    const ustensils = getAllUstensils(recipes, ustensilsData.searchValue);
    const appliances = getAllAppliances(recipes, appliancesData.searchValue);

    
    // Gère la création des tags
    renderTags(
        [
            ...ingredientsData.tags.map((label) => tagBuilder(label, INGREDIENTS_KEY)), 
            ...appliancesData.tags.map((label) => tagBuilder(label, APPLIANCE_KEY)),
            ...ustensilsData.tags.map((label) => tagBuilder(label, USTENSILS_KEY))
        ]
    );

    // Gère les ingrédients
    renderItemsSelect(ingredientSelect, ingredients, ingredientsData.isSelectOpen, INGREDIENTS_KEY);
    renderEmptyMessage(ingredientSelect, ingredients.length === 0, ingredientsData.isSelectOpen);
    renderSelectFilter(ingredientSelect, INGREDIENTS_KEY);

    // Gère les ustensiles
    renderItemsSelect(ustensilSelect, ustensils, ustensilsData.isSelectOpen, USTENSILS_KEY);
    renderEmptyMessage(ustensilSelect, ustensils.length === 0, ustensilsData.isSelectOpen);
    renderSelectFilter(ustensilSelect, USTENSILS_KEY);

    // Gère les appareils
    renderItemsSelect(applianceSelect, appliances, appliancesData.isSelectOpen, APPLIANCE_KEY);
    renderEmptyMessage(applianceSelect, appliances.length === 0, appliancesData.isSelectOpen);
    renderSelectFilter(applianceSelect, APPLIANCE_KEY);
};

/**
 * Fonction qui effectue le rendu de l'item liste déroulante
 * @param {HTMLLIElement} target 
 * @param {string []} data 
 * @param {boolean} isSelectOpen 
 * @param {string} key 
 */
const renderItemsSelect = (target, data, isSelectOpen, key) => {
    const selectName = target.querySelector('h3');
    const selectInput = target.querySelector('input');
    const selectChevron = target.querySelector('.select-header img');
    const ul = target.querySelector('ul');

    const selectUl = target.querySelector('.select-list');

    // Si le select est déjà ouvert...
    if (isSelectOpen) {
        target.style.overflowY = 'initial';
        selectName.style.display = 'none';
        selectInput.style.display = 'initial';
        selectUl.style.display = 'grid';
        selectChevron.style.transform = 'rotate(180deg)';
    } else {
        target.style.overflowY = 'scroll';
        selectName.style.display = 'initial';
        selectInput.style.display = 'none';
        selectUl.style.display = 'none';
        selectChevron.style.transform = 'rotate(0deg)';
    }

    // Au clic, gestion de l'ouverture de la liste (et de la fermeture des autres)
    eventHandler.addEventListener(selectChevron, 'click', () => toggleSelect(key));

    // Création de la liste d'éléments dans la liste à partir des données
    // Pour chaque item... on créé un élément HTML associé et son event
    const elements = data.map((string) => {
        const elementLi = document.createElement('li');
        elementLi.innerHTML = capitalize(string);

        const onClick = () => addItem(elementLi.textContent, key);
        eventHandler.addEventListener(elementLi, 'click', onClick);

        return elementLi;
    });

    ul.innerHTML = '';
    ul.append(...elements);
};

/**
 * Fonction de mise à jour de l'ouverture/fermeture des listes 
 * @param {string} key
 */
const toggleSelect = (key) => {
    updateAppData((appData) => {
        [ INGREDIENTS_KEY, USTENSILS_KEY, APPLIANCE_KEY ]
            // On récupère les clefs qu'on ne va pas modifier
            .filter(k => k !== key)
            // On les réinitialise à false
            .forEach((key) => {
                appData[key].isSelectOpen = false;
            });
  
        // On inverse celle sur laquelle on vient de cliquer
        appData[key].isSelectOpen = !appData[key].isSelectOpen;
    });
};

/**
 * Fonction d'ajout d'un item dans l'objet global
 * @param {string} item 
 * @param {string} key 
 */
const addItem = (item, key) => {
    return updateAppData((appData => {
        return appData[key].tags = appData[key].tags
            // Clone la liste avec le nouvel élément (permet de continuer à itérer dessus)
            .concat(item)
            // Empêche la double de création d'un même tag
            .reduce(deduplicateStrings, []);
    }));
};

/**
 * Fonction de filtration de la liste du select pendant une recherche
 * @param {HTMLLIElement} target
 * @param {string} key
 */
const renderSelectFilter = (target, key) => {
    const searchInput = target.querySelector('.select-input');

    const onInput = (event) => {
        const inputValue = event.target.value.toLowerCase();
        updateAppData(appData => appData[key].searchValue = inputValue);
    };

    eventHandler.addEventListener(searchInput, 'input', onInput);
};

/**
 * Fonction qui permet de catégoriser mon tag grâce à la clef
 * @param {string} key 
 * @returns {Object}
 */
const tagBuilder = (label, key) => {
    return {
        label, 
        key
    };
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
        tagIcon.src = './assets/icons/delete.svg';
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
 * @param {boolean} isOpen 
 */
export const renderEmptyMessage = (target, shouldDisplayMsg, isOpen) => {
    const noResultsText = target.querySelector('.no-result');

    noResultsText.style.display = shouldDisplayMsg && isOpen
        ? 'initial' 
        : 'none';
};