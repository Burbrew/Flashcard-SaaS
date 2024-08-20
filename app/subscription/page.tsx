'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SubscriptionPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);

    const response = await fetch('/api/create-subscription-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: 'your_stripe_price_id', // Replace with your actual Stripe Price ID
        userId: userId, // Clerk User ID
      }),
    });

    const data = await response.json();
    if (data.url) {
      router.push(data.url); // Redirect to Stripe checkout
    } else {
      setLoading(false);
      alert('Failed to create subscription session');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Subscribe to Our Service</h1>
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Subscribe Now'}
      </button>
    </div>
  );
}
