'use client';

// OLD:
/*
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 bg-slate-900 py-12 text-slate-400 font-outfit">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
              <BookOpen size={16} />
            </div>
            <span className="font-bold tracking-tight text-white">KOREAN LEARNING</span>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
            <Link href="/vn" className="hover:text-teal-400 transition-colors">Trang chủ</Link>
            <Link href="/vn/courses" className="hover:text-teal-400 transition-colors">Khóa học</Link>
            <Link href="/vn/profile" className="hover:text-teal-400 transition-colors">Cá nhân</Link>
            <Link href="/vn/login" className="hover:text-teal-400 transition-colors">Đăng nhập</Link>
          </div>

        </div>

        {/* Copyright info */}
        <div className="mt-8 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <p>© {currentYear} KOREAN LEARNING. Tất cả các quyền được bảo lưu.</p>
          <p className="mt-1">Hệ thống học tiếng Hàn thông minh, kết hợp Lý thuyết - Luyện tập - Video bài giảng.</p>
        </div>
      </div>
    </footer>
  );
}
*/

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Component Footer dùng chung cho layout ứng dụng.
 * Được đồng bộ logo và màu hover sang màu Đỏ chủ đạo của Hàn Quốc Học.
 */
export default function Footer() {
  // Lấy năm hiện tại để hiển thị thông tin bản quyền
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  // Lấy locale hiện tại của trang
  const locale = pathname?.split('/')[1] || 'vn';

  return (
    <footer className="w-full border-t border-stone-200 dark:border-stone-850 bg-slate-900 py-12 text-slate-400 font-outfit">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          
          {/* Logo & Thương hiệu - Đỏ Hàn Quốc */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-korean-red text-white shadow-md shadow-korean-red/10">
              <span className="font-bold text-sm">한</span>
            </div>
            <span className="font-bold tracking-tight text-white">Hàn Quốc Học</span>
          </div>

          {/* Danh sách liên kết nhanh của ứng dụng */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
            <Link href={`/${locale}`} className="hover:text-red-400 transition-colors">Trang chủ</Link>
            <Link href={`/${locale}/courses`} className="hover:text-red-400 transition-colors">Khóa học</Link>
            <Link href={`/${locale}/profile`} className="hover:text-red-400 transition-colors">Cá nhân</Link>
            <Link href={`/${locale}/login`} className="hover:text-red-400 transition-colors">Đăng nhập</Link>
          </div>

        </div>

        {/* Thông tin bản quyền & mô tả hệ thống */}
        <div className="mt-8 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <p>© {currentYear} Hàn Quốc Học. Tất cả các quyền được bảo lưu. Copyright by Vinhdev</p>
          <p className="mt-1">Hệ thống học tiếng Hàn trực tuyến toàn diện, kết hợp Lý thuyết - Luyện tập tương tác - Video bài giảng sinh động.</p>
        </div>
      </div>
    </footer>
  );
}
