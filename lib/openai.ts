import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateFlashcard(prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 100,
    });

    return response.choices[0]?.message?.content?.trim() || "No flashcard generated.";
  } catch (error) {
    console.error("Error generating flashcard:", error);
    return "Error generating flashcard.";
  }
}
