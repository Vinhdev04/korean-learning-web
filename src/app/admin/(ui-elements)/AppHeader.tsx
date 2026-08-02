'use client';

// OLD:
/*
export default function AppHeader() {
  const { toggleMobileSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:px-6">
...
*/

import React from 'react';
import { useSidebar } from '@/context/SidebarContext';
import { LogOut, User, Menu } from 'lucide-react';
import AuthService from '@/service/authService';

export default function AppHeader() {
  const { toggleMobileSidebar } = useSidebar();
  const { logOut } = AuthService();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-8 font-outfit">
      
      {/* Left section: Hamburger menu & Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMobileSidebar}
          className="rounded-xl p-2 hover:bg-slate-100 lg:hidden text-slate-500 hover:text-slate-800 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-base font-extrabold tracking-tight text-slate-900 hidden sm:block">
          HỆ THỐNG QUẢN TRỊ CMS
        </h2>
      </div>

      {/* Right section: User Profile & LogOut */}
      <div className="flex items-center gap-4">
        {/* User profile */}
        <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
          <div className="h-8 w-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold border border-teal-200/50">
            A
          </div>
          <span className="text-xs font-bold text-slate-700 hidden sm:inline">Quản trị viên</span>
        </div>

        {/* LogOut Action */}
        <button
          onClick={logOut}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 active:scale-95"
          title="Đăng xuất khỏi hệ thống"
        >
          <LogOut size={18} />
        </button>
      </div>

    </header>
  );
}

