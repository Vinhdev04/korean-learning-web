'use client';

import { useState } from 'react';
import axiosInstance from '@/core/hooks/useAxiosService';
import { toast } from 'react-toastify';
import Link from 'next/link';
import  { useRouter } from 'next/navigation';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Vui lòng nhập email!');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Email không hợp lệ!');
      return;
    }
    try {
      setLoading(true);
      const res = await axiosInstance.post('/auth/forgot-password', { email });      
      if (res.data.success) {
        toast.success('Đã gửi email khôi phục mật khẩu!');
        setTimeout(() => {
          router.push('/login');
        }, 600);
      } else {
        toast.error(res.data.error_cont || 'Gửi email thất bại!');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error?.response?.data?.error_cont;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" lg:w-1/2 w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Nhập email của bạn
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">Nhập email để lấy lại tài khoản và mật khẩu</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
            </label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Nhập email đã đăng ký"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
           <div className="flex items-center justify-between">
                <div></div>
                <Link
                  href="/login"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Quay lại đăng nhập
                </Link>
              </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Đang gửi...' : 'Gửi email'}
          </button>
        </form>
      </div>
    </div>
  );
}
