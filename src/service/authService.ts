import { useState } from 'react';
import axiosInstance from '@/core/hooks/useAxiosService';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { encryptForClient } from '@/lib/rsa-encrypt';
import { supabase } from '@/core/database/supabase/client';

export interface authen {
  username: string;
  password: string;
}

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
    // OLD:
    // if (id > 0) {
    //   // Lưu userID và token vào cookies
    //   document.cookie = `user_id=${id}; path=/; max-age=28800`;  // Lưu user_id cookie với max-age 8 giờ
    //   if (token) {
    //     document.cookie = `token=${token}; path=/; max-age=28800`;  // Lưu token cookie với max-age 8 giờ
    //   }
    //   router.push('/admin');
    // } else {
    //   // Xóa cookies khi logout
    //   document.cookie = 'user_id=; path=/; max-age=0';  // Xóa user_id cookie
    //   document.cookie = 'token=; path=/; max-age=0';  // Xóa token cookie
    //   router.push('/login');
    // }

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
    // OLD:
    // const encryptedEmail = encryptForClient(password);
    // setLoading(true);
    // try {
    //   const res = await axiosInstance.post('/authen/login', {
    //     data: { user_nm: username, password: encryptedEmail },
    //   });
    //   if (res.data.res_code === '0') {
    //     toast.error(res.data.error_cont || 'Đã xảy ra lỗi');
    //   } else {
    //     toast.success(res.data.error_cont || 'Đăng nhập thành công');
    //     // Lấy token, userID từ API response
    //     const token = res.data.data.token;
    //     const userID = res.data.data.rows[0].id;
    //     setSession(userID, token); // Gọi setSession để lưu thông tin vào cookie
    //   }
    // } catch (err: any) {
    //   if (err?.response) {
    //      toast.error(err.response.data?.error_cont || err.message);
    //   } else {
    //     toast.error(String(err));
    //   }
    // } finally {
    //   setLoading(false);
    // }

    setLoading(true);
    try {
      // Xác thực đăng nhập qua dịch vụ Supabase Authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) {
        toast.error(error.message || 'Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.');
      } else {
        toast.success('Đăng nhập thành công!');
        const sessionToken = data.session?.access_token;
        const userID = data.user?.id;

        if (userID && sessionToken) {
          setSession(userID, sessionToken);
        }
      }
    } catch (err: any) {
      toast.error(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Đăng xuất khỏi hệ thống và hủy phiên đăng nhập Supabase
   */
  const logOut = async () => {
    // OLD:
    // try {
    //   await axiosInstance.post('/authen/logout');
    // } catch (err) {
    //   if (err instanceof Error) {
    //     console.log(err.message);
    //   } else {
    //     console.log(String(err));
    //   }
    // } finally {
    //   // Xóa cookies khi logout
    //   setSession(0); // Gọi lại setSession với userID = 0 để xóa cookies
    //   router.push('/login');
    // }

    try {
      // Hủy phiên đăng nhập trực tiếp trên máy chủ Supabase Auth
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Lỗi khi đăng xuất khỏi Supabase:', err);
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
    // OLD:
    // const sessionUserID = Number(getCookie('user_id') || '0');  // Lấy user_id từ cookie
    // const sessionToken = getCookie('token');  // Lấy token từ cookie
    // if (!sessionUserID || sessionUserID <= 0 || !sessionToken) {
    //   logOut();
    //   return false;
    // }
    // try {
    //   const res = await axiosInstance.post('/authen/check-session');
    //   if (!res.data?.data?.valid) {
    //     logOut();
    //     return false;
    //   }
    //   return true;
    // } catch (err) {
    //   console.error('Check session error:', err);
    //   logOut();
    //   return false;
    // }

    const sessionToken = getCookie('token');
    const sessionUserID = getCookie('user_id');

    if (!sessionToken || !sessionUserID) {
      logOut();
      return false;
    }

    try {
      // Lấy và kiểm tra trực tiếp thông tin session từ Supabase Client SDK (nếu token hết hạn, SDK sẽ tự refresh qua refresh_token)
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        logOut();
        return false;
      }

      return true;
    } catch (err) {
      console.error('Lỗi trong quá trình kiểm tra Session:', err);
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
