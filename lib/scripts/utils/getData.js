// Fonction de fetch pour récupérer les données du fichier JSON
export const getData = async () =>
  await fetch("data/recipes.json").then((response) => response.json());

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
