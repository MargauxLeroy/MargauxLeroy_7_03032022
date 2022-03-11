// Helpers
import { capitalize } from '../utils/getData.js';
import { getAllIngredients } from '../utils/getData.js';
// import { getAllUstensils } from "../utils/getData.js";

const ingredientsList = document.querySelector('.ingredients-list');

// Fonction d'initialisation des events sur les selects
export const initSelectsEvents = (recipes) => {
    const selectHeader = document.querySelector('.select-header');
    const selectName = selectHeader.querySelector('h3');
    const selectChevron = selectHeader.querySelector('img');
    const selectInput = selectHeader.querySelector('input');

    // On récupère tous les ingrédients, ustensiles,... disponibles
    const ingredients = getAllIngredients(recipes);
    // const ustensils = getAllUstensils(recipes); // TODO: later

    // On instaure une valeur par défaut : le select est fermé
    let isSelectOpen = false;

    // Au clic du select...
    selectChevron.addEventListener('click', () => {

        // Si le select était fermé...
        if (!isSelectOpen) {
            // On change le style des éléments HTML
            selectName.style.display = 'none';
            selectInput.style.display = 'initial';
            ingredientsList.style.display = 'grid';
            selectChevron.style.transform = 'rotate(180deg)';

            createIngredientsList(ingredients);

            isSelectOpen = true;
        } else {
            // TODO: ne pas fermer si on est dans l'input ?
            selectName.style.display = 'initial';
            selectInput.style.display = 'none';
            ingredientsList.style.display = 'none';
            selectChevron.style.transform = 'rotate(0deg)';

            isSelectOpen = false;
        }
    });

    filterSelectList(ingredients);

};

const createIngredientsList = (ingredients) => {
    ingredientsList.innerHTML = '';
    // let ingredientsElements = [];

    ingredients.forEach((ingredient) => {
        const ingredientLi = document.createElement('li');
        ingredientLi.innerHTML = capitalize(ingredient);
        initIngredientEvent(ingredientLi);
        ingredientsList.appendChild(ingredientLi); // TODO: temp > injecter en une seule fois ?
    // ingredientsElements.push(ingredientLi);
    });

    // initIngredientEvent(ingredientsElements);
    // ingredientsList.appendChild(ingredientsElements); 
};

const initIngredientEvent = (ingredientLi) => {
    const tagsList = document.querySelector('.tags');

    ingredientLi.addEventListener('click', () => {
        let tagElement = createTag(ingredientLi.innerHTML);
        tagsList.appendChild(tagElement);


    // TODO: on re-filter la liste des recettes avec uniquement les ingrédients présents...
    });
};

// Fonction de filtration de la liste du select
const filterSelectList = (selectList) => {
    const searchInput = document.querySelector('.select-input');
    const noResultsElement = document.querySelector('.no-result');

    searchInput.addEventListener('input', (event) => {
        const inputValue = event.target.value.toLowerCase();

        const filteredSelectList = selectList.filter(ingredient =>
            ingredient.toLowerCase().includes(inputValue));


        if (filteredSelectList.length > 1) {
            noResultsElement.style.display = 'none';
        }

        createIngredientsList(filteredSelectList);
        console.log(filteredSelectList);
        console.log(filteredSelectList.length);

        if (filteredSelectList.length == 0) {
            noResultsElement.style.display = 'initial';
        }

    });
};

// Fonction de création d'un tag
const createTag = (label) => {
    // On créé les différents éléments HTML du tag
    const tag = document.createElement('li');
    tag.classList.add('tag');

    const tagText = document.createElement('p');
    tagText.innerHTML = label;

    const tagIcon = document.createElement('img');
    tagIcon.src = '../../../assets/icons/delete.svg';
    tagIcon.alt = 'Supprimer le tag';

    tag.appendChild(tagText);
    tag.appendChild(tagIcon);

    // On instancie l'event au clic de l'icône de suppression
    tagIcon.addEventListener('click', () => {
        deleteTag(tag);
    });

    return tag;
};

// Fonction de suppression d'un tag
const deleteTag = (tag) => {
    tag.remove();
};

