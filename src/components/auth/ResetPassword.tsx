'use client';

import { useState } from 'react';
import axiosInstance from '@/core/hooks/useAxiosService';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
    <div className="w-full max-w-md bg-white dark:bg-stone-900 p-8 sm:p-10 rounded-3xl shadow-xl border border-stone-150/40 dark:border-stone-800/80 transition-colors duration-300 font-sans">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-charcoal dark:text-stone-100">
            Quên mật khẩu?
          </h2>
          <p className="text-sm text-charcoal-muted dark:text-stone-400 font-medium leading-relaxed">
            Nhập email của bạn để nhận liên kết đặt lại mật khẩu của tài khoản.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Địa chỉ Email <span className="text-koreanRed">*</span>
            </label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Nhập email đã đăng ký"
              className="w-full rounded-xl border border-stone-200 dark:border-stone-850 bg-stone-50/50 dark:bg-stone-950 p-3.5 text-sm focus:border-koreanRed dark:focus:border-red-500 focus:ring-1 focus:ring-koreanRed dark:focus:ring-red-500 outline-none transition-all dark:text-white"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div />
            <Link
              href="/login"
              className="font-bold text-koreanRed dark:text-red-400 hover:underline text-sm transition-colors"
            >
              Quay lại đăng nhập
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-koreanRed hover:bg-koreanRed-dark text-white py-3.5 text-sm font-bold shadow-lg shadow-koreanRed/15 transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Đang gửi...' : 'Gửi email khôi phục'}
          </button>
        </form>
      </div>
    </div>
  );
}
