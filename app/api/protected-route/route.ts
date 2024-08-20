import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.redirect('/sign-in');
  }

  return NextResponse.json({ message: 'You are authenticated!' });
}
