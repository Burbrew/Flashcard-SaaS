'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const stripe = await stripePromise;
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });
    const session = await response.json();

    if (stripe) {
      await stripe.redirectToCheckout({ sessionId: session.id });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Proceed to Checkout"}
      </button>
    </div>
  );
}
