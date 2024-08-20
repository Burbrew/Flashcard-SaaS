'use client';

import { useState } from "react";
import { useRouter } from 'next/router';
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import 'katex/dist/katex.min.css'; // Import KaTeX CSS for proper styling

export default function FlashcardsPage() {
  const router = useRouter();
  const { subject } = router.query;
  const decodedSubject = decodeURIComponent(subject as string); // Decode the subject from the URL

  const [prompt, setPrompt] = useState<string>("");
  const [flashcards, setFlashcards] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const createFlashcards = async () => {
    if (!prompt || !decodedSubject) {
      alert("Please enter a prompt."); // Ensure the prompt is filled
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/generate-flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, subject: decodedSubject }), // Send decoded subject in the request
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards.");
      }

      const data = await response.json();
      if (data.flashcards && Array.isArray(data.flashcards)) {
        setFlashcards(data.flashcards); // Store all flashcards in the state as an array
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error generating flashcards:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{decodedSubject} Flashcards</h1>
      <div className="w-full max-w-lg bg-black rounded-lg shadow-lg p-6">
      <textarea
        className="w-full h-32 p-4 border bg-white text-black !important rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt (e.g., 'Calculus 1 concepts')"
      />


        <button
          onClick={createFlashcards}
          disabled={loading}
          className="w-full mt-4 p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Flashcards"}
        </button>
      </div>

      {flashcards.length > 0 && (
        <div className="mt-8 w-full max-w-lg space-y-4">
          {flashcards.map((flashcard, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <ReactMarkdown
                className="text-gray-800"
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {flashcard}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
