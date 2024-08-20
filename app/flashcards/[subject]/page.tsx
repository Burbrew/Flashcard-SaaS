'use client';

import { useEffect, useState } from "react";
import Link from 'next/link'; 
import { collection, query, getDocs, doc, addDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import Flashcard from "../../components/Flashcard";
import { useAuth } from '@clerk/nextjs';

export default function SubjectFlashcardsPage({ params }: { params: { subject: string } }) {
  const { userId, isLoaded } = useAuth();
  const [flashcards, setFlashcards] = useState<string[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [generatedFlashcards, setGeneratedFlashcards] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { subject } = params;

  useEffect(() => {
    if (isLoaded && userId) {
      const fetchFlashcards = async () => {
        const q = query(collection(db, "users", userId, "subjects", subject, "flashcards"));
        const querySnapshot = await getDocs(q);
        const flashcardsList: string[] = [];
        querySnapshot.forEach((doc) => {
          flashcardsList.push(...doc.data().flashcards);
        });
        setFlashcards(flashcardsList);
      };
      fetchFlashcards();
    }
  }, [isLoaded, userId, subject]);

  const generateFlashcards = async () => {
    if (!prompt) return;

    setLoading(true);
    try {
      const response = await fetch('/api/generate-flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, subject }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards.");
      }

      const data = await response.json();
      if (data.flashcards && Array.isArray(data.flashcards)) {
        setGeneratedFlashcards(data.flashcards);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error generating flashcards:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveFlashcard = async (flashcard: string, index: number) => {
    if (userId && subject) {
      const flashcardsRef = collection(db, "users", userId, "subjects", subject, "flashcards");
      await addDoc(flashcardsRef, { flashcards: [flashcard], createdAt: new Date() });

      // Remove the flashcard from the generated list
      setGeneratedFlashcards(generatedFlashcards.filter((_, i) => i !== index));

      // Add the flashcard to the saved flashcards list
      setFlashcards([...flashcards, flashcard]);
    }
  };

  const discardFlashcard = (index: number) => {
    setGeneratedFlashcards(generatedFlashcards.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex flex-col items-center p-4">
      {/* Back to Homepage Button */}
      <Link href="/" className="mb-4 px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-300">
        Back to Homepage
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">{subject} Flashcards</h1>

      {/* Flashcard Generation */}
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mb-6">
        <textarea
          className="w-full h-32 p-4 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt (e.g., 'Calculus 1 concepts')"
        />
        <button
          onClick={generateFlashcards}
          disabled={loading}
          className="w-full mt-4 p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Flashcards"}
        </button>
      </div>

      {/* Display and Manage Generated Flashcards */}
      {generatedFlashcards.length > 0 && (
        <div className="w-full max-w-lg space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Generated Flashcards</h2>
          {generatedFlashcards.map((flashcard, index) => (
            <div key={index}>
              <Flashcard content={flashcard} />
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => saveFlashcard(flashcard, index)}
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Keep
                </button>
                <button
                  onClick={() => discardFlashcard(index)}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Discard
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Display Saved Flashcards */}
      {flashcards.length > 0 && (
        <div className="mt-8 w-full max-w-lg space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Saved Flashcards</h2>
          {flashcards.map((flashcard, index) => (
            <Flashcard key={index} content={flashcard} />
          ))}
        </div>
      )}
    </div>
  );
}
