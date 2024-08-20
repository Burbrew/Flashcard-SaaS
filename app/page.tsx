'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function HomePage() {
  const { userId } = useAuth();
  const router = useRouter();

  // Redirect to "Manage Your Flashcards" if already signed in
  useEffect(() => {
    if (userId) {
      router.push('/manage-flashcards');
    }
  }, [userId, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-4">
      <header className="w-full max-w-3xl text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Flashcard SaaS</h1>
        <p className="text-lg text-gray-700 mb-4">
          Create, manage, and study flashcards easily with our powerful platform. Whether you're preparing for exams, learning new concepts, or just organizing your knowledge, Flashcard SaaS has the tools you need.
        </p>
      </header>

      <main className="w-full max-w-lg flex flex-col items-center space-y-6">
        <button
          onClick={() => router.push('/sign-in')}
          className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Sign In to Get Started
        </button>

        <div className="w-full bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Create and organize flashcards by subjects.</li>
            <li>Save, edit, and delete your flashcards.</li>
            <li>Generate flashcards automatically with AI.</li>
            <li>Study your flashcards with ease and improve retention.</li>
          </ul>
        </div>

        <div className="w-full text-center mt-8">
          <p className="text-gray-700">Don't have an account?</p>
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Sign Up Now
          </Link>
        </div>
      </main>
    </div>
  );
}
