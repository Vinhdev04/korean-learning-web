'use client';

// OLD:
/*
export default function SignInForm() {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<authen>({
    username: '',
    password: '',
  });
...
*/

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { EyeCloseIcon, EyeIcon } from '@/icons';
import AuthService, { authen } from '@/service/authService';
import { ShieldCheck, UserCheck, HelpCircle } from 'lucide-react';

/**
 * Form Đăng nhập KOREAN LEARNING.
 * Thiết kế Slate & Teal học thuật, hỗ trợ giả lập tài khoản admin & user phục vụ kiểm thử nhanh UI.
 */
export default function SignInForm() {
  const t = useTranslations();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<authen>({
    username: '',
    password: '',
  });
  const { Login, loadingBtn } = AuthService();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Xử lý đăng nhập, có cơ chế Mock bypass cho các tài khoản test admin/user
   */
  const handleSubmit = async () => {
    const { username, password } = formData;
    const lowerUser = username.toLowerCase().trim();

    // 1. Giả lập tài khoản Admin để test CMS
    if (lowerUser === 'admin') {
      document.cookie = `user_id=1; path=/; max-age=28800`;
      document.cookie = `token=mock-admin-token; path=/; max-age=28800`;

      toast.success('Đăng nhập Quản trị viên (Admin) giả lập thành công!');
      setTimeout(() => {
        router.push('/admin');
      }, 500);
      return;
    }

    // 2. Giả lập tài khoản Học viên (User) để test App/Profile
    if (lowerUser === 'user' || lowerUser === 'hocvien') {
      document.cookie = `user_id=2; path=/; max-age=28800`;
      document.cookie = `token=mock-user-token; path=/; max-age=28800`;

      toast.success('Đăng nhập Học viên (User) giả lập thành công!');
      setTimeout(() => {
        router.push('/vn'); // Chuyển về trang chủ tiếng Việt học viên
      }, 500);
      return;
    }

    // 3. Đăng nhập API thật
    Login(formData);
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-stone-900 p-8 sm:p-10 rounded-3xl shadow-xl border border-stone-150/40 dark:border-stone-800/80 transition-colors duration-300 font-sans">
      <div className="space-y-6">
        {/* Header Đăng nhập */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-charcoal dark:text-stone-100">
            Đăng nhập
          </h1>
          <p className="text-sm text-charcoal-muted dark:text-stone-400 font-medium leading-relaxed">
            Chào mừng quay lại! Tiếp tục hành trình học tiếng Hàn của bạn.
          </p>
        </div>

        {/* Các trường nhập liệu */}
        <form className="space-y-5" onSubmit={e => e.preventDefault()}>
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Email / Tên đăng nhập <span className="text-koreanRed">*</span>
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="Nhập email của bạn (ví dụ: admin)"
              type="text"
              value={formData.username}
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
                placeholder="Nhập mật khẩu"
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

          {/* Quên mật khẩu link */}
          <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
            <div />
            <Link
              href="/reset-password"
              className="font-bold text-koreanRed dark:text-red-400 hover:underline transition-colors"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {/* Nút đăng nhập */}
          <div className="pt-2">
            <button
              onClick={handleSubmit}
              disabled={!formData.username || !formData.password || loadingBtn}
              className={`w-full rounded-xl bg-koreanRed hover:bg-koreanRed-dark text-white py-3.5 text-sm font-bold shadow-lg shadow-koreanRed/15 transition-all duration-300 active:scale-[0.98] ${
                !formData.username || !formData.password || loadingBtn
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              {loadingBtn ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </div>
        </form>

        {/* Chuyển hướng sang đăng ký */}
        <div className="text-center text-xs sm:text-sm text-stone-500 dark:text-stone-400 pt-2 font-medium">
          <span>Chưa có tài khoản? </span>
          <Link
            href="/register"
            className="font-bold text-koreanRed dark:text-red-400 hover:underline"
          >
            Đăng ký ngay
          </Link>
        </div>

        {/* 💡 Tài khoản test giả lập */}
        <div className="pt-4 border-t border-stone-100 dark:border-stone-850 space-y-2">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 flex items-center gap-1.5 justify-center">
            <HelpCircle size={12} className="text-koreanRed/70" />
            Tài khoản kiểm thử nhanh UI
          </h3>
          <div className="grid gap-2 grid-cols-2 text-[10px]">
            <button
              onClick={() => setFormData({ username: 'admin', password: 'admin123' })}
              className="flex items-center gap-2 p-2 bg-stone-50 hover:bg-stone-100 dark:bg-stone-950 dark:hover:bg-stone-850 border border-stone-150/40 dark:border-stone-800 rounded-xl transition-colors text-left"
            >
              <ShieldCheck size={14} className="text-koreanRed flex-shrink-0" />
              <div className="truncate">
                <span className="font-bold text-stone-700 dark:text-stone-300 block leading-tight">
                  Admin CMS
                </span>
                <span className="text-[9px] text-stone-400">User: admin</span>
              </div>
            </button>

            <button
              onClick={() => setFormData({ username: 'user', password: 'user123' })}
              className="flex items-center gap-2 p-2 bg-stone-50 hover:bg-stone-100 dark:bg-stone-950 dark:hover:bg-stone-850 border border-stone-150/40 dark:border-stone-800 rounded-xl transition-colors text-left"
            >
              <UserCheck size={14} className="text-koreanRed flex-shrink-0" />
              <div className="truncate">
                <span className="font-bold text-stone-700 dark:text-stone-300 block leading-tight">
                  Học viên
                </span>
                <span className="text-[9px] text-stone-400">User: user</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
