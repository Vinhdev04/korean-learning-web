'use client';

// OLD:
/*
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
*/

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Award, Layers } from 'lucide-react';

/**
 * Component HeaderClient dùng chung cho toàn bộ layout ứng dụng.
 * Được đồng bộ sang tone màu Đỏ & Kem truyền thống của Hàn Quốc Học.
 */
export default function HeaderClient() {
  const pathname = usePathname();
  // Lấy locale từ URL hiện tại (mặc định là 'vn' nếu không tìm thấy)
  const locale = pathname?.split('/')[1] || 'vn';

  /**
   * Kiểm tra xem đường dẫn hiện tại có khớp với route của tab không
   * @param path - Sub-path cần kiểm tra (ví dụ: '/courses')
   * @returns boolean cho biết tab có đang hoạt động hay không
   */
  const isActive = (path: string): boolean => {
    return pathname?.includes(path) || false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/50 dark:border-stone-850/80 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Name - Màu Đỏ cờ Hàn Quốc */}
        <div className="flex items-center gap-3">
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-korean-red flex items-center justify-center transition-transform duration-300 group-hover:scale-105 active:scale-95 shadow-md shadow-korean-red/10">
              <span className="text-white font-bold text-lg">한</span>
            </div>
            <span className="font-outfit text-xl font-extrabold text-charcoal dark:text-stone-100 tracking-tight transition-colors group-hover:text-korean-red">
              Hàn Quốc Học
            </span>
          </Link>
        </div>

        {/* Navigation Menu (Desktop) - Đồng bộ màu sắc Đỏ & Kem */}
        <nav className="hidden md:flex items-center gap-2">
          <Link 
            href={`/${locale}`} 
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              pathname === `/${locale}` || pathname === '/' 
                ? 'bg-korean-red-light text-korean-red dark:bg-korean-red/10 dark:text-red-400' 
                : 'text-charcoal-muted dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-korean-red dark:hover:text-red-400'
            }`}
          >
            Trang chủ
          </Link>
          <Link 
            href={`/${locale}/courses`} 
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 ${
              isActive('/courses') 
                ? 'bg-korean-red-light text-korean-red dark:bg-korean-red/10 dark:text-red-400' 
                : 'text-charcoal-muted dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-korean-red dark:hover:text-red-400'
            }`}
          >
            <Layers size={14} />
            Khóa học
          </Link>
          <Link 
            href={`/${locale}/profile`} 
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 ${
              isActive('/profile') 
                ? 'bg-korean-red-light text-korean-red dark:bg-korean-red/10 dark:text-red-400' 
                : 'text-charcoal-muted dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-korean-red dark:hover:text-red-400'
            }`}
          >
            <Award size={14} />
            Cá nhân
          </Link>
        </nav>

        {/* Right Section: Nút Đăng nhập/Đăng ký phong cách Đỏ premium */}
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/login`}
            className="font-outfit text-sm font-bold text-charcoal dark:text-stone-200 hover:text-korean-red dark:hover:text-red-400 transition-colors"
          >
            Đăng nhập
          </Link>
          <Link
            href={`/${locale}/register`}
            className="btn-primary py-2.5 px-5 text-sm font-bold active:scale-95 shadow-md shadow-korean-red/10"
          >
            Đăng ký
          </Link>
        </div>

      </div>
    </header>
  );
}
