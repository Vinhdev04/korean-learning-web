'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Moon, Sun, Search, Bell } from 'lucide-react';
import { useTheme } from '@/core/context/ThemeContext';

/**
 * Component Header cho dự án Học Tiếng Hàn trực tuyến.
 * Hỗ trợ chuyển đổi trạng thái trong suốt (transparent) khi ở đầu trang chủ và đục dần khi cuộn trang.
 * Hỗ trợ đa thiết bị, đa ngôn ngữ Next.js, chuyển theme và đồng bộ hóa session người dùng.
 */
export default function HeaderClient() {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const locale = pathname.split('/')[1] || 'vn';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Đồng bộ hóa Theme từ Context toàn cục
  const { theme, toggleTheme } = useTheme();

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

  // Trạng thái đăng nhập cục bộ dựa trên session cookie
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * Đọc giá trị cookie theo tên key
   * @param name - Tên cookie cần lấy
   * @returns Giá trị cookie nhận được
   */
  const getCookie = (name: string): string => {
    if (typeof document === 'undefined') return '';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  };

  // Đồng bộ cookie đăng nhập khi thay đổi đường dẫn (chuyển trang)
  useEffect(() => {
    const id = getCookie('user_id');
    if (id && Number(id) > 0) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [pathname]);

  /**
   * Đăng xuất người dùng bằng cách xoá cookie và điều hướng
   */
  const handleLogout = () => {
    document.cookie = 'user_id=; path=/; max-age=0';
    document.cookie = 'token=; path=/; max-age=0';
    setIsLoggedIn(false);
    router.push(`/${locale}/login`);
  };

  // Xác định xem trang hiện tại có phải trang chủ không
  const isHomePage =
    pathname === `/${locale}` || pathname === '/' || pathname === `/vn` || pathname === `/en`;

  // Xác định active tab dựa trên pathname
  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  // Lớp CSS cho container header tùy thuộc vào vị trí cuộn và trang hiện tại
  const headerClass = isHomePage
    ? isScrolled
      ? 'fixed top-0 left-0 w-full bg-white/95 dark:bg-stone-900/95 border-b border-stone-200/50 dark:border-stone-800/80 backdrop-blur-md text-charcoal dark:text-stone-100 z-50 transition-all duration-300 shadow-sm'
      : 'absolute top-0 left-0 w-full bg-transparent border-b border-transparent text-white z-50 transition-all duration-300'
    : 'sticky top-0 w-full bg-white dark:bg-stone-900 border-b border-stone-200/50 dark:border-stone-800/80 backdrop-blur-md text-charcoal dark:text-stone-100 z-50 transition-all duration-300';

  // Lớp CSS cho menu link tùy thuộc vào trang chủ/trạng thái cuộn và trạng thái active
  const getMenuLinkClass = (path: string, exact = false) => {
    const active = exact ? pathname === `/${locale}` || pathname === '/' : isActive(path);

    if (isHomePage && !isScrolled) {
      return `px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
        active
          ? 'bg-white/15 text-white shadow-inner'
          : 'text-white/80 hover:bg-white/5 hover:text-white'
      }`;
    }

    return `px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
      active
        ? 'bg-koreanRed-light text-koreanRed dark:bg-koreanRed/10 dark:text-red-400'
        : 'text-charcoal-muted dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-850 hover:text-koreanRed dark:hover:text-red-400'
    }`;
  };

  return (
    <header className={headerClass}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12 relative">
        {/* LOGO THƯƠNG HIỆU PHÍA BÊN TRÁI */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 active:scale-95 transition-all"
        >
          <div className="w-9 h-9 rounded-xl bg-koreanRed flex items-center justify-center shadow-md shadow-koreanRed/20 transform hover:rotate-3 transition-transform">
            <span className="text-white font-bold text-base font-sans">한</span>
          </div>
          <span className="text-lg font-extrabold tracking-tight text-charcoal dark:text-stone-100 font-sans">
            Hàn Quốc Học
          </span>
        </Link>

        {/* MENU ĐIỀU HƯỚNG CHÍNH GIỮA (DESKTOP) */}
        <nav className="hidden md:flex items-center gap-1 font-sans">
          <Link href={`/${locale}`} className={getMenuLinkClass('', true)}>
            Trang chủ
          </Link>
          <Link href={`/${locale}/courses`} className={getMenuLinkClass('/courses')}>
            Khóa học
          </Link>
          <Link href={`/${locale}/practice`} className={getMenuLinkClass('/practice')}>
            Luyện tập
          </Link>
          <Link href={`/${locale}/profile`} className={getMenuLinkClass('/profile')}>
            Hồ sơ
          </Link>
        </nav>

        {/* BÊN PHẢI: TÌM KIẾM, THEME, USER STATE & MOBILE TOGGLE */}
        <div className="flex items-center gap-3 sm:gap-4 font-sans">
          {/* Nút Tìm kiếm */}
          <button
            className={`p-2.5 rounded-xl transition-colors hover:bg-stone-50 dark:hover:bg-stone-850 text-charcoal-muted dark:text-stone-300 ${
              isHomePage && !isScrolled ? 'hover:bg-white/10 text-white/90' : ''
            }`}
            aria-label="Tìm kiếm"
          >
            <Search size={18} />
          </button>

          {/* Nút Thông báo (Hiển thị khi đã đăng nhập) */}
          {isLoggedIn && (
            <div className="relative">
              <button
                className={`p-2.5 rounded-xl transition-colors hover:bg-stone-50 dark:hover:bg-stone-850 text-charcoal-muted dark:text-stone-300 ${
                  isHomePage && !isScrolled ? 'hover:bg-white/10 text-white/90' : ''
                }`}
                aria-label="Thông báo"
              >
                <Bell size={18} />
              </button>
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center border border-white dark:border-stone-900 animate-pulse">
                3
              </span>
            </div>
          )}

          {/* Nút Chuyển theme */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl transition-colors hover:bg-stone-50 dark:hover:bg-stone-850 text-charcoal-muted dark:text-stone-300 ${
              isHomePage && !isScrolled ? 'hover:bg-white/10 text-white/90' : ''
            }`}
            title={theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Trạng thái Đăng nhập / Đăng ký (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 pl-3 border-l border-stone-200 dark:border-stone-800">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-stone-200 dark:border-stone-850 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="User Avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-charcoal dark:text-stone-150 leading-none">
                    Phạm Thanh Mai
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-[10px] font-bold text-koreanRed dark:text-red-400 hover:underline text-left mt-1"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <>
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
                  className="bg-koreanRed hover:bg-koreanRed-dark text-white text-sm font-bold py-2.5 px-5 rounded-xl transition-all active:scale-95 shadow-md shadow-koreanRed/10 block"
                >
                  Đăng ký miễn phí
                </Link>
              </>
            )}
          </div>

          {/* Toggle Menu di động (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2.5 rounded-xl md:hidden transition-colors hover:bg-stone-50 dark:hover:bg-stone-850 text-charcoal-muted dark:text-stone-300 ${
              isHomePage && !isScrolled ? 'hover:bg-white/10 text-white/90' : ''
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* PANEL MENU DI ĐỘNG (MOBILE LAYOUT) */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white dark:bg-stone-900 border-b border-stone-200/80 dark:border-stone-800 p-6 flex flex-col gap-4 md:hidden shadow-lg animate-in fade-in slide-in-from-top-5 duration-300 font-sans z-50">
          <Link
            href={`/${locale}`}
            onClick={() => setMobileMenuOpen(false)}
            className={`text-sm font-bold py-2 px-3 rounded-lg ${pathname === `/${locale}` || pathname === '/' ? 'bg-koreanRed/10 text-koreanRed dark:text-red-400' : 'text-charcoal-muted dark:text-stone-300'}`}
          >
            Trang chủ
          </Link>
          <Link
            href={`/${locale}/courses`}
            onClick={() => setMobileMenuOpen(false)}
            className={`text-sm font-bold py-2 px-3 rounded-lg ${isActive('/courses') ? 'bg-koreanRed/10 text-koreanRed dark:text-red-400' : 'text-charcoal-muted dark:text-stone-300'}`}
          >
            Khóa học
          </Link>
          <Link
            href={`/${locale}/practice`}
            onClick={() => setMobileMenuOpen(false)}
            className={`text-sm font-bold py-2 px-3 rounded-lg ${isActive('/practice') ? 'bg-koreanRed/10 text-koreanRed dark:text-red-400' : 'text-charcoal-muted dark:text-stone-300'}`}
          >
            Luyện tập
          </Link>
          <Link
            href={`/${locale}/profile`}
            onClick={() => setMobileMenuOpen(false)}
            className={`text-sm font-bold py-2 px-3 rounded-lg ${isActive('/profile') ? 'bg-koreanRed/10 text-koreanRed dark:text-red-400' : 'text-charcoal-muted dark:text-stone-300'}`}
          >
            Hồ sơ
          </Link>

          <div className="h-px bg-stone-150 dark:bg-stone-850 my-2" />

          <div className="flex flex-col gap-3">
            {isLoggedIn ? (
              <div className="flex flex-col gap-3 items-center text-center bg-stone-50 dark:bg-stone-950 p-4 rounded-2xl border border-stone-150/40 dark:border-stone-800">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="User Avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-sm font-bold text-charcoal dark:text-stone-200">
                  Phạm Thanh Mai
                </span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full py-2.5 text-sm font-bold text-koreanRed border border-koreanRed/20 rounded-xl hover:bg-koreanRed/5 transition-colors"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <>
                <Link
                  href={`/${locale}/login`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-sm font-bold text-charcoal dark:text-stone-200 border border-stone-200 dark:border-stone-800 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors text-center"
                >
                  Đăng nhập
                </Link>
                <Link
                  href={`/${locale}/register`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-sm font-bold text-center bg-koreanRed hover:bg-koreanRed-dark text-white rounded-xl block"
                >
                  Đăng ký miễn phí
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
