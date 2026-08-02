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
    <div className="flex flex-col flex-1 lg:w-1/2 w-full bg-white font-outfit justify-center px-6 sm:px-12 lg:px-16 py-12">
      <div className="w-full max-w-md mx-auto space-y-8">
        
        {/* Sign In Header */}
        <div className="space-y-2 text-center lg:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
            Chào mừng quay lại
          </h1>
          <p className="text-sm text-slate-600">
            Đăng nhập hệ thống tự học tiếng Hàn trực tuyến toàn diện
          </p>
        </div>

        {/* Form elements */}
        <form className="space-y-6" onSubmit={e => e.preventDefault()}>
          
          <div className="space-y-1.5">
            <Label className="text-sm font-bold text-slate-700">
              Tên đăng nhập <span className="text-teal-600">*</span>
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="Tên đăng nhập (ví dụ: admin)"
              type="text"
              className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-bold text-slate-700">
              Mật khẩu <span className="text-teal-600">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mật khẩu (ví dụ: admin123)"
                className="w-full rounded-xl border border-slate-200 p-3 pr-10 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                onChange={handleInputChange}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 text-slate-400 hover:text-teal-600"
              >
                {showPassword ? (
                  <EyeIcon className="fill-current h-5 w-5" />
                ) : (
                  <EyeCloseIcon className="fill-current h-5 w-5" />
                )}
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div />
            <Link
              href="/reset-password"
              className="font-semibold text-teal-600 hover:text-teal-700 transition-colors"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              onClick={handleSubmit}
              disabled={!formData.username || !formData.password || loadingBtn}
              className={`w-full rounded-xl bg-slate-950 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 hover:bg-teal-600 hover:shadow-teal-600/10 transition-all duration-300 active:scale-98 ${
                (!formData.username || !formData.password || loadingBtn)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              {loadingBtn ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </div>
        </form>

        {/* 💡 Testing Accounts Panel for UX review */}
        <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <HelpCircle size={14} className="text-teal-500" />
            Tài khoản giả lập kiểm thử nhanh UI
          </h3>
          <div className="grid gap-2 sm:grid-cols-2 text-xs">
            <button 
              onClick={() => setFormData({ username: 'admin', password: 'admin123' })}
              className="flex items-center gap-2 p-2 bg-white border border-slate-100 rounded-xl hover:border-teal-500 transition-colors text-left"
            >
              <ShieldCheck size={16} className="text-teal-600" />
              <div>
                <span className="font-bold text-slate-800 block">Tài khoản Admin</span>
                <span className="text-[10px] text-slate-500">Username: admin</span>
              </div>
            </button>

            <button 
              onClick={() => setFormData({ username: 'user', password: 'user123' })}
              className="flex items-center gap-2 p-2 bg-white border border-slate-100 rounded-xl hover:border-teal-500 transition-colors text-left"
            >
              <UserCheck size={16} className="text-teal-600" />
              <div>
                <span className="font-bold text-slate-800 block">Tài khoản Học viên</span>
                <span className="text-[10px] text-slate-500">Username: user</span>
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

