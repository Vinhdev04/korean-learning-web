
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Globe, Moon, Sun, Layers, Award, Home } from 'lucide-react';

/**
 * Component Header cho dự án Học Tiếng Hàn trực tuyến.
 * Thiết kế theo phong cách Korean Red / Seoul Sunset nguyên bản, hỗ trợ đa thiết bị và đa ngôn ngữ Next.js.
 */
export default function HeaderClient() {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const locale = pathname.split('/')[1] || 'vn';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Xác định active tab dựa trên pathname
  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  // Đổi ngôn ngữ thông qua Next.js router
  const changeLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  // Chuyển đổi Dark / Light mode toàn cục
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-stone-900 border-b border-stone-200/50 dark:border-stone-800/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-koreanRed flex items-center justify-center transition-transform duration-300 group-hover:scale-105 active:scale-95">
              <span className="text-white font-bold text-lg">한</span>
            </div>
            <span className="text-xl font-extrabold text-charcoal dark:text-stone-100 tracking-tight transition-colors group-hover:text-koreanRed font-outfit">
              Hàn Quốc Học
            </span>
          </Link>
        </div>

        {/* Navigation Menu (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 font-outfit">
          <Link 
            href={`/${locale}`} 
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              pathname === `/${locale}` || pathname === '/'
                ? 'bg-koreanRed-light text-koreanRed dark:bg-koreanRed/10 dark:text-red-400' 
                : 'text-charcoal-muted dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-koreanRed dark:hover:text-red-400'
            }`}
          >
            Trang chủ
          </Link>
          <Link 
            href={`/${locale}/courses`} 
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all ${
              isActive('/courses') 
                ? 'bg-koreanRed-light text-koreanRed dark:bg-koreanRed/10 dark:text-red-400' 
                : 'text-charcoal-muted dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-koreanRed dark:hover:text-red-400'
            }`}
          >
            <Layers size={14} />
            Khóa học
          </Link>
          <Link 
            href={`/${locale}/profile`} 
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all ${
              isActive('/profile') 
                ? 'bg-koreanRed-light text-koreanRed dark:bg-koreanRed/10 dark:text-red-400' 
                : 'text-charcoal-muted dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-koreanRed dark:hover:text-red-400'
            }`}
          >
            <Award size={14} />
            Cá nhân
          </Link>
        </nav>

        {/* Right Interface Widgets & Authentication (Desktop) */}
        <div className="hidden md:flex items-center gap-4 font-outfit">
          {/* Language Selection Switch (VN / EN) */}
          <div className="flex items-center border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden p-0.5 bg-stone-50 dark:bg-stone-950">
            <button 
              onClick={() => changeLocale('vn')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                locale === 'vn' 
                  ? 'bg-white dark:bg-stone-800 text-koreanRed dark:text-red-400 shadow-sm' 
                  : 'text-charcoal-muted dark:text-stone-400 hover:text-charcoal'
              }`}
              title="Tiếng Việt"
            >
              VI
            </button>
            <button 
              onClick={() => changeLocale('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                locale === 'en' 
                  ? 'bg-white dark:bg-stone-800 text-koreanRed dark:text-red-400 shadow-sm' 
                  : 'text-charcoal-muted dark:text-stone-400 hover:text-charcoal'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Dark Mode Switch */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-charcoal-muted dark:text-stone-300 transition-colors"
            title={theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Auth Buttons */}
          <Link 
            href={`/${locale}/login`}
            className="px-4 py-2.5 text-sm font-bold text-charcoal dark:text-stone-200 hover:text-koreanRed dark:hover:text-red-400 transition-all active:scale-95"
          >
            Đăng nhập
          </Link>
          <Link 
            href={`/${locale}/register`}
            className="btn-primary py-3 px-6 text-sm font-bold active:scale-95 shadow-md shadow-koreanRed/10"
          >
            Đăng ký
          </Link>
        </div>

        {/* Mobile Actions (Language, Theme & Menu toggle) */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-charcoal-muted dark:text-stone-300 hover:bg-stone-50 transition-colors"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button 
            onClick={() => changeLocale(locale === 'vn' ? 'en' : 'vn')}
            className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-charcoal-muted dark:text-stone-300 flex items-center gap-1 hover:bg-stone-50 transition-colors"
            title="Change Language"
          >
            <Globe size={18} />
            <span className="text-xs font-bold uppercase">{locale}</span>
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-charcoal dark:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Flyout Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white dark:bg-stone-900 border-b border-stone-200/80 dark:border-stone-800 p-6 flex flex-col gap-4 md:hidden shadow-lg animate-in fade-in slide-in-from-top-5 duration-300 font-outfit">
          <Link 
            href={`/${locale}`} 
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-koreanRed dark:text-red-400"
          >
            Trang chủ
          </Link>
          <Link 
            href={`/${locale}/courses`} 
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-charcoal-muted dark:text-stone-300 hover:text-koreanRed"
          >
            Khóa học
          </Link>
          <Link 
            href={`/${locale}/profile`} 
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-charcoal-muted dark:text-stone-300 hover:text-koreanRed"
          >
            Cá nhân
          </Link>
          <div className="h-px bg-stone-100 dark:bg-stone-800 my-2" />
          <div className="flex flex-col gap-3">
            <Link 
              href={`/${locale}/login`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-sm font-bold text-charcoal dark:text-stone-200 border border-stone-200 dark:border-stone-800 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-center"
            >
              Đăng nhập
            </Link>
            <Link 
              href={`/${locale}/register`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full btn-primary py-3 text-sm font-bold text-center"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
