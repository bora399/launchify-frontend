//special domains for users but not for freeplan in vercel, later.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  const mainDomain = process.env.NODE_ENV === 'production' 
    ? 'launchify-frontend-theta.vercel.app' 
    : 'localhost:3000';

  if (hostname === mainDomain || hostname === `www.${mainDomain}`) {
    return NextResponse.next();
  }

  const subdomain = hostname.replace(`.${mainDomain}`, '');

  if (subdomain && subdomain !== hostname) {
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}