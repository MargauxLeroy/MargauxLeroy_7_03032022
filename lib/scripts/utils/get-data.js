import { sortByAlpabeticalOrder } from './helpers.js';

/**
// Fonction de fetch pour récupérer les données du fichier JSON
 */
export const getData = async () =>
    await fetch('data/recipes.json').then((response) => response.json());

/**
// Fonction pour récupérer tous les ingrédients des recettes
 */
export const getAllIngredients = (recipes) => {
    const ingredientsList = [];

    recipes.forEach((recipe) => {
        const rIngredients = recipe.ingredients;

        rIngredients.forEach((ingredient) => {
            const ingredientLabel = ingredient.ingredient;

            const ingredientIsAlreadyInList = ingredientsList.includes(
                ingredientLabel.toLowerCase()
            );

            if (!ingredientIsAlreadyInList) {
                ingredientsList.push(ingredientLabel.toLowerCase());
            }
        });
    });

    sortByAlpabeticalOrder(ingredientsList);
    return ingredientsList;
};

// Fonction pour récupérer tous les ustensiles des recettes
// export const getAllUstensils = (recipes) => {
//   const ustensilsList = [];

//   recipes.forEach((recipe) => {
//     const rUstensils = recipe.ustensils;

//     rUstensils.forEach((ustensil) => {
//       const ustensilIsAlreadyInList = ustensilsList.includes(
//         ustensil.toLowerCase()
//       );

//       if (!ustensilIsAlreadyInList) {
//         ustensilsList.push(ustensil.toLowerCase());
//       }
//     });
//   });

//   sortByAlpabeticalOrder(ustensilsList);
//   return ustensilsList;
// };

// Fonction pour mettre une majuscule sur la première lettre d'une string




