/**
 * Fonction pour mettre la 1ère lettre d'une phrase en majuscule
 */
export const capitalize = (string = '') => 
    string.charAt(0).toUpperCase() + string.slice(1);

/** 
 * Fonction de tri alphabétique
 */
export const sortByAlpabeticalOrder = function (a, b) {
    let aa = a.normalize('NFD');
    let bb = b.normalize('NFD');

    if (aa < bb) return -1;
    if (aa > bb) return 1;
    
    return 0;
};

/** 
 * Fonction pour éviter la duplication de 2 strings égales dans une liste
 * @param {string []} acc
 * @param {string} string
 */
export const deduplicateStrings = (acc, string) => 
    acc.includes(string.toLowerCase()) 
        ? acc 
        : acc.concat(string.toLowerCase());


/** 
 * Fonction pour gérer les eventListeners
 * (OnAppUpdate regénèrant tous les render et leurs event)
 * Permet de wraper le nouvel eventListener dans une fonction
 * qui supprime l'ancien avant d'en ajouter de nouveaux 
 */
export const listenersHandler = () => {
    let unsubscribes = [];

    // Retourne un objet qui expose 2 méthodes
    return {
        addEventListener: (target, event, callback) => {
            // Ajout classique d'un eventListener
            target.addEventListener(event, callback);
            
            // On stocke la fonction qui permet d'enlever le listener
            unsubscribes.push(() => {
                target.removeEventListener(event, callback);
            });
        },
        clearAllListeners: () => {
            // Pour chaque fonction... on l'appelle pour supprimer les listeners
            unsubscribes.forEach(unsub => unsub());
            // On réinitilise la liste des listeners à enlever
            unsubscribes = [];
        }
    };
};