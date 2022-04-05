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
 */
export const listenersHandler = () => {
    let unsubscribes = [];

    return {
        clearAllListeners: () => {
            unsubscribes.forEach(unsub => unsub());
            unsubscribes = [];
        },
        addEventListener: (target, event, callback) => {
            target.addEventListener(event, callback);
        
            unsubscribes.push(() => {
                target.removeEventListener(event, callback);
            });
        }
    };
};