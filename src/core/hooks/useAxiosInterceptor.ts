// src/hooks/useAxiosInterceptor.ts
'use client';
import { useEffect } from 'react';
import axiosInstance from './useAxiosService';
import useAuthService from '@/service/authService';
import { toast } from 'react-toastify';

let hasAlreadyHandled401 = false;

const useAxiosInterceptor = () => {
  const { logOut } = useAuthService();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        const status = error.response?.status;
        const errorData = error.response?.data;

        const shouldLogout = status === 401 || errorData?.error_code === 'SYS006';

        if (shouldLogout && typeof window !== 'undefined' && !hasAlreadyHandled401) {
          hasAlreadyHandled401 = true;
          toast.error(errorData?.error_cont || 'Phiên đăng nhập đã hết hạn');
          await logOut();
        } else if (errorData) {
          toast.error(errorData?.error_cont || 'Đã xảy ra lỗi');
        } else {
          toast.error('Không thể kết nối đến máy chủ');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
      hasAlreadyHandled401 = false;
    };
  }, [logOut]);
};

export default useAxiosInterceptor;
