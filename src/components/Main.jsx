import { useRef, useState, useEffect } from "react";
import RecipeDetails from "./RecipeDetails.jsx";
import IngredientsList from "./IngredientsList";
import { getRecipeFromAI } from "../ai.js";
import { SpinnerOverlay } from "./SpinnerOverlay.jsx";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    const recipeMarkdown = await getRecipeFromAI(ingredients);
    setRecipe(recipeMarkdown);
    setIsLoading(false);
  }
  return (
    <main>
      <p>Add a list of ingredients to create a recipe (atleast 4)</p>
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
      <SpinnerOverlay isLoading={isLoading} />
      {recipe && (
        <section
          ref={recipeContentRef}
          className="suggested-recipe-container"
          aria-live="polite"
        >
          <RecipeDetails recipe={recipe} />
        </section>
      )}
    </main>
  );
}
