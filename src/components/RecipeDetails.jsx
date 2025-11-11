import ReactMarkdown from "react-markdown";
export default function ClaudeRecipe({ recipe }) {
  return (
    <>
      <h2>Recipe Genie recommends:</h2>
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </>
  );
}
