import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const DEFAULT_LOCALE = 'vn';
const locales = ['vn', 'en']; // Thêm các ngôn ngữ hỗ trợ

/**
 * Next.js Middleware xử lý định tuyến đa ngôn ngữ, chuyển hướng link
 * và bảo vệ các tuyến đường quản trị (/admin/*) bằng cách kiểm tra Session Token từ HttpOnly Cookies.
 *
 * @param request - Next.js Request object
 * @returns NextResponse thực hiện chuyển hướng, rewrite hoặc đi tiếp
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const userId = request.cookies.get('user_id')?.value;

  // Tách segments của pathname để phân tích locale và kiểm tra admin route
  const segments = pathname.split('/');
  const hasLocalePrefix = locales.includes(segments[1]);
  // Đường dẫn gốc sau khi loại bỏ locale prefix (ví dụ: '/vn/admin' thành '/admin')
  const cleanPath = hasLocalePrefix ? '/' + segments.slice(2).join('/') : pathname;

  // Bỏ qua kiểm tra middleware cho các file tĩnh và API routes nội bộ
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/next-api') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 1. Kiểm tra bảo vệ các tuyến đường Admin CMS (/admin/*)
  if (cleanPath.startsWith('/admin')) {
    if (!token || !userId) {
      // Nếu chưa đăng nhập, chuyển hướng về trang login tương ứng với locale hiện tại
      const currentLocale = hasLocalePrefix ? segments[1] : DEFAULT_LOCALE;
      loggerMiddlewareWarn('Chưa đăng nhập, chuyển hướng về trang Login.', pathname);
      return NextResponse.redirect(new URL(`/${currentLocale}/login`, request.url));
    }
  }

  // 2. Kiểm tra nếu đã đăng nhập mà cố tình vào trang Login/Register
  const isAuthPage =
    cleanPath === '/login' || cleanPath === '/register' || cleanPath === '/reset-password';
  if (isAuthPage && token && userId) {
    const currentLocale = hasLocalePrefix ? segments[1] : DEFAULT_LOCALE;
    loggerMiddlewareInfo(
      'Đã đăng nhập, tự động chuyển hướng từ Auth Page vào Dashboard.',
      pathname
    );
    return NextResponse.redirect(new URL(`/${currentLocale}/admin/dashboard`, request.url));
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

/**
 * Hàm log cảnh báo của Middleware sử dụng console màu sắc
 */
function loggerMiddlewareWarn(message: string, path: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`\x1b[33m%s\x1b[0m`, `[Middleware WARNING] ${message} - Path: ${path}`);
  }
}

/**
 * Hàm log thông tin của Middleware sử dụng console màu sắc
 */
function loggerMiddlewareInfo(message: string, path: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`\x1b[36m%s\x1b[0m`, `[Middleware INFO] ${message} - Path: ${path}`);
  }
}

export const config = {
  // OLD: matcher: ['/', '/((?!_next|favicon.ico|admin|api).*)'],
  matcher: ['/', '/((?!_next|favicon.ico|api).*)'],
};
