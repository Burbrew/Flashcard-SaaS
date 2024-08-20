import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function testGenerateFlashcard() {
  try {
    const response = await openai.completions.create({
      model: "gpt-4o-mini",
      prompt: "This is a test prompt",
      max_tokens: 100,
    });

    console.log("Generated Flashcard:", response.choices[0].text?.trim());
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
  }
}
