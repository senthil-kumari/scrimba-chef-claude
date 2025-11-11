export async function getRecipeFromAI(ingredientsArr) {
  const res = await fetch("/api/generateRecipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredientsArr }),
  });
  const data = await res.json();
  return data.recipe;
}
