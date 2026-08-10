'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import { EyeCloseIcon, EyeIcon } from '@/icons';
import axiosInstance from '@/core/hooks/useAxiosService';

/**
 * Form Đăng ký tài khoản KOREAN LEARNING.
 * Thiết kế gọn gàng, đẹp mắt theo hình 3, đồng bộ màu sắc thương hiệu koreanRed.
 */
export default function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  /**
   * Xử lý gửi form Đăng ký lên hệ thống
   */
  const handleSubmit = async () => {
    const { fullname, email, password } = formData;

    if (!fullname.trim()) {
      toast.error('Vui lòng nhập họ và tên!');
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      toast.error('Email không hợp lệ!');
      return;
    }
    if (password.length < 6) {
      toast.error('Mật khẩu phải chứa ít nhất 6 ký tự!');
      return;
    }

    try {
      setLoading(true);

      // Gửi API đăng ký qua Route Supabase Auth
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, email, password }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        toast.success(resData.message || 'Đăng ký tài khoản thành công!');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        toast.error(resData.message || 'Đăng ký thất bại!');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error?.message || 'Đã có lỗi xảy ra!';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-stone-900 p-8 sm:p-10 rounded-3xl shadow-xl border border-stone-150/40 dark:border-stone-800/80 transition-colors duration-300 font-sans">
      <div className="space-y-6">
        {/* Header Đăng ký */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-charcoal dark:text-stone-100">
            Đăng ký tài khoản
          </h1>
          <p className="text-sm text-charcoal-muted dark:text-stone-400 font-medium leading-relaxed">
            Bắt đầu hành trình học tiếng Hàn miễn phí ngay hôm nay.
          </p>
        </div>

        {/* Các trường nhập liệu */}
        <form className="space-y-5" onSubmit={e => e.preventDefault()}>
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Họ và tên <span className="text-koreanRed">*</span>
            </Label>
            <Input
              id="fullname"
              name="fullname"
              placeholder="Nhập họ và tên"
              type="text"
              value={formData.fullname}
              className="w-full rounded-xl border border-stone-200 dark:border-stone-850 bg-stone-50/50 dark:bg-stone-950 p-3.5 text-sm focus:border-koreanRed dark:focus:border-red-500 focus:ring-1 focus:ring-koreanRed dark:focus:ring-red-500 outline-none transition-all dark:text-white"
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Email <span className="text-koreanRed">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="Nhập email của bạn"
              type="email"
              value={formData.email}
              className="w-full rounded-xl border border-stone-200 dark:border-stone-850 bg-stone-50/50 dark:bg-stone-950 p-3.5 text-sm focus:border-koreanRed dark:focus:border-red-500 focus:ring-1 focus:ring-koreanRed dark:focus:ring-red-500 outline-none transition-all dark:text-white"
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Mật khẩu <span className="text-koreanRed">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Tạo mật khẩu (ít nhất 6 ký tự)"
                value={formData.password}
                className="w-full rounded-xl border border-stone-200 dark:border-stone-850 bg-stone-50/50 dark:bg-stone-950 p-3.5 pr-10 text-sm focus:border-koreanRed dark:focus:border-red-500 focus:ring-1 focus:ring-koreanRed dark:focus:ring-red-500 outline-none transition-all dark:text-white"
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 text-stone-400 hover:text-koreanRed dark:hover:text-red-400 p-1"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? (
                  <EyeIcon className="fill-current h-4 w-4" />
                ) : (
                  <EyeCloseIcon className="fill-current h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Nút đăng ký */}
          <div className="pt-4">
            <button
              onClick={handleSubmit}
              disabled={!formData.fullname || !formData.email || !formData.password || loading}
              className={`w-full rounded-xl bg-koreanRed hover:bg-koreanRed-dark text-white py-3.5 text-sm font-bold shadow-lg shadow-koreanRed/15 transition-all duration-300 active:scale-[0.98] ${
                !formData.fullname || !formData.email || !formData.password || loading
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              {loading ? 'Đang xử lý...' : 'Đăng ký miễn phí'}
            </button>
          </div>
        </form>

        {/* Chuyển hướng sang đăng nhập */}
        <div className="text-center text-xs sm:text-sm text-stone-500 dark:text-stone-400 pt-2 font-medium">
          <span>Đã có tài khoản? </span>
          <Link
            href="/login"
            className="font-bold text-koreanRed dark:text-red-400 hover:underline"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
