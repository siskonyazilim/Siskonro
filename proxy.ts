import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CSRF_COOKIE_NAME = 'csrf_token';

function createCsrfToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const originalPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const existingCsrfToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const csrfToken = existingCsrfToken || createCsrfToken();

  // Pass the real browser URL to server metadata builders.
  requestHeaders.set('x-original-url', originalPath);
  // Locale tespiti için rewrite öncesi orijinal path (detectLocale bunu okur)
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (!existingCsrfToken) {
    response.cookies.set({
      name: CSRF_COOKIE_NAME,
      value: csrfToken,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$|api).*)'],
};
