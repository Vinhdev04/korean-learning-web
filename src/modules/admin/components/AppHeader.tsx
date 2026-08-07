'use client';

/*
export default function AppHeader() {
  const { toggleMobileSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:px-6">
...
*/

import React from 'react';
import { useSidebar } from '@/core/context/SidebarContext';
import { LogOut, User, Menu } from 'lucide-react';
import AuthService from '@/service/authService';

export default function AppHeader() {
  const { toggleMobileSidebar } = useSidebar();
  const { logOut } = AuthService();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-8 font-outfit">

      <div className="flex items-center gap-4">
        
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

