'use client';

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

// OLD:
// import React from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useSidebar } from '@/core/context/SidebarContext';
// import { 
//   LayoutDashboard, 
//   BookOpen, 
//   HelpCircle, 
//   Users, 
//   ShieldAlert, 
//   ChevronLeft, 
//   ChevronRight,
//   GraduationCap
// } from 'lucide-react';
// 
// export default function AppSidebar() {
//   const pathname = usePathname();
//   const { isExpanded, toggleSidebar, isMobileOpen } = useSidebar();
// 
//   const menuItems = [
//     { name: 'Tổng quan (Dashboard)', path: '/admin/dashboard', icon: LayoutDashboard },
//     { name: 'Quản lý khóa học', path: '/admin/courses', icon: BookOpen },
//     { name: 'Ngân hàng câu hỏi', path: '/admin/questions', icon: HelpCircle },
//     { name: 'Quản lý người dùng', path: '/admin/users', icon: Users },
//     { name: 'Phân quyền & Vai trò', path: '/admin/roles', icon: ShieldAlert },
//   ];
// 
//   return (
//     <aside
//       className={`fixed bottom-0 top-0 z-50 flex flex-col border-r border-slate-800 bg-slate-950 text-slate-400 transition-all duration-300 ease-in-out lg:translate-x-0 ${
//         isMobileOpen ? 'translate-x-0' : '-translate-x-full'
//       } ${isExpanded ? 'w-[240px]' : 'w-[90px]'}`}
//     >
//       
//       <nav className="flex-1 space-y-1.5 px-3 py-6">
//         {menuItems.map((item) => {
//           const isActive = pathname?.startsWith(item.path);
//           return (
//             <Link
//               key={item.path}
//               href={item.path}
//               className={`flex items-center gap-3 rounded-xl py-3 text-sm font-semibold transition-all duration-200 group ${
//                 isExpanded ? 'px-4' : 'justify-center px-0'
//               } ${
//                 isActive
//                   ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/10'
//                   : 'hover:bg-slate-900 hover:text-white'
//               }`}
//             >
//               <item.icon size={18} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-teal-400 transition-colors'} />
//               {isExpanded && <span>{item.name}</span>}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/core/context/SidebarContext';
import { useTheme } from '@/core/context/ThemeContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  HelpCircle, 
  Users, 
  ShieldAlert, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap,
  Video,
  Languages,
  TrendingUp,
  Settings,
  ClipboardList,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';
import AuthService from '@/service/authService';

/**
 * Sidebar điều hướng chính cho phân hệ quản trị (Admin CMS)
 * Hỗ trợ 10 chức năng điều hành, chuyển chế độ sáng/tối, hiển thị profile admin và hỗ trợ thu gọn.
 * @returns React Component
 */
export default function AppSidebar() {
  const pathname = usePathname();
  const { isExpanded, toggleSidebar, isMobileOpen } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const { logOut } = AuthService();

  // Danh sách 10 menu chức năng chính của Sprint 2
  const menuItems = [
    { name: 'Tổng quan', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Quản lý khóa học', path: '/admin/courses', icon: GraduationCap },
    { name: 'Quản lý bài học', path: '/admin/lessons', icon: Video },
    { name: 'Ngân hàng câu hỏi', path: '/admin/questions', icon: HelpCircle },
    { name: 'Kho từ vựng', path: '/admin/vocabulary', icon: Languages },
    { name: 'Quản lý người dùng', path: '/admin/users', icon: Users },
    { name: 'Phân quyền hệ thống', path: '/admin/roles', icon: ShieldAlert },
    { name: 'Báo cáo thống kê', path: '/admin/analytics', icon: TrendingUp },
    { name: 'Cấu hình hệ thống', path: '/admin/settings', icon: Settings },
    { name: 'Nhật ký thao tác', path: '/admin/audit-logs', icon: ClipboardList },
  ];

  return (
    <aside
      className={`fixed bottom-0 top-0 z-50 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 transition-all duration-300 ease-in-out lg:translate-x-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isExpanded ? 'w-[260px]' : 'w-[88px]'}`}
    >
      {/* Header Sidebar: Logo & Thương hiệu */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-500 to-rose-600 text-white font-black text-lg shadow-md shadow-orange-500/20">
            K
          </div>
          {isExpanded && (
            <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white uppercase">
              Admin <span className="text-orange-500">CMS</span>
            </span>
          )}
        </Link>
        {isExpanded && (
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
        )}
      </div>

      {/* Body: Danh sách menu */}
      <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto scrollbar-thin">
        {menuItems.map((item) => {
          const isActive = pathname === item.path || pathname?.startsWith(item.path + '/');
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3.5 rounded-xl py-3 text-sm font-semibold transition-all duration-200 group ${
                isExpanded ? 'px-4' : 'justify-center px-0'
              } ${
                isActive
                  ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <item.icon 
                size={18} 
                className={
                  isActive 
                    ? 'text-orange-500 dark:text-orange-400' 
                    : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors'
                } 
              />
              {isExpanded && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Sidebar: Profile & Darkmode */}
      <div className="border-t border-slate-100 dark:border-slate-800 p-4 space-y-3.5 bg-slate-50/50 dark:bg-slate-950/20">
        {/* Toggle Dark Mode */}
        <button
          onClick={toggleTheme}
          className={`flex w-full items-center gap-3.5 rounded-xl py-2.5 text-xs font-bold transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-900 ${
            isExpanded ? 'px-4 justify-between' : 'justify-center px-0'
          }`}
        >
          <div className="flex items-center gap-3.5">
            {theme === 'light' ? (
              <>
                <Moon size={16} className="text-slate-400" />
                {isExpanded && <span>Chế độ tối</span>}
              </>
            ) : (
              <>
                <Sun size={16} className="text-amber-500" />
                {isExpanded && <span className="text-amber-500">Chế độ sáng</span>}
              </>
            )}
          </div>
          {isExpanded && (
            <div className={`h-4 w-8 rounded-full p-0.5 transition-colors ${theme === 'dark' ? 'bg-orange-500' : 'bg-slate-300'}`}>
              <div className={`h-3 w-3 rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
          )}
        </button>

        {/* Profile Admin */}
        <div className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} gap-2`}>
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-extrabold text-sm flex items-center justify-center shadow-sm">
              AD
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-teal-500 border border-white dark:border-slate-950" />
            </div>
            {isExpanded && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">Vinh Admin</span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Super Admin</span>
              </div>
            )}
          </div>

          {isExpanded && (
            <button
              onClick={logOut}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
              title="Đăng xuất"
            >
              <LogOut size={15} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}


