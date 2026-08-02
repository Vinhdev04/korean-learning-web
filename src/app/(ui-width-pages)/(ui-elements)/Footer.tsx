// OLD:
/*
export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1c23] py-6 text-center text-sm text-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Korean Learning Platform. All rights reserved.</p>
      </div>
    </footer>
  );
}
*/

import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

/**
 * Component Footer cho dự án Học Tiếng Hàn trực tuyến.
 * Cung cấp thông tin bản quyền và liên kết điều hướng cơ bản.
 */
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

