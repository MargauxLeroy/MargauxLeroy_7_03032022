// Fonction pour mettre la 1ère lettre d'une phrase en majuscule
export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Fonction pour trier par ordre alphabétique
export const sortByAlpabeticalOrder = (array) => {
    array.sort(function (a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });
};