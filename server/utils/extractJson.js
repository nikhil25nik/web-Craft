export const extractJson = async (text) => {
  if (!text) {
    
    return null;
  }

  // Convert objects to string if necessary
  if (typeof text !== "string") {
    
    text = JSON.stringify(text);
  }

  const cleaned = text
    .replace(/```[a-z]*\n?/gi, "")
    .replace(/```$/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    return null;
  }

  try {
    return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
  } catch (err) {
   
    return null;
  }
};