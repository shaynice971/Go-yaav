import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const PUBLIC_PATHS = ['/', '/connexion', '/inscription'];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isPublic = PUBLIC_PATHS.includes(pathname);

  const token = req.cookies.get('sb-access-token')?.value
    ?? req.cookies.get(`sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0]}-auth-token`)?.value;

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/connexion', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
