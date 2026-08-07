import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const DEFAULT_LOCALE = 'vn';
const locales = ['vn', 'en']; // Thêm các ngôn ngữ hỗ trợ

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/next-api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/reset-password') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }
  try {
    const res = await fetch(
      `${process.env.INTERNAL_API_BASE_URL}check-redirect-link?link=${pathname}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (res.ok) {
      const data = await res.json();
      const dataRedirect = data?.data;
      if (dataRedirect?.link_redirect) {
        return NextResponse.redirect(
          new URL(dataRedirect?.link_redirect, request.url),
          parseInt(dataRedirect?.status_code) || 301
        );
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Redirect check skipped (API might be down)');
    } else {
      console.error('Redirect check error:', err);
    }
  }

  // ✅ Nếu URL bắt đầu bằng /vn → redirect bỏ /vn
  if (pathname === `/${DEFAULT_LOCALE}`) {
    return NextResponse.redirect(new URL(`/`, request.url));
  }

  if (pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const newPathname = pathname.replace(`/${DEFAULT_LOCALE}`, '');
    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const response = NextResponse.next();
    response.cookies.set('lang', 'en', {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 ngày
    });
    return response;
  }
  // ✅ Nếu không có locale → rewrite về đường dẫn có DEFAULT_LOCALE
  const hasLocale = locales.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!_next|favicon.ico|admin|api).*)'],
};
