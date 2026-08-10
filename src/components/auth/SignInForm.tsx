'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { EyeCloseIcon, EyeIcon } from '@/icons';
import AuthService from '@/service/authService';
import { passkeyService } from '@/service/passkeyService';
import { supabase } from '@/core/database/supabase/client';
import { authen } from '@/modules/admin/types/auth';
import { ShieldCheck, UserCheck, HelpCircle, Fingerprint } from 'lucide-react';

/**
 * Form Đăng nhập KOREAN LEARNING.
 * Thiết kế Slate & Teal học thuật, hỗ trợ giả lập tài khoản admin & user phục vụ kiểm thử nhanh UI.
 */
export default function SignInForm() {
  const t = useTranslations();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isPasskeySupported, setIsPasskeySupported] = useState(false);
  const [isFading, setIsFading] = useState(false); // Trạng thái hiệu ứng chuyển cảnh
  const [formData, setFormData] = useState<authen>({
    username: '',
    password: '',
  });
  const { Login, loadingBtn } = AuthService();

  // Kiểm tra xem thiết bị của người dùng có hỗ trợ sinh trắc học FaceID/Passkey không
  useEffect(() => {
    passkeyService.isSupported().then(supported => {
      setIsPasskeySupported(supported);
    });
  }, []);

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

    setIsFading(true); // Kích hoạt hiệu ứng fade chuyển cảnh mượt mà

    // 1. Giả lập tài khoản Admin để test CMS
    if (lowerUser === 'admin') {
      document.cookie = `user_id=1; path=/; max-age=28800`;
      document.cookie = `token=mock-admin-token; path=/; max-age=28800`;

      toast.success('Đăng nhập Quản trị viên (Admin) giả lập thành công!');
      setTimeout(() => {
        router.push('/admin/dashboard');
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
    setTimeout(() => {
      setIsFading(false);
    }, 1500);
  };

  /**
   * Xử lý đăng nhập bằng tài khoản Google (OAuth) thông qua Supabase
   */
  const handleGoogleLogin = async () => {
    try {
      setIsFading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });
      if (error) {
        toast.error(`Lỗi Google OAuth: ${error.message}`);
        setIsFading(false);
      }
    } catch (err: any) {
      toast.error(`Đăng nhập Google thất bại: ${err.message}`);
      setIsFading(false);
    }
  };

  /**
   * Xử lý đăng nhập bằng Passkey / FaceID sinh trắc học
   */
  const handlePasskeyLogin = async () => {
    try {
      setIsFading(true);
      // 1. Xác thực vân tay / FaceID trên thiết bị cục bộ
      const email = await passkeyService.authenticate();

      // 2. Gửi yêu cầu xác thực an toàn lên API Route
      const response = await fetch('/api/auth/passkey-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        toast.success(resData.message || 'Đăng nhập sinh trắc học thành công!');
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 800);
      } else {
        toast.error(resData.message || 'Xác thực sinh trắc học thất bại.');
        setIsFading(false);
      }
    } catch (err: any) {
      toast.error(err.message || 'Xác thực sinh trắc học không thành công.');
      setIsFading(false);
    }
  };

  return (
    <div
      className={`w-full max-w-md bg-white dark:bg-stone-900 p-8 sm:p-10 rounded-3xl shadow-xl border border-stone-150/40 dark:border-stone-800/80 transition-all duration-500 font-sans ${
        isFading ? 'opacity-30 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="space-y-6">
        {/* Header Đăng nhập */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-charcoal dark:text-stone-100 bg-gradient-to-r from-koreanRed to-rose-500 bg-clip-text text-transparent">
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

          {/* Nút đăng nhập chính */}
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

        {/* Dải phân cách đăng nhập xã hội */}
        <div className="relative flex items-center justify-center my-4">
          <div className="absolute w-full border-t border-stone-150 dark:border-stone-850"></div>
          <span className="relative z-10 px-3 text-xs font-bold uppercase tracking-wider bg-white dark:bg-stone-900 text-stone-400">
            Hoặc đăng nhập bằng
          </span>
        </div>

        {/* Nút Google & FaceID OAuth */}
        <div className="grid gap-3 grid-cols-2">
          {/* Nút Đăng nhập Google */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2.5 p-3 border border-stone-200 dark:border-stone-850 hover:bg-stone-50 dark:hover:bg-stone-850 rounded-2xl transition-all duration-300 font-bold text-xs text-stone-700 dark:text-stone-300 active:scale-95"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Google</span>
          </button>

          {/* Nút Đăng nhập FaceID / Passkey platform */}
          <button
            onClick={handlePasskeyLogin}
            disabled={!isPasskeySupported}
            className={`flex items-center justify-center gap-2.5 p-3 border border-stone-200 dark:border-stone-850 hover:bg-stone-50 dark:hover:bg-stone-850 rounded-2xl transition-all duration-300 font-bold text-xs active:scale-95 ${
              isPasskeySupported
                ? 'text-stone-700 dark:text-stone-300 cursor-pointer'
                : 'text-stone-300 dark:text-stone-600 opacity-50 cursor-not-allowed'
            }`}
            title={
              isPasskeySupported
                ? 'Đăng nhập sinh trắc học FaceID/Passkey'
                : 'Thiết bị không hỗ trợ FaceID/Passkey'
            }
          >
            <Fingerprint
              size={16}
              className={isPasskeySupported ? 'text-teal-500' : 'text-stone-300'}
            />
            <span>FaceID / Khóa</span>
          </button>
        </div>

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
