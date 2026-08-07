
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Globe, Moon, Sun, Layers, Award, Home } from 'lucide-react';

/**
 * Component Header cho dự án Học Tiếng Hàn trực tuyến.
 * Thiết kế theo phong cách Korean Red / Seoul Sunset nguyên bản, hỗ trợ đa thiết bị và đa ngôn ngữ Next.js.
 */
/**
 * Component Header cho dự án Học Tiếng Hàn trực tuyến.
 * Hỗ trợ chuyển đổi trạng thái trong suốt (transparent) khi ở đầu trang chủ và đục dần khi cuộn trang.
 * Hỗ trợ đa thiết bị và đa ngôn ngữ Next.js.
 */
export default function HeaderClient() {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const locale = pathname.split('/')[1] || 'vn';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Lắng nghe sự kiện scroll để tạo hiệu ứng trong suốt trên trang chủ
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Xác định xem trang hiện tại có phải trang chủ không
  const isHomePage = pathname === `/${locale}` || pathname === '/' || pathname === `/vn` || pathname === `/en`;

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

  // Lớp CSS cho container header tùy thuộc vào vị trí cuộn và trang hiện tại
  const headerClass = isHomePage
    ? (isScrolled
        ? 'fixed top-0 left-0 w-full bg-white/95 dark:bg-stone-900/95 border-b border-stone-200/50 dark:border-stone-800/80 backdrop-blur-md text-charcoal dark:text-stone-100 z-50 transition-all duration-300 shadow-sm'
        : 'absolute top-0 left-0 w-full bg-transparent border-b border-transparent text-white z-50 transition-all duration-300')
    : 'sticky top-0 w-full bg-white dark:bg-stone-900 border-b border-stone-200/50 dark:border-stone-800/80 backdrop-blur-md text-charcoal dark:text-stone-100 z-50 transition-all duration-300';

  // Lớp CSS cho menu link tùy thuộc vào trang chủ/trạng thái cuộn và trạng thái active
  const getMenuLinkClass = (path: string, exact = false) => {
    const active = exact 
      ? pathname === `/${locale}` || pathname === '/'
      : isActive(path);

    if (isHomePage && !isScrolled) {
      return `px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
        active 
          ? 'bg-white/15 text-white' 
          : 'text-white/80 hover:bg-white/5 hover:text-white'
      }`;
    }

    return `px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
      active 
        ? 'bg-koreanRed-light text-koreanRed dark:bg-koreanRed/10 dark:text-red-400' 
        : 'text-charcoal-muted dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-850 hover:text-koreanRed dark:hover:text-red-400'
    }`;
  };

  // return (
  //   <header className="sticky top-0 z-50 w-full bg-white dark:bg-stone-900 border-b border-stone-200/50 dark:border-stone-800/80 backdrop-blur-md transition-colors duration-300">
  //     <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
  //     ...
  return (
    <header className={headerClass}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">

        <nav className="hidden md:flex items-center gap-1 font-outfit">
          <Link 
            href={`/${locale}`} 
            className={getMenuLinkClass('', true)}
          >
            Trang chủ
          </Link>
          <Link 
            href={`/${locale}/courses`} 
            className={getMenuLinkClass('/courses')}
          >
            Khóa học
          </Link>
          <Link 
            href={`/${locale}/practice`} 
            className={getMenuLinkClass('/practice')}
          >
            Luyện tập
          </Link>
          <Link 
            href={`/${locale}/profile`} 
            className={getMenuLinkClass('/profile')}
          >
            Hồ sơ
          </Link>
        </nav>

          <button 
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border transition-colors ${
              isHomePage && !isScrolled
                ? 'border-white/20 hover:bg-white/10 text-white/90'
                : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-850 text-charcoal-muted dark:text-stone-300'
            }`}
            title={theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Link 
            href={`/${locale}/login`}
            className={`px-4 py-2.5 text-sm font-bold transition-all active:scale-95 ${
              isHomePage && !isScrolled
                ? 'text-white/90 hover:text-white hover:underline'
                : 'text-charcoal dark:text-stone-200 hover:text-koreanRed dark:hover:text-red-400'
            }`}
          >
            Đăng nhập
          </Link>
          <Link 
            href={`/${locale}/register`}
            className="btn-primary py-3 px-6 text-sm font-bold active:scale-95 shadow-md shadow-koreanRed/10 bg-koreanRed hover:bg-koreanRed-dark text-white rounded-xl"
          >
            Đăng ký miễn phí
          </Link>
        </div>

      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white dark:bg-stone-900 border-b border-stone-200/80 dark:border-stone-800 p-6 flex flex-col gap-4 md:hidden shadow-lg animate-in fade-in slide-in-from-top-5 duration-300 font-outfit">
          <Link 
            href={`/${locale}`} 
            onClick={() => setMobileMenuOpen(false)}
            className={`text-sm font-bold ${isActive('/') ? 'text-koreanRed dark:text-red-400' : 'text-charcoal-muted dark:text-stone-300'}`}
          >
            Trang chủ
          </Link>
          <Link 
            href={`/${locale}/courses`} 
            onClick={() => setMobileMenuOpen(false)}
            className={`text-sm font-semibold hover:text-koreanRed ${isActive('/courses') ? 'text-koreanRed dark:text-red-400' : 'text-charcoal-muted dark:text-stone-300'}`}
          >
            Khóa học
          </Link>
          <Link 
            href={`/${locale}/practice`} 
            onClick={() => setMobileMenuOpen(false)}
            className={`text-sm font-semibold hover:text-koreanRed ${isActive('/practice') ? 'text-koreanRed dark:text-red-400' : 'text-charcoal-muted dark:text-stone-300'}`}
          >
            Luyện tập
          </Link>
          <Link 
            href={`/${locale}/profile`} 
            onClick={() => setMobileMenuOpen(false)}
            className={`text-sm font-semibold hover:text-koreanRed ${isActive('/profile') ? 'text-koreanRed dark:text-red-400' : 'text-charcoal-muted dark:text-stone-300'}`}
          >
            Hồ sơ
          </Link>
          <div className="h-px bg-stone-100 dark:bg-stone-850 my-2" />
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
              className="w-full btn-primary py-3 text-sm font-bold text-center bg-koreanRed hover:bg-koreanRed-dark text-white rounded-xl block"
            >
              Đăng ký miễn phí
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
