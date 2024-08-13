export { default } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { CustomJWT } from './types/CustomJWT';

export async function middleware(req: NextRequest) {
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as CustomJWT;

  if (!token || (token.tokenExpires && Date.now() > token.tokenExpires)) {
    const loginUrl = new URL('/auth', req.url);

    loginUrl.searchParams.set('callbackUrl', req.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = { matcher: ['/profile'] };
