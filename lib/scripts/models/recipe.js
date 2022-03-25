export class Recipe {
    constructor(data) {
        this._id = data.id;
        this._name = data.name;
        this._servings = data.servings;
        this._ingredients = data.ingredients;
        this._time = data.time;
        this._description = data.description;
        this._appliance = data.appliance;
        this._ustensils = data.ustensils;
    }

    // Création d'une méthode pour créer le HTML
    get createHTML() {
        return `
            <article>
              <div class="img"></div>
              <div class="informations">
                <div class="header">
                  <h1 class="title">${this._name}</h1>
                  <div class="time">
                    <img src="./assets/icons/time.svg" alt="Icône de temps" />
                    <h2>${this._time}min</h2>
                  </div>
                </div>
                <div class="content">
                  <ul class="ingredients">
                  ${this._ingredients.map((ingredient) =>
        `
                  <li>
                    <p class="ingredient">
                    ${ingredient.ingredient}
                    :  
                      <span class="quantity">
                        ${ingredient.quantity || ''}
                        ${ingredient.unit || ''}
                      </span>
                    </p>
                  </li>
      `
    )
        .join('')}  
                  </ul>
                  <p class="description">${this._description}</p>
                </div>
              </div>
            </article>
        `;
    }
}
