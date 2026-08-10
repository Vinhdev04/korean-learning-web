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

  /**
   * Lưu thông tin phiên đăng nhập vào Cookie trình duyệt
   * @param id ID của người dùng (số hoặc UUID của Supabase)
   * @param token Chuỗi Access Token JWT của phiên đăng nhập
   */
  const setSession = (id: string | number, token?: string) => {
    const isVal = typeof id === 'number' ? id > 0 : id && id.trim() !== '';

    if (isVal) {
      document.cookie = `user_id=${id}; path=/; max-age=28800`; // Lưu user_id cookie với max-age 8 giờ
      if (token) {
        document.cookie = `token=${token}; path=/; max-age=28800`; // Lưu token cookie với max-age 8 giờ
      }
      router.push('/admin');
    } else {
      document.cookie = 'user_id=; path=/; max-age=0'; // Xóa user_id cookie
      document.cookie = 'token=; path=/; max-age=0'; // Xóa token cookie
      router.push('/login');
    }
  };

  /**
   * Xử lý đăng nhập bằng tài khoản Supabase Authentication
   * @param param0 authen interface chứa username (Email) và password
   */
  const Login = async ({ username, password }: authen) => {
    setLoading(true);
    logger.info('Bắt đầu xử lý đăng nhập qua Supabase Auth...', { email: username });

    try {
      // Xác thực đăng nhập qua dịch vụ Supabase Authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) {
        logger.error(ResponseCode.AUTH_FAILED, error);
        toast.error(formatSystemMessage(ResponseCode.AUTH_FAILED, error.message));
      } else {
        const sessionToken = data.session?.access_token;
        const userID = data.user?.id;

        logger.success(ResponseCode.AUTH_SUCCESS, {
          userId: userID,
          email: data.user?.email,
          createdAt: data.user?.created_at,
        });

        toast.success(formatSystemMessage(ResponseCode.AUTH_SUCCESS));

        if (userID && sessionToken) {
          setSession(userID, sessionToken);
        }
      }
    } catch (err: any) {
      logger.error(ResponseCode.SYS_ERROR, err);
      toast.error(formatSystemMessage(ResponseCode.SYS_ERROR, err.message));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Đăng xuất khỏi hệ thống và hủy phiên đăng nhập Supabase
   */
  const logOut = async () => {
    logger.info('Yêu cầu đăng xuất người dùng...');
    try {
      // Hủy phiên đăng nhập trực tiếp trên máy chủ Supabase Auth
      await supabase.auth.signOut();
      logger.success(ResponseCode.AUTH_LOGOUT);
      toast.success(formatSystemMessage(ResponseCode.AUTH_LOGOUT));
    } catch (err) {
      logger.error(ResponseCode.SYS_ERROR, err);
    } finally {
      // Xóa các cookie phiên làm việc
      setSession('');
      router.push('/login');
    }
  };

  /**
   * Kiểm tra tính hợp lệ của phiên đăng nhập hiện tại
   * @returns Promise<boolean> Trả về true nếu phiên còn hạn, false nếu hết hạn hoặc không hợp lệ.
   */
  const checkSession = async () => {
    const sessionToken = getCookie('token');
    const sessionUserID = getCookie('user_id');

    logger.info('Đang kiểm tra Session Cookies...', { sessionUserID, hasToken: !!sessionToken });

    if (!sessionToken || !sessionUserID) {
      logger.error(ResponseCode.AUTH_EXPIRED, 'Thiếu user_id hoặc token cookie.');
      logOut();
      return false;
    }

    try {
      // Lấy và kiểm tra trực tiếp thông tin session từ Supabase Client SDK
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        logger.error(ResponseCode.AUTH_EXPIRED, error || 'Không tìm thấy session trên Supabase.');
        logOut();
        return false;
      }

      logger.success(ResponseCode.SYS_SUCCESS, {
        valid: true,
        expiresAt: new Date((data.session.expires_at || 0) * 1000).toLocaleString(),
      });
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
