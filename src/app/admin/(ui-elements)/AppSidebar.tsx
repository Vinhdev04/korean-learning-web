'use client';

// OLD:
/*
export default function AppSidebar() {
  const pathname = usePathname();
  const { isExpanded, isMobileOpen, toggleSidebar } = useSidebar();

  const menuItems = [
    { name: 'Tổng quan (Dashboard)', path: '/admin/dashboard' },
    { name: 'Quản lý khóa học', path: '/admin/courses' },
    { name: 'Ngân hàng câu hỏi', path: '/admin/questions' },
    { name: 'Quản lý người dùng', path: '/admin/users' },
    { name: 'Phân quyền & Vai trò', path: '/admin/roles' },
  ];
...
*/

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  HelpCircle, 
  Users, 
  ShieldAlert, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export default function AppSidebar() {
  const pathname = usePathname();
  const { isExpanded, toggleSidebar, isMobileOpen } = useSidebar();

  const menuItems = [
    { name: 'Tổng quan (Dashboard)', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Quản lý khóa học', path: '/admin/courses', icon: BookOpen },
    { name: 'Ngân hàng câu hỏi', path: '/admin/questions', icon: HelpCircle },
    { name: 'Quản lý người dùng', path: '/admin/users', icon: Users },
    { name: 'Phân quyền & Vai trò', path: '/admin/roles', icon: ShieldAlert },
  ];

  return (
    <aside
      className={`fixed bottom-0 top-0 z-50 flex flex-col border-r border-slate-800 bg-slate-950 text-slate-400 transition-all duration-300 ease-in-out lg:translate-x-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isExpanded ? 'w-[240px]' : 'w-[90px]'}`}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-900">
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-white font-bold group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white shadow-md shadow-teal-600/25">
            <GraduationCap size={18} />
          </div>
          {isExpanded && (
            <span className="font-extrabold tracking-tight text-sm bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent transition-all">
              ADMIN PORTAL
            </span>
          )}
        </Link>
        {isExpanded && (
          <button 
            onClick={toggleSidebar} 
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg hover:bg-slate-900 text-slate-500 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
        )}
        {!isExpanded && (
          <button 
            onClick={toggleSidebar} 
            className="hidden lg:flex mx-auto h-7 w-7 items-center justify-center rounded-lg hover:bg-slate-900 text-slate-500 hover:text-white transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Menu Links */}
      <nav className="flex-1 space-y-1.5 px-3 py-6">
        {menuItems.map((item) => {
          const isActive = pathname?.startsWith(item.path);
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 rounded-xl py-3 text-sm font-semibold transition-all duration-200 group ${
                isExpanded ? 'px-4' : 'justify-center px-0'
              } ${
                isActive
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/10'
                  : 'hover:bg-slate-900 hover:text-white'
              }`}
            >
              <item.icon size={18} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-teal-400 transition-colors'} />
              {isExpanded && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

