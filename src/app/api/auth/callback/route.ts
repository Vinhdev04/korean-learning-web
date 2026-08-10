import { NextResponse } from 'next/server';
import { supabase } from '@/core/database/supabase/client';
import { logger } from '@/core/lib/logger';
import { ResponseCode } from '@/core/types/responseCode';

/**
 * API Route: GET /api/auth/callback
 * Xử lý callback chuyển hướng sau khi đăng nhập qua Google OAuth.
 * Đổi mã code lấy Session Token của Supabase và thiết lập HttpOnly Cookies.
 *
 * @param request - Next.js Request object chứa query code
 * @returns NextResponse thực hiện chuyển hướng về trang admin hoặc login
 */
export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const nextPath = requestUrl.searchParams.get('next') || '/admin';

    if (!code) {
      logger.error(ResponseCode.AUTH_FAILED, 'Không tìm thấy query code trong callback.');
      return NextResponse.redirect(new URL('/login?error=missing_code', request.url));
    }

    logger.info('Đang đổi mã code OAuth lấy session từ Supabase...', { code: code.substring(0, 10) + '...' });

    // Đổi auth code lấy Session Token chính thức
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.session || !data.user) {
      logger.error(ResponseCode.AUTH_FAILED, error?.message || 'Đổi auth code lấy session thất bại.');
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error?.message || 'exchange_failed')}`, request.url));
    }

    const session = data.session;
    const user = data.user;

    logger.success(ResponseCode.AUTH_SUCCESS, { message: 'Đăng nhập Google OAuth thành công!', email: user.email });

    // Tạo phản hồi chuyển hướng về trang admin
    const response = NextResponse.redirect(new URL(nextPath, request.url));
    const isProduction = process.env.NODE_ENV === 'production';

    // Thiết lập Access Token HttpOnly Cookie
    response.cookies.set('token', session.access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 28800,
    });

    // Thiết lập User ID Cookie
    response.cookies.set('user_id', user.id, {
      httpOnly: false,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 28800,
    });

    // Thiết lập Refresh Token HttpOnly Cookie
    if (session.refresh_token) {
      response.cookies.set('refresh_token', session.refresh_token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return response;
  } catch (err: any) {
    logger.error(ResponseCode.SYS_ERROR, err);
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(err.message || 'sys_error')}`, request.url));
  }
}
