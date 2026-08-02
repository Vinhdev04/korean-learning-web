import { useState } from 'react';
import axiosInstance from '../hooks/useAxiosService';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { encryptForClient } from '@/lib/rsa-encrypt';

export interface authen {
  username: string;
  password: string;
}

const AuthService = () => {
  const router = useRouter();
  const [loadingBtn, setLoading] = useState(false);

  const setSession = (id: number, token?: string) => {
    if (id > 0) {
      // Lưu userID và token vào cookies
      document.cookie = `user_id=${id}; path=/; max-age=28800`;  // Lưu user_id cookie với max-age 8 giờ
      if (token) {
        document.cookie = `token=${token}; path=/; max-age=28800`;  // Lưu token cookie với max-age 8 giờ
      }
      router.push('/admin');
    } else {
      // Xóa cookies khi logout
      document.cookie = 'user_id=; path=/; max-age=0';  // Xóa user_id cookie
      document.cookie = 'token=; path=/; max-age=0';  // Xóa token cookie
      router.push('/login');
    }
  };

  const Login = async ({ username, password }: authen) => {
    const encryptedEmail = encryptForClient(password);
    setLoading(true);
    try {
      const res = await axiosInstance.post('/authen/login', {
        data: { user_nm: username, password: encryptedEmail },
      });
      if (res.data.res_code === '0') {
        toast.error(res.data.error_cont || 'Đã xảy ra lỗi');
      } else {
        toast.success(res.data.error_cont || 'Đăng nhập thành công');
        // Lấy token, userID từ API response
        const token = res.data.data.token;
        const userID = res.data.data.rows[0].id;
        setSession(userID, token); // Gọi setSession để lưu thông tin vào cookie
      }
    } catch (err: any) {
      if (err?.response) {
         toast.error(err.response.data?.error_cont || err.message);
      } else {
        toast.error(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      await axiosInstance.post('/authen/logout');
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(String(err));
      }
    } finally {
      // Xóa cookies khi logout
      setSession(0); // Gọi lại setSession với userID = 0 để xóa cookies
      router.push('/login');
    }
  };

  const checkSession = async () => {
    const sessionUserID = Number(getCookie('user_id') || '0');  // Lấy user_id từ cookie
    const sessionToken = getCookie('token');  // Lấy token từ cookie
    if (!sessionUserID || sessionUserID <= 0 || !sessionToken) {
      logOut();
      return false;
    }
    try {
      const res = await axiosInstance.post('/authen/check-session');
      if (!res.data?.data?.valid) {
        logOut();
        return false;
      }
      return true;
    } catch (err) {
      console.error('Check session error:', err);
      logOut();
      return false;
    }
  };

  // Hàm để lấy giá trị cookie
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  return { loadingBtn, Login, logOut, checkSession };
};

export default AuthService;