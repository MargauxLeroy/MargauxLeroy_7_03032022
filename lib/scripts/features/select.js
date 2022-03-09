import { recipes } from "../index.js";
import { capitalize } from "../utils/getData.js";

// Fonction d'initialisation des events sur les selects'
export const initSelectsEvents = () => {
  const selectElement = document.querySelector(".select-ingredients");
  const selectHeader = document.querySelector(".select-header");

  const selectName = selectHeader.querySelector("h3");
  const selectChevron = selectHeader.querySelector("img");
  const selectInput = selectHeader.querySelector("input");

  const selectList = selectElement.querySelector("ul");

  var isSelectOpen = false;

  // Au clic du select...
  selectElement.addEventListener("click", () => {
    if (!isSelectOpen) {
      selectName.style.display = "none";

      selectInput.style.display = "initial";
      selectList.style.display = "grid";

      selectChevron.style.transform = "rotate(180deg)";

      const ingredients = getAllIngredients(recipes);

      var count = 0;

      ingredients.forEach((ingredient) => {
        count++;
        if (count < 31) {
          const ingredientLi = document.createElement("li");
          ingredientLi.innerHTML = capitalize(ingredient);
          selectList.appendChild(ingredientLi); // TODO: temp > injecter en une seule fois ? + UNE SEULE FOIS
        }
      });

      isSelectOpen = true;
    } else {
      // TODO: ne pas fermer si on est dans l'input ?
      selectName.style.display = "initial";

      selectInput.style.display = "none";
      selectList.style.display = "none";

      selectChevron.style.transform = "rotate(0deg)";

      isSelectOpen = false;
    }
  });
};

// Fonction pour récupérer tous les ingrédients des recettes
const getAllIngredients = (recipes) => {
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

  return ingredientsList;
};
