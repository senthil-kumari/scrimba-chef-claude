export default function IngredientsList({
  ingredients,
  getRecipe,
  updateIngredients,
}) {
  function removeIngredient(id) {
    const updatedIngredients = ingredients.filter((ingredient) => {
      return ingredient.id != id;
    });
    updateIngredients(updatedIngredients);
  }
  return (
    <section>
      <h2 className="ingredients-title">Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <div className="list-item">
              <span>{ingredient.name}</span>
              <button
                onClick={() => removeIngredient(ingredient.id)}
                className="remove-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  class="lucide lucide-x"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      {ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={getRecipe}>✨ Get a Recipe</button>
        </div>
      )}
    </section>
  );
}
