import { sortByAlpabeticalOrder, deduplicateStrings } from './helpers.js';

/**
 * Objet global contenant toutes les données de l'application
 */
export const appData = {
    recipes: [],
    searchValue: '',

    ingredients: {
        isSelectOpen: false,
        searchValue: '',
        tags: [],
    },

    ustensils: {
        isSelectOpen: false,
        searchValue: '',
        tags: [],
    },

    appliances: {
        isSelectOpen: false,
        searchValue: '',
        tags: [],
    },
};

/**
 * Fonction de mise à jour des recettes 
 * en fonction de la recherche globale et des selects
 */
export const getFilteredRecipes = () => {
    const recipes = [...appData.recipes];
    const inputValue = appData.searchValue;

    // Filtration des recettes via la recherche globale V1
    let filteredRecipes = [];
    
    // Si la longueur du texte du champ de recherche est inférieur à 4...
    if(inputValue.length > 3) {
        // Pour chaque recette...
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];

            const rName = recipe.name.toLowerCase();
            const rDescription = recipe.description.toLowerCase();
            const rIngredients = recipe.ingredients;

            let doesIngredientMatch = false;

            // Pour chaque ingrédient...
            for (let i = 0; i < rIngredients.length; i++) {
                const rIngredient = rIngredients[i].ingredient.toLowerCase();
                // Si l'ingrédient contient la valeur de la recherche...
                if (rIngredient.includes(inputValue)) {
                    doesIngredientMatch = true;
                }
            }

            // Si le titre ou la description contient la valeur de la recherche...
            if (rName.includes(inputValue) || rDescription.includes(inputValue) || doesIngredientMatch) {
                filteredRecipes.push(recipe);
            }
        }
    } else {
        filteredRecipes = recipes;
    }

    return filteredRecipes
        // Filtration des recettes via le select ingrédients
        .filter(recipe => 
            appData.ingredients.tags.every(selectedIngredient => 
                recipe.ingredients.map(i => i.ingredient.toLowerCase())                
                    .some(ingredient => ingredient === selectedIngredient.toLowerCase())
            )                
        )
        // Filtration des recettes via le select ustensiles
        .filter(recipe => 
            appData.ustensils.tags.every(selectedUstensil => 
                recipe.ustensils.some(ustensil => 
                    ustensil.toLowerCase() === selectedUstensil.toLowerCase())
            )                
        )
        // Filtration des recettes via le select appareils
        .filter(recipe => 
            appData.appliances.tags.every(selectedAppliance => 
                recipe.appliance.toLowerCase() === selectedAppliance.toLowerCase())
        );
};

/**
 * Fonction de fetch pour récupérer les données du fichier JSON
 * @returns {Promise<Object>}
 */
export const getData = async () => {
    const response = await fetch('data/recipes.json').then((response) => response.json());
    appData.recipes = response.recipes;

    return response;
};

/**
 * Fonction pour récupérer tous les ingrédients des recettes
 * @param {Recipe []} recipes
 * @param {string} searchStr
 * @returns {string []}
 */
export const getAllIngredients = (recipes, searchStr) => {
    return recipes
        .map((recipe) => recipe.ingredients) // Pour chaque recette, retourne les ingrédients (liste)
        .flat() // Transforme Array<Array<T>> en Array<T>
        .map((ingredient => ingredient.ingredient))
        .reduce(deduplicateStrings, []) 
        .sort(sortByAlpabeticalOrder)
        .filter(ingredient => ingredient.match(searchStr));
};

/**
 * Fonction pour récupérer tous les ustensiles des recettes
 * @param {Recipe []} recipes
 * @param {string} searchStr
 * @returns {string []}
 */
export const getAllUstensils = (recipes, searchStr) => {
    return recipes
        .map((recipe) => recipe.ustensils)
        .flat()
        .reduce(deduplicateStrings, [])
        .sort(sortByAlpabeticalOrder)
        .filter(ustensil => ustensil.match(searchStr));
};

/**
 * Fonction pour récupérer tous les appareils des recettes
 * @param {Recipe []} recipes
 * @param {string} searchStr
 * @returns {string []}
 */
export const getAllAppliances = (recipes, searchStr) => {
    return recipes
        .map((recipe) => recipe.appliance)
        .reduce(deduplicateStrings, [])
        .sort(sortByAlpabeticalOrder)
        .filter(appliance => appliance.match(searchStr));        
};





