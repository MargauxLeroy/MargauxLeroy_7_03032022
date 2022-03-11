import { createRecipes } from '../index.js';

// const noRecipeText = document.querySelector('.no-recipe');
const searchInput = document.getElementById('search-input');

/**
 * FONCTION DE RECHERCHE
 * @param {Object []} recipes
 */
export const filterRecipes = (recipes) => {
    // Au changement de l'input...
    searchInput.addEventListener('input', (event) => {
        const inputValue = event.target.value.toLowerCase();
        const filteredRecipes = [];

        // Si la valeur de l'input est supérieure ou égale à 3
        if (inputValue.length >= 3) {
            console.log(`inputValue : ${inputValue}`);

            // Pour chaque recette...
            for (let i = 0; i < recipes.length; i++) {
                const recipe = recipes[i];

                const rName = recipe.name.toLowerCase();
                const rDescription = recipe.description.toLowerCase();
                const rIngredients = recipe.ingredients;

                let isIngredientMatch = false;

                // Pour chaque ingrédient...
                for (let i = 0; i < rIngredients.length; i++) {
                    const rIngredient = rIngredients[i].ingredient.toLowerCase();
                    // Si l'ingrédient contient la valeur de la recherche...
                    if (rIngredient.includes(inputValue)) {
                        isIngredientMatch = true;
                    }
                }

                // Si le titre ou la description contient la valeur de la recherche...
                if (rName.includes(inputValue) || rDescription.includes(inputValue) || isIngredientMatch) {
                    filteredRecipes.push(recipe);
                }
            }

            // On recréer les recettes basées sur la nouvelle liste filtrée
            createRecipes(filteredRecipes);

            // Si la valeur de la recherche fait moins de 3 caractères
        } else if (inputValue.length < 3) {
            // On recréer la liste
            createRecipes(recipes);
        }
    });
};
