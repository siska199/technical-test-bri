import authConfig from '@/auth.config';
import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }
});
