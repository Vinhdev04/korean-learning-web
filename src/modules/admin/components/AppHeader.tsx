'use client';

/*
export default function AppHeader() {
  const { toggleMobileSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:px-6">
...
*/

// OLD:
// import React from 'react';
// import { useSidebar } from '@/core/context/SidebarContext';
// import { LogOut, User, Menu } from 'lucide-react';
// import AuthService from '@/service/authService';
//
//
// import React from 'react';
// import Link from 'next/link';
// import { useSidebar } from '@/core/context/SidebarContext';
// import { LogOut, Menu, Bell, Home, ChevronDown } from 'lucide-react';
// import AuthService from '@/service/authService';

import React from 'react';
import Link from 'next/link';
import { useSidebar } from '@/core/context/SidebarContext';
import { LogOut, Menu, Bell, Home } from 'lucide-react';
import AuthService from '@/service/authService';

/**
 * Header chính cho giao diện quản trị Admin CMS
 * Hỗ trợ các lối tắt nhanh, hiển thị thông báo, thông tin admin và đăng xuất.
 * @returns React Component
 */
export default function AppHeader() {
  const { toggleMobileSidebar, isExpanded } = useSidebar();
  const { logOut } = AuthService();

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md px-4 md:px-8 font-outfit transition-colors">
      {/* Cột trái: Toggle Menu cho Mobile & Nút Trang chủ */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-95 transition-all"
        >
          <Menu size={18} />
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800"
        >
          <Home size={14} />
          <span className="hidden sm:inline">Về trang chủ</span>
        </Link>
      </div>

      {/* Cột phải: Thông báo & Profile Admin */}
      <div className="flex items-center gap-4">
        {/* Chuông thông báo */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 text-slate-450 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all active:scale-95"
          title="Thông báo"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-950 animate-pulse" />
        </button>

        {/* Line phân cách dọc */}
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-850" />

        {/* Profile Admin thu gọn */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 leading-tight">
              Vinh Admin
            </span>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Super Admin
            </span>
          </div>

          <button
            onClick={logOut}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-450 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-300 active:scale-95"
            title="Đăng xuất khỏi hệ thống"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
