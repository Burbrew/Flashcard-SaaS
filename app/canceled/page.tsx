'use client';

import Link from 'next/link';

export default function CanceledPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-100 to-red-300 p-4">
      <h1 className="text-3xl font-bold text-red-800 mb-4">Payment Canceled</h1>
      <p className="text-lg text-red-700 mb-6">Your subscription was not completed.</p>
      <Link href="/subscription" className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300">
        Try Again
      </Link>
      <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
        Go to Homepage
      </Link>
    </div>
  );
}
