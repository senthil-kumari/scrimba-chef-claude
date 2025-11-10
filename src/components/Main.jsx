import { useRef, useState, useEffect } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../ai.js";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const recipeContentRef = useRef(null);

  // Scroll to the recipe section
  useEffect(() => {
    if (recipe.length > 0 && recipeContentRef.current) {
      recipeContentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [recipe]);

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }
  return (
    <main>
      <p>Add a list of Ingredients to create a recipe</p>
      <form className="add-ingredient-form" action={addIngredient}>
        <input
          placeholder="e.g. Oregano"
          aria-label="Add Ingredient"
          type="text"
          name="ingredient"
        />
        <button>Add Ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}
      {recipe && (
        <section
          ref={recipeContentRef}
          className="suggested-recipe-container"
          aria-live="polite"
        >
          <ClaudeRecipe recipe={recipe} />
        </section>
      )}
    </main>
  );
}
