import { NextResponse } from 'next/server';
import { supabase } from '@/core/database/supabase/client';
import { logger } from '@/core/lib/logger';
import { ResponseCode } from '@/core/types/responseCode';

/**
 * API Route: POST /api/auth/logout
 * Đăng xuất tài khoản, thu hồi session trên máy chủ Supabase Auth
 * và xóa bỏ các Cookie phiên làm việc HttpOnly.
 *
 * @returns NextResponse chứa trạng thái thành công hoặc lỗi chi tiết
 */
export async function POST() {
  try {
    logger.info('Đang xử lý yêu cầu đăng xuất người dùng...');

    // Thu hồi phiên đăng nhập trên máy chủ Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      logger.info('Không thể thu hồi session trên Supabase (có thể đã hết hạn):', error.message);
    } else {
      logger.success(ResponseCode.AUTH_LOGOUT);
    }

    const response = NextResponse.json({
      success: true,
      code: ResponseCode.AUTH_LOGOUT,
      message: 'Đăng xuất thành công!',
    });

    // Cấu hình các tùy chọn cho Cookie
    const isProduction = process.env.NODE_ENV === 'production';

    // Xóa cookie token
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 0, // Hết hạn lập tức
    });

    // Xóa cookie user_id
    response.cookies.set('user_id', '', {
      httpOnly: false,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    // Xóa cookie refresh_token
    response.cookies.set('refresh_token', '', {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (err: any) {
    logger.error(ResponseCode.SYS_ERROR, err);
    return NextResponse.json(
      {
        success: false,
        code: ResponseCode.SYS_ERROR,
        message: err.message || 'Đã có lỗi hệ thống xảy ra trong quá trình đăng xuất.',
      },
      { status: 500 }
    );
  }
}
