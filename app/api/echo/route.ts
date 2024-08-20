import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) { // Update to NextRequest
  const { userId } = getAuth(request); // Get the user ID from Clerk's getAuth
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { prompt } = await request.json();
  return NextResponse.json({ text: `Echo: ${prompt}` });
}
