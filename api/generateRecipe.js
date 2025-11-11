import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.HF_ACCESS_TOKEN);

export default async function handler(req, res) {
  const { ingredientsArr } = req.body;
  if (!ingredientsArr || !Array.isArray(ingredientsArr)) {
    return res.status(400).json({ error: "ingredientsArr must be an array" });
  }
  const ingredientsString = ingredientsArr.join(", ");

  const userContent = `Based *only* on the following ingredients: **${ingredientsString}**, suggest a delicious and common dish that can be prepared.

After suggesting the dish, immediately generate the complete recipe for that dish.

**Strict Recipe Rules:**
* Do not feel obligated to use every ingredient from the provided list.
* The recipe is permitted to include supplementary ingredients not listed by the user.
* Limit supplementary (unlisted) ingredients to no more than three standard items

The entire response must be formatted **strictly in Markdown** using the structure below. Do not include any introductory text, explanation, or conversational phrases.

**Structure to Follow:**

# [DISH NAME]

## 🥕 Ingredients

* **[Amount]** [Unit] [Ingredient 1]
* ... (All required ingredients from the provided list, with realistic quantities)

## 👨‍🍳 Instructions

1.  [Step 1]
2.  [Step 2]
3.  ...

## 💡 Notes (Optional)
`;
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

    res.status(200).json({ recipe: response.choices[0].message.content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
}
