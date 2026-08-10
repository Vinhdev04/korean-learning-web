import { NextResponse } from 'next/server';
import { supabase } from '@/core/database/supabase/client';
import { logger } from '@/core/lib/logger';
import { ResponseCode } from '@/core/types/responseCode';

/**
 * API Route: POST /api/auth/refresh
 * Gia hạn Access Token mới bằng cách gửi Refresh Token hợp lệ lên Supabase Auth API.
 * Giúp duy trì session của người dùng tự động mà không bị logout giữa chừng.
 *
 * @param request - Next.js Request object
 * @returns NextResponse chứa token mới hoặc báo lỗi hết hạn session
 */
export async function POST(request: Request) {
  try {
    // Đọc refresh_token từ Cookie
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = parseCookies(cookieHeader);
    const refreshToken = cookies['refresh_token'];

    if (!refreshToken) {
      logger.info('Không tìm thấy refresh_token cookie để gia hạn.');
      return NextResponse.json(
        {
          success: false,
          code: ResponseCode.AUTH_EXPIRED,
          message: 'Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.',
        },
        { status: 401 }
      );
    }

    logger.info('Đang gửi yêu cầu gia hạn session lên Supabase Auth...');

    // Gọi API của Supabase để gia hạn session bằng refresh_token
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error || !data.session || !data.user) {
      logger.error(ResponseCode.AUTH_EXPIRED, error?.message || 'Không lấy được session mới.');

      // Xóa các cookie cũ bị hỏng
      const errResponse = NextResponse.json(
        {
          success: false,
          code: ResponseCode.AUTH_EXPIRED,
          message: 'Gia hạn phiên làm việc thất bại. Vui lòng đăng nhập lại.',
        },
        { status: 401 }
      );

      const isProduction = process.env.NODE_ENV === 'production';
      errResponse.cookies.set('token', '', {
        path: '/',
        maxAge: 0,
        httpOnly: true,
        secure: isProduction,
      });
      errResponse.cookies.set('user_id', '', {
        path: '/',
        maxAge: 0,
        httpOnly: false,
        secure: isProduction,
      });
      errResponse.cookies.set('refresh_token', '', {
        path: '/',
        maxAge: 0,
        httpOnly: true,
        secure: isProduction,
      });

      return errResponse;
    }

    const session = data.session;
    const user = data.user;

    logger.success(ResponseCode.SYS_SUCCESS, {
      message: 'Gia hạn session thành công!',
      email: user.email,
    });

    const response = NextResponse.json({
      success: true,
      code: ResponseCode.SYS_SUCCESS,
      message: 'Gia hạn phiên làm việc thành công!',
      user: {
        id: user.id,
        email: user.email,
      },
    });

    const isProduction = process.env.NODE_ENV === 'production';

    // Lưu Access Token mới (Hết hạn sau 8 giờ)
    response.cookies.set('token', session.access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 28800,
    });

    // Cập nhật User ID nếu cần
    response.cookies.set('user_id', user.id, {
      httpOnly: false,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 28800,
    });

    // Lưu Refresh Token mới (Hết hạn sau 30 ngày)
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
    return NextResponse.json(
      {
        success: false,
        code: ResponseCode.SYS_ERROR,
        message: err.message || 'Đã có lỗi hệ thống xảy ra.',
      },
      { status: 500 }
    );
  }
}

/**
 * Hàm tiện ích phân tách chuỗi cookie header thành object key-value
 * @param cookieHeader - Chuỗi Cookie header thô từ request
 * @returns Object chứa danh sách cookie dạng { [key: string]: string }
 */
function parseCookies(cookieHeader: string): { [key: string]: string } {
  const list: { [key: string]: string } = {};
  if (!cookieHeader) return list;

  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    const name = parts.shift()?.trim();
    const value = parts.join('=')?.trim();
    if (name) {
      list[name] = decodeURIComponent(value);
    }
  });

  return list;
}
