'use client';

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-green-300 p-4">
      <h1 className="text-3xl font-bold text-green-800 mb-4">Payment Successful!</h1>
      <p className="text-lg text-green-700 mb-6">Thank you for subscribing to our service.</p>
      <Link href="/manage-flashcards" className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300">
        Manage Your Flashcards
      </Link>
      <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
        Go to Homepage
      </Link>
    </div>
  );
}
