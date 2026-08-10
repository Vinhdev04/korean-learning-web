import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { supabase } from '@/core/database/supabase/client';
import { ResponseCode, formatSystemMessage } from '@/core/types/responseCode';
import { logger } from '@/core/lib/logger';
import { authen } from '@/modules/admin/types/auth';

/**
 * Dịch vụ Xác thực người dùng (AuthService)
 * Quản lý phiên đăng nhập trực tiếp qua Supabase Authentication và lưu trữ token ở Cookies.
 * @returns Các hàm và trạng thái liên quan đến Authentication
 */
const AuthService = () => {
  const router = useRouter();
  const [loadingBtn, setLoading] = useState(false);

  // OLD:
  // const setSession = (id: string | number, token?: string) => {
  //   const isVal = typeof id === 'number' ? id > 0 : id && id.trim() !== '';
  //
  //   if (isVal) {
  //     document.cookie = `user_id=${id}; path=/; max-age=28800`; // Lưu user_id cookie với max-age 8 giờ
  //     if (token) {
  //       document.cookie = `token=${token}; path=/; max-age=28800`; // Lưu token cookie với max-age 8 giờ
  //     }
  //     router.push('/admin');
  //   } else {
  //     document.cookie = 'user_id=; path=/; max-age=0'; // Xóa user_id cookie
  //     document.cookie = 'token=; path=/; max-age=0'; // Xóa token cookie
  //     router.push('/login');
  //   }
  // };

  /**
   * Xử lý đăng nhập bằng tài khoản Supabase Authentication qua API Route bảo mật
   * @param param0 authen interface chứa username (Email) và password
   */
  const Login = async ({ username, password }: authen) => {
    setLoading(true);
    logger.info('Bắt đầu xử lý đăng nhập qua API Route...', { email: username });

    // OLD:
    // try {
    //   const { data, error } = await supabase.auth.signInWithPassword({
    //     email: username,
    //     password: password,
    //   });
    //
    //   if (error) {
    //     logger.error(ResponseCode.AUTH_FAILED, error);
    //     toast.error(formatSystemMessage(ResponseCode.AUTH_FAILED, error.message));
    //   } else {
    //     const sessionToken = data.session?.access_token;
    //     const userID = data.user?.id;
    //
    //     logger.success(ResponseCode.AUTH_SUCCESS, {
    //       userId: userID,
    //       email: data.user?.email,
    //       createdAt: data.user?.created_at,
    //     });
    //
    //     toast.success(formatSystemMessage(ResponseCode.AUTH_SUCCESS));
    //
    //     if (userID && sessionToken) {
    //       setSession(userID, sessionToken);
    //     }
    //   }
    // }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        logger.error(ResponseCode.AUTH_FAILED, resData.message || 'Xác thực thất bại.');
        toast.error(formatSystemMessage(ResponseCode.AUTH_FAILED, resData.message));
      } else {
        logger.success(ResponseCode.AUTH_SUCCESS, {
          userId: resData.user?.id,
          email: resData.user?.email,
        });

        toast.success(formatSystemMessage(ResponseCode.AUTH_SUCCESS));

        // Chuyển hướng người dùng về trang admin dashboard
        router.push('/admin/dashboard');
      }
    } catch (err: any) {
      logger.error(ResponseCode.SYS_ERROR, err);
      toast.error(formatSystemMessage(ResponseCode.SYS_ERROR, err.message));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Đăng xuất khỏi hệ thống và hủy phiên đăng nhập thông qua API Route
   */
  const logOut = async () => {
    logger.info('Yêu cầu đăng xuất người dùng...');
    // OLD:
    // try {
    //   await supabase.auth.signOut();
    //   logger.success(ResponseCode.AUTH_LOGOUT);
    //   toast.success(formatSystemMessage(ResponseCode.AUTH_LOGOUT));
    // } catch (err) {
    //   logger.error(ResponseCode.SYS_ERROR, err);
    // } finally {
    //   setSession('');
    //   router.push('/login');
    // }

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      const resData = await response.json();

      if (response.ok && resData.success) {
        logger.success(ResponseCode.AUTH_LOGOUT);
        toast.success(formatSystemMessage(ResponseCode.AUTH_LOGOUT));
      } else {
        logger.warn('Đăng xuất có cảnh báo từ server:', resData.message);
      }
    } catch (err) {
      logger.error(ResponseCode.SYS_ERROR, err);
    } finally {
      router.push('/login');
    }
  };

  /**
   * Kiểm tra tính hợp lệ và tự động gia hạn session thông qua API Refresh
   * @returns Promise<boolean> Trả về true nếu phiên còn hạn, false nếu hết hạn hoặc không hợp lệ.
   */
  const checkSession = async () => {
    const sessionUserID = getCookie('user_id');
    logger.info('Đang kiểm tra Session qua API Route...', { sessionUserID });

    // OLD:
    // const sessionToken = getCookie('token');
    // const sessionUserID = getCookie('user_id');
    //
    // logger.info('Đang kiểm tra Session Cookies...', { sessionUserID, hasToken: !!sessionToken });
    //
    // if (!sessionToken || !sessionUserID) {
    //   logger.error(ResponseCode.AUTH_EXPIRED, 'Thiếu user_id hoặc token cookie.');
    //   logOut();
    //   return false;
    // }
    //
    // try {
    //   const { data, error } = await supabase.auth.getSession();
    //
    //   if (error || !data.session) {
    //     logger.error(ResponseCode.AUTH_EXPIRED, error || 'Không tìm thấy session trên Supabase.');
    //     logOut();
    //     return false;
    //   }
    //
    //   logger.success(ResponseCode.SYS_SUCCESS, {
    //     valid: true,
    //     expiresAt: new Date((data.session.expires_at || 0) * 1000).toLocaleString(),
    //   });
    //   return true;
    // }

    if (!sessionUserID) {
      logger.error(ResponseCode.AUTH_EXPIRED, 'Thiếu user_id cookie.');
      logOut();
      return false;
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
      });
      const resData = await response.json();

      if (!response.ok || !resData.success) {
        logger.error(ResponseCode.AUTH_EXPIRED, 'Không thể làm mới session.');
        logOut();
        return false;
      }

      logger.success(ResponseCode.SYS_SUCCESS, 'Session còn hoạt động và đã được làm mới.');
      return true;
    } catch (err) {
      logger.error(ResponseCode.SYS_ERROR, err);
      logOut();
      return false;
    }
  };

  /**
   * Hàm hỗ trợ lấy giá trị một Cookie từ trình duyệt theo tên
   * @param name Tên cookie cần lấy
   * @returns chuỗi giá trị cookie hoặc null nếu không tồn tại
   */
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  return { loadingBtn, Login, logOut, checkSession };
};

export default AuthService;
