// Fonction de fetch pour récupérer les données du fichier JSON
export const getData = async () =>
  await fetch("data/recipes.json").then((response) => response.json());

// Fonction pour mettre une majuscule sur la première lettre d'une string
export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
