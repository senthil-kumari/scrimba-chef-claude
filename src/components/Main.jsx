import { useRef, useState, useEffect } from "react";
import RecipeDetails from "./RecipeDetails.jsx";
import IngredientsList from "./IngredientsList";
import { getRecipeFromAI } from "../ai.js";
import { SpinnerOverlay } from "./SpinnerOverlay.jsx";
import { v4 as uuidv4 } from "uuid";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const recipeContentRef = useRef(null);

  let placeholderText;
  const n = ingredients.length;
  switch (true) {
    case n === 0:
      placeholderText = "Enter your first ingredient here...";
      break;
    case n <= 3:
      placeholderText = `Enter ingredient no. ${n + 1}`;
      break;
    case n >= 4:
      placeholderText = `Add another ingredient (Optional)`;
  }
  const inputMessage =
    ingredients.length >= 4
      ? "Ready to cook!✨ Keep adding if you like."
      : "Add at least 4 ingredients to generate your recipe.";

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
    const ingredientInput = formData.get("ingredient").trim();
    if (!ingredientInput) return;
    const newIngredient = {
      id: uuidv4(), // <--- This is your unique ID
      name: ingredientInput,
    };
    setIngredients((prevIngredients) => {
      if (
        prevIngredients.some(
          (i) => i.name.toLowerCase() === ingredientInput.toLowerCase()
        )
      ) {
        return prevIngredients; // prevent duplicates
      }
      return [...prevIngredients, newIngredient];
    });
  }

  async function getRecipe() {
    setIsLoading(true);
    const recipeMarkdown = await getRecipeFromAI(
      ingredients.map((ingredient) => ingredient.name)
    );
    setRecipe(recipeMarkdown);
    setIsLoading(false);
  }

  return (
    <main>
      <p>{inputMessage}</p>
      <form className="add-ingredient-form" action={addIngredient}>
        <input
          placeholder={placeholderText}
          aria-label="Add Ingredient"
          type="text"
          name="ingredient"
          required
          className="input-box"
        />
        <button className="add-button">Add Ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          updateIngredients={setIngredients}
        />
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
