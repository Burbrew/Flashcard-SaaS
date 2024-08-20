import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

export async function POST(req: Request) {
  try {
    const { priceId, userId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, // Replace with your actual Stripe Price ID
          quantity: 1,
        },
      ],
      mode: 'subscription',
      customer_email: userId, // Assumes Clerk is handling email for user ID
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/canceled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating subscription session:', error.message);
      return NextResponse.json({ error: error.message || 'Unknown error occurred.' }, { status: 500 });
    } else {
      console.error('Unknown error occurred:', error);
      return NextResponse.json({ error: 'An unknown error occurred.' }, { status: 500 });
    }
  }
}
