import { NextResponse } from 'next/server';
import { supabase } from '@/core/database/supabase/client';
import { logger } from '@/core/lib/logger';
import { ResponseCode } from '@/core/types/responseCode';

/**
 * API Route: POST /api/auth/login
 * Xử lý đăng nhập thông tin người dùng, xác thực với Supabase Auth
 * và lưu trữ token an toàn trong HttpOnly Cookies.
 *
 * @param request - Next.js Request object chứa email và password
 * @returns NextResponse chứa trạng thái thành công hoặc lỗi chi tiết
 */
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      logger.error(ResponseCode.AUTH_FAILED, 'Thiếu thông tin email hoặc mật khẩu.');
      return NextResponse.json(
        {
          success: false,
          code: ResponseCode.AUTH_FAILED,
          message: 'Vui lòng cung cấp đầy đủ email và mật khẩu.',
        },
        { status: 400 }
      );
    }

    logger.info('Đang xác thực thông tin đăng nhập với Supabase...', { email });

    // Gọi API của Supabase để xác thực đăng nhập
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      logger.error(ResponseCode.AUTH_FAILED, error.message);
      return NextResponse.json(
        {
          success: false,
          code: ResponseCode.AUTH_FAILED,
          message: error.message,
        },
        { status: 401 }
      );
    }

    const session = data.session;
    const user = data.user;

    if (!session || !user) {
      logger.error(ResponseCode.SYS_ERROR, 'Đăng nhập thành công nhưng không tạo được session.');
      return NextResponse.json(
        {
          success: false,
          code: ResponseCode.SYS_ERROR,
          message: 'Lỗi hệ thống khi thiết lập phiên làm việc.',
        },
        { status: 500 }
      );
    }

    logger.success(ResponseCode.AUTH_SUCCESS, { userId: user.id, email: user.email });

    const response = NextResponse.json({
      success: true,
      code: ResponseCode.AUTH_SUCCESS,
      message: 'Đăng nhập thành công!',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

    // Cấu hình các tùy chọn cho Cookie bảo mật
    const isProduction = process.env.NODE_ENV === 'production';

    // Lưu Access Token trong Cookie HttpOnly (Hết hạn sau 8 giờ tương thích với session cũ)
    response.cookies.set('token', session.access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 28800, // 8 giờ tính bằng giây
    });

    // Lưu User ID trong Cookie để client-side vẫn đọc được nếu cần kiểm tra nhanh (hoặc có thể dùng HTTP-only nếu muốn)
    response.cookies.set('user_id', user.id, {
      httpOnly: false, // Để client-side JS có thể đọc nhanh thông tin ID
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 28800,
    });

    // Lưu Refresh Token trong Cookie HttpOnly để tự động gia hạn (Hết hạn sau 30 ngày)
    if (session.refresh_token) {
      response.cookies.set('refresh_token', session.refresh_token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 ngày
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
