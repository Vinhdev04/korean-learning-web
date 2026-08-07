'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// OLD: import { Mail, Phone, MapPin } from 'lucide-react';
import { Mail, Phone, MapPin, Copyright } from 'lucide-react';

/**
 * Component Footer cho dự án Học Tiếng Hàn trực tuyến.
 * Cung cấp thông tin bản quyền và liên kết điều hướng theo phong cách Korean Red / Seoul Sunset nguyên bản.
 * Được đồng bộ sang màu nền kem ấm sáng (warmCream) theo hình ảnh thiết kế.
 */
export default function Footer() {
  const pathname = usePathname() || '/';
  const locale = pathname.split('/')[1] || 'vn';
  const isEn = locale === 'en';

  return (
    <footer className="w-full bg-[#FDFBF7] dark:bg-stone-900 border-t border-stone-200/60 dark:border-stone-800/80 pt-16 pb-12 font-outfit text-charcoal-muted dark:text-stone-400 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-koreanRed flex items-center justify-center">
                <span className="text-white font-bold text-sm">한</span>
              </div>
              <span className="text-base font-extrabold text-charcoal dark:text-stone-100 tracking-tight">
                {isEn ? '한국어학당' : 'Hàn Quốc Học'}
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm mt-2 font-medium">
              {isEn
                ? 'Comprehensive online Korean learning platform from Beginner to Intermediate - Advanced levels. Conquer Korean and the TOPIK exam with you.'
                : 'Nền tảng học tiếng Hàn trực tuyến toàn diện từ cấp độ Sơ cấp đến Trung - Cao cấp. Cùng bạn chinh phục tiếng Hàn và kỳ thi TOPIK.'}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-charcoal dark:text-stone-100 uppercase tracking-wider mb-4">
              {isEn ? 'Quick Links' : 'Liên kết nhanh'}
            </h4>
            <ul className="flex flex-col gap-3 text-xs font-semibold">
              <li>
                <Link
                  href={`/${locale}`}
                  className="hover:text-koreanRed dark:hover:text-red-400 transition-colors"
                >
                  {isEn ? 'Home' : 'Trang chủ'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/courses`}
                  className="hover:text-koreanRed dark:hover:text-red-400 transition-colors"
                >
                  {isEn ? 'Courses' : 'Khóa học'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/practice`}
                  className="hover:text-koreanRed dark:hover:text-red-400 transition-colors"
                >
                  {isEn ? 'Practice' : 'Luyện tập'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/profile`}
                  className="hover:text-koreanRed dark:hover:text-red-400 transition-colors"
                >
                  {isEn ? 'Profile' : 'Hồ sơ cá nhân'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Course categories */}
          <div>
            <h4 className="text-sm font-bold text-charcoal dark:text-stone-100 uppercase tracking-wider mb-4">
              {isEn ? 'Courses' : 'Khóa học'}
            </h4>
            <ul className="flex flex-col gap-3 text-xs font-semibold">
              <li>
                <Link
                  href={`/${locale}/courses`}
                  className="hover:text-koreanRed dark:hover:text-red-400 transition-colors"
                >
                  TOPIK I - {isEn ? 'Beginner' : 'Sơ cấp'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/courses`}
                  className="hover:text-koreanRed dark:hover:text-red-400 transition-colors"
                >
                  TOPIK II - {isEn ? 'Intermediate' : 'Trung cấp'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/courses`}
                  className="hover:text-koreanRed dark:hover:text-red-400 transition-colors"
                >
                  TOPIK II - {isEn ? 'Advanced' : 'Cao cấp'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-sm font-bold text-charcoal dark:text-stone-100 uppercase tracking-wider mb-4">
              {isEn ? 'Support' : 'Liên hệ'}
            </h4>
            <ul className="flex flex-col gap-3.5 text-xs font-semibold">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-koreanRed" />
                <span>support@hanquochoc.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-koreanRed" />
                <span>1900 1234 56</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-koreanRed" />
                <span>{isEn ? 'Ho Chi Minh City, Vietnam' : 'TP. Hồ Chí Minh, Việt Nam'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full h-px bg-stone-200/60 dark:bg-stone-850 my-8" />

        {/* Copyright Area */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 flex-wrap">
            <span>
              © 2026 {isEn ? 'Korean Learning' : 'Hàn Quốc Học'}.{' '}
              {isEn ? 'All rights reserved.' : 'Tất cả quyền được bảo lưu.'}
            </span>
            <span className="inline-flex items-center gap-1 bg-stone-100 dark:bg-stone-850 px-2 py-0.5 rounded-md text-charcoal dark:text-stone-300 font-bold border border-stone-200/40 dark:border-stone-800/60">
              <Copyright size={11} className="text-koreanRed" />
              <span>Vinhdev</span>
            </span>
          </span>
          <div className="flex gap-6">
            <Link href={`/${locale}`} className="hover:text-koreanRed transition-colors">
              {isEn ? 'Privacy Policy' : 'Chính sách bảo mật'}
            </Link>
            <Link href={`/${locale}`} className="hover:text-koreanRed transition-colors">
              {isEn ? 'Terms of Use' : 'Điều khoản sử dụng'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
