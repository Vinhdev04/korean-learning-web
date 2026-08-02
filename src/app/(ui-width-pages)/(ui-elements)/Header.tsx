'use client';

// OLD:
/*
export default function HeaderClient() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'vn';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
...
*/

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, User, Menu, LogOut, Award, Layers } from 'lucide-react';

/**
 * Component Header cho dự án Học Tiếng Hàn trực tuyến.
 * Thiết kế theo phong cách Slate & Teal tối giản học thuật, hỗ trợ đa thiết bị.
 */
export default function HeaderClient() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'vn';

  // Xác định xem route hiện tại để hiển thị active tab
  const isActive = (path: string) => {
    return pathname?.includes(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-slate-50/85 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/10 group-hover:bg-teal-700 transition-all duration-300">
              <BookOpen size={20} className="group-hover:rotate-3 transition-transform" />
            </div>
            <span className="font-outfit font-extrabold bg-gradient-to-r from-slate-900 via-slate-800 to-teal-700 bg-clip-text text-transparent">
              KOREAN LEARNING
            </span>
          </Link>
        </div>

        {/* Navigation Menu (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href={`/${locale}`} 
            className={`font-outfit text-sm font-semibold transition-all duration-200 ${
              pathname === `/${locale}` || pathname === '/' 
                ? 'text-teal-600' 
                : 'text-slate-600 hover:text-teal-600'
            }`}
          >
            Trang chủ
          </Link>
          <Link 
            href={`/${locale}/courses`} 
            className={`font-outfit text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 ${
              isActive('/courses') 
                ? 'text-teal-600' 
                : 'text-slate-600 hover:text-teal-600'
            }`}
          >
            <Layers size={14} />
            Khóa học
          </Link>
          <Link 
            href={`/${locale}/profile`} 
            className={`font-outfit text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 ${
              isActive('/profile') 
                ? 'text-teal-600' 
                : 'text-slate-600 hover:text-teal-600'
            }`}
          >
            <Award size={14} />
            Cá nhân
          </Link>
        </nav>

        {/* Right Section: Auth buttons & Actions */}
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/login`}
            className="font-outfit text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors"
          >
            Đăng nhập
          </Link>
          <Link
            href={`/${locale}/register`}
            className="font-outfit rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-teal-600 hover:shadow-teal-600/10 transition-all duration-300 active:scale-98"
          >
            Đăng ký
          </Link>
        </div>

      </div>
    </header>
  );
}

