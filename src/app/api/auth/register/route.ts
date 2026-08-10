import { NextResponse } from 'next/server';
import { supabase } from '@/core/database/supabase/client';
import { logger } from '@/core/lib/logger';
import { ResponseCode } from '@/core/types/responseCode';

/**
 * API Route: POST /api/auth/register
 * Xử lý đăng ký tài khoản mới của người dùng thông qua Supabase Auth.
 * Hỗ trợ gửi email xác nhận tự động.
 *
 * @param request - Next.js Request object chứa fullname, email và password
 * @returns NextResponse chứa trạng thái thành công hoặc lỗi chi tiết
 */
export async function POST(request: Request) {
  try {
    const { fullname, email, password } = await request.json();

    if (!fullname || !email || !password) {
      logger.error(ResponseCode.AUTH_FAILED, 'Thiếu thông tin đăng ký bắt buộc.');
      return NextResponse.json(
        {
          success: false,
          code: ResponseCode.AUTH_FAILED,
          message: 'Vui lòng cung cấp đầy đủ họ tên, email và mật khẩu.',
        },
        { status: 400 }
      );
    }

    logger.info('Đang gửi yêu cầu đăng ký tài khoản mới lên Supabase Auth...', { email, fullname });

    // Gọi API đăng ký tài khoản của Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullname,
        },
      },
    });

    if (error) {
      logger.error(ResponseCode.AUTH_FAILED, error.message);
      return NextResponse.json(
        {
          success: false,
          code: ResponseCode.AUTH_FAILED,
          message: error.message,
        },
        { status: 400 }
      );
    }

    const user = data.user;

    logger.success(ResponseCode.AUTH_SUCCESS, {
      userId: user?.id,
      email: user?.email,
      identities: user?.identities,
    });

    // Kiểm tra xem Supabase có yêu cầu xác thực email không
    const isEmailVerificationRequired =
      user && user.identities && user.identities.length > 0 && !user.email_confirmed_at;

    return NextResponse.json({
      success: true,
      code: ResponseCode.AUTH_SUCCESS,
      message: isEmailVerificationRequired
        ? 'Đăng ký thành công! Vui lòng kiểm tra email của bạn để xác thực tài khoản.'
        : 'Đăng ký tài khoản thành công! Bạn có thể đăng nhập ngay.',
      user: {
        id: user?.id,
        email: user?.email,
        confirmed: !!user?.email_confirmed_at,
      },
    });
  } catch (err: any) {
    logger.error(ResponseCode.SYS_ERROR, err);
    return NextResponse.json(
      {
        success: false,
        code: ResponseCode.SYS_ERROR,
        message: err.message || 'Đã có lỗi hệ thống xảy ra trong quá trình đăng ký.',
      },
      { status: 500 }
    );
  }
}
