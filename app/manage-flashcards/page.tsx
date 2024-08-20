'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { collection, query, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function ManageFlashcardsPage() {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [subjects, setSubjects] = useState<string[]>([]);
  const [newSubject, setNewSubject] = useState<string>("");

  useEffect(() => {
    if (!isLoaded) return; // Wait until Clerk is fully loaded

    // Redirect to sign-in if not authenticated
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }

    if (isSignedIn && userId) {
      const fetchSubjects = async () => {
        const q = query(collection(db, "users", userId, "subjects"));
        const querySnapshot = await getDocs(q);
        const subjectList: string[] = [];
        querySnapshot.forEach((doc) => {
          subjectList.push(doc.id);
        });
        setSubjects(subjectList);
      };
      fetchSubjects();
    }
  }, [isLoaded, isSignedIn, userId, router]);

  const addSubject = async () => {
    if (newSubject.trim() && userId) {
      try {
        const subjectRef = doc(db, "users", userId, "subjects", newSubject.trim());
        await setDoc(subjectRef, { createdAt: new Date() });
        setSubjects([...subjects, newSubject.trim()]);
        setNewSubject("");
      } catch (error) {
        console.error("Error writing to Firestore:", error);
      }
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex flex-col items-center p-4">
      <header className="w-full max-w-3xl text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Your Flashcards</h1>
      </header>

      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mb-6">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 bg-white text-gray-800"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Enter a new subject"
        />
        <button
          onClick={addSubject}
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add Subject
        </button>
        <ul className="mt-6">
          {subjects.map((subject, index) => (
            <li key={index} className="mb-2">
              <a href={`/flashcards/${encodeURIComponent(subject)}`} className="text-lg text-blue-500 hover:underline">
                {subject}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
