import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

const hf = new InferenceClient(import.meta.env.VITE_HF_ACCESS_TOKEN);

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  const userContent = `${SYSTEM_PROMPT}. I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`;
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai",
      messages: [
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error(err.message);
  }
}
