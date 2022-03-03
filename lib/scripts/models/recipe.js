export class Recipe {
  #id;
  #name;
  #servings;
  #ingredients;
  #time;
  #description;
  #appliance;
  #ustensils;

  constructor(data) {
    this.#id = data.id;
    this.#name = data.name;
    this.#servings = data.servings;
    this.#ingredients = data.ingredients;
    this.#time = data.time;
    this.#description = data.description;
    this.#appliance = data.appliance;
    this.#ustensils = data.ustensils;
  }

  // Création d'une méthode pour créer le HTML
  get createHTML() {
    return `
            <article>
              <div class="img"></div>
              <div class="informations">
                <div class="title">
                  <h1>${this.#name}</h1>
                  <div class="time">
                    <img src="./assets/icons/time.svg" alt="Icône de temps" />
                    <h2>${this.#time}min</h2>
                  </div>
                </div>
                <div class="content">
                  <ul class="ingredients">
                  ${this.#ingredients
                    .map((ingredient) => {
                      return `
                              <li>
                                <p class="ingredient">${
                                  ingredient.ingredient
                                } : 
                                  <span class="quantity">${
                                    ingredient.quantity || ""
                                  }${ingredient.unit || ""}
                                  </span>
                                </p>
                              </li>
                            `;
                    })
                    .join("")}  
                  </ul>
                  <p class="description">${this.#description}</p>
                </div>
              </div>
            </article>
        `;
  }
}
