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
    return appData.recipes
        // Filtration des recettes via la recherche globale V2
        .filter(recipe => 
            appData.searchValue.length < 4 || 
            recipe.name.toLowerCase().includes(appData.searchValue) 
                || recipe.description.toLowerCase().includes(appData.searchValue) 
                || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(appData.searchValue))
        )
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
        
    // Filtration des recettes via la recherche globale V1
    // const recipes = [...appData.recipes];
    // const inputValue = appData.searchInput;
    
    // // Pour chaque recette...
    // for (let i = 0; i < recipes.length; i++) {
    //     const recipe = recipes[i];

    //     const rName = recipe.name.toLowerCase();
    //     const rDescription = recipe.description.toLowerCase();
    //     const rIngredients = recipe.ingredients;

    //     let isIngredientMatch = false;

    //     // Pour chaque ingrédient...
    //     for (let i = 0; i < rIngredients.length; i++) {
    //         const rIngredient = rIngredients[i].ingredient.toLowerCase();
    //         // Si l'ingrédient contient la valeur de la recherche...
    //         if (rIngredient.includes(inputValue)) {
    //             isIngredientMatch = true;
    //         }
    //     }

    //     // Si le titre ou la description contient la valeur de la recherche...
    //     if (rName.includes(inputValue) || rDescription.includes(inputValue) || isIngredientMatch) {
    //         recipes.push(recipe);
    //     }
    // }

    // return recipes
};

/**
 * Fonction de fetch pour récupérer les données du fichier JSON
 */
export const getData = async () => {
    const response = await fetch('data/recipes.json').then((response) => response.json());
    appData.recipes = response.recipes;

    return response;
};

/**
 * Fonction pour récupérer tous les ingrédients des recettes
 * @param {Recipe []} recipes
 */
export const getAllIngredients = (recipes, searchStr) => {
    return recipes
        .map((recipe) => recipe.ingredients)
        .flat()
        .map((ingredient => ingredient.ingredient))
        .reduce(deduplicateStrings, [])
        .sort(sortByAlpabeticalOrder)
        .filter(ingredient => ingredient.match(searchStr));
};

/**
 * Fonction pour récupérer tous les ustensiles des recettes
 * @param {Recipe []} recipes
 */
export const getAllUstensils = (recipes) => {
    return recipes
        .map((recipe) => recipe.ustensils)
        .flat()
        .reduce(deduplicateStrings, [])
        .sort(sortByAlpabeticalOrder);
};

/**
 * Fonction pour récupérer tous les appareils des recettes
 * @param {Recipe []} recipes
 */
export const getAllAppliances = (recipes) => {
    return recipes
        .map((recipe) => recipe.appliance)
        .reduce(deduplicateStrings, [])
        .sort(sortByAlpabeticalOrder);
};





