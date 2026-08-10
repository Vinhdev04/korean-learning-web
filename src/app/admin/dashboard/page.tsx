// OLD:
/*
export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
...
*/

'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  BookOpen,
  Video,
  HelpCircle,
  TrendingUp,
  ArrowUpRight,
  UserCheck,
  Award,
  Sparkles,
} from 'lucide-react';

// OLD:
// export default function AdminDashboardPage() {
//   return (
//     <div className="space-y-8 font-outfit">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         ...
//       </div>
//     </div>
//   );
// }

import { Activity, Clock, ArrowUpRight, ShieldCheck, ArrowDownRight } from 'lucide-react';

/**
 * Trang Dashboard Tổng quan quản trị Admin CMS
 * Hiển thị các chỉ số hoạt động then chốt, nhật ký hoạt động gần đây và danh sách học viên mới đăng ký.
 * @returns React Component
 */
export default function AdminDashboardPage() {
  // Mock dữ liệu 4 thẻ KPI theo phong cách màu pastel hoàng hôn Seoul
  const kpiData = [
    {
      name: 'Tổng Học Viên',
      value: '1,248',
      desc: '+12% so với tháng trước',
      icon: Users,
      trend: 'up',
      color:
        'bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 border-orange-100/50 dark:border-orange-900/30',
    },
    {
      name: 'Khóa Học Đang Mở',
      value: '6',
      desc: '+1 khóa mới tháng này',
      icon: BookOpen,
      trend: 'up',
      color:
        'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border-amber-100/50 dark:border-amber-900/30',
    },
    {
      name: 'Lượt Xem Hôm Nay',
      value: '3,420',
      desc: '+24% so với hôm qua',
      icon: Video,
      trend: 'up',
      color:
        'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border-rose-100/50 dark:border-rose-900/30',
    },
    {
      name: 'Đăng Nhập Hôm Nay',
      value: '185',
      desc: '+8% hoạt động',
      icon: HelpCircle,
      trend: 'up',
      color:
        'bg-pink-50 dark:bg-pink-950/20 text-pink-600 dark:text-pink-400 border-pink-100/50 dark:border-pink-900/30',
    },
  ];

  // Mock dữ liệu học viên mới đăng ký có TOPIK mục tiêu & trạng thái online
  const newStudents = [
    {
      name: 'Nguyễn Văn Minh',
      email: 'minhnv@gmail.com',
      time: '2 giờ trước',
      initial: 'M',
      topikGoal: 'TOPIK II Cấp 3',
      online: true,
      color: 'bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400',
    },
    {
      name: 'Trần Thị Phương',
      email: 'phuongtt@gmail.com',
      time: '4 giờ trước',
      initial: 'P',
      topikGoal: 'TOPIK I Cấp 2',
      online: false,
      color: 'bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400',
    },
    {
      name: 'Lê Anh Tuấn',
      email: 'tuanla@gmail.com',
      time: '1 ngày trước',
      initial: 'T',
      topikGoal: 'TOPIK II Cấp 5',
      online: true,
      color: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    },
  ];

  // Mock dữ liệu hoạt động gần đây của các admin và hệ thống
  const recentActivities = [
    {
      admin: 'Nguyễn Văn Minh',
      role: 'Admin',
      action: 'Thêm bài học mới "Ngữ pháp sơ cấp 1 - Bài 3"',
      time: '15 phút trước',
      type: 'create',
      badgeColor: 'bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400',
    },
    {
      admin: 'Hệ thống bảo mật',
      role: 'System',
      action: 'Khóa tài khoản spammer101@gmail.com do đăng nhập sai 5 lần',
      time: '1 giờ trước',
      type: 'security',
      badgeColor: 'bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400',
    },
    {
      admin: 'Trần Thị Phương',
      role: 'Admin',
      action: 'Xuất file Excel danh sách học viên đăng ký khóa TOPIK II',
      time: '3 giờ trước',
      type: 'export',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    },
    {
      admin: 'Lê Anh Tuấn',
      role: 'Học viên',
      action: 'Hoàn thành bài thi thử TOPIK I Sơ Cấp Đạt 100/100',
      time: '4 giờ trước',
      type: 'system',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    },
    {
      admin: 'Vinh Admin',
      role: 'Super Admin',
      action: 'Cập nhật phân quyền truy cập cho nhóm Biên tập viên',
      time: '5 giờ trước',
      type: 'update',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
    },
  ];

  return (
    <div className="space-y-8 font-outfit text-slate-800 dark:text-slate-200">
      {/* Header Trang */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Tổng quan hệ thống
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Báo cáo thống kê hoạt động học tập và tương tác của học viên hôm nay.
          </p>
        </div>
      </div>

      {/* 1. Stat Cards Grid - Bo góc rounded-2xl, màu sắc kem/pastel Seoul sunset */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border bg-[#FAF8F5] dark:bg-slate-900 p-6 shadow-sm hover:shadow-md hover:border-orange-500/30 transition-all duration-300 group ${stat.color.split(' ')[2]}`}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {stat.name}
                </span>
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center border border-current/10 ${stat.color}`}
              >
                <stat.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-200/50 dark:border-slate-800/50 pt-3">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {stat.desc}
              </span>
              <span className="flex items-center text-teal-600 dark:text-teal-400 text-xs font-bold gap-0.5">
                <TrendingUp size={12} />
                +12.5%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Charts & Lists Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Custom CSS Columns Chart (Visual Data Viz) */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm lg:col-span-2 space-y-6 flex flex-col justify-between transition-colors">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity size={18} className="text-orange-500" />
              Lượt tương tác học tập
            </h3>
            <span className="text-[10px] text-orange-500 dark:text-orange-400 font-extrabold bg-orange-500/10 dark:bg-orange-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
              7 ngày qua
            </span>
          </div>

          {/* Custom Column Chart */}
          <div className="flex items-end justify-between h-56 pt-6 px-2 border-b border-slate-100 dark:border-slate-800">
            {[
              { day: 'Thứ 2', height: '40%', val: '120 lượt' },
              { day: 'Thứ 3', height: '65%', val: '210 lượt' },
              { day: 'Thứ 4', height: '50%', val: '160 lượt' },
              { day: 'Thứ 5', height: '85%', val: '320 lượt' },
              { day: 'Thứ 6', height: '70%', val: '240 lượt' },
              { day: 'Thứ 7', height: '95%', val: '380 lượt' },
              { day: 'Chủ Nhật', height: '60%', val: '190 lượt' },
            ].map((col, idx) => (
              <div key={idx} className="flex flex-col items-center group w-1/8 space-y-2">
                {/* Val Tooltip on Hover */}
                <span className="opacity-0 group-hover:opacity-100 text-[10px] bg-slate-900 dark:bg-slate-800 text-white font-bold px-2 py-0.5 rounded-lg -translate-y-1 transition-all duration-300">
                  {col.val}
                </span>

                {/* Bar */}
                <div
                  style={{ height: col.height }}
                  className="w-full bg-slate-200 dark:bg-slate-800 group-hover:bg-gradient-to-t group-hover:from-orange-500 group-hover:to-rose-500 rounded-t-xl transition-all duration-550 cursor-pointer shadow-inner relative"
                >
                  <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-transparent rounded-t-xl transition-all" />
                </div>

                {/* Label */}
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors uppercase pt-2">
                  {col.day}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 pt-1">
            <p>Trục ngang: Các ngày trong tuần</p>
            <p className="flex items-center gap-1 text-orange-500 font-bold">
              <Sparkles size={12} /> Tương tác đạt đỉnh: Thứ 7
            </p>
          </div>
        </div>

        {/* Right: New Students List - Thêm TOPIK goal & Online Indicator */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6 transition-colors">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <UserCheck size={18} className="text-rose-500" />
              Học viên mới
            </h3>
            <Link
              href="/admin/users"
              className="text-xs font-bold text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 transition-colors"
            >
              Xem tất cả
            </Link>
          </div>

          <div className="space-y-4">
            {newStudents.map((user, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-2xl transition-colors duration-200"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm ${user.color}`}
                    >
                      {user.initial}
                    </div>
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900 ${
                        user.online ? 'bg-teal-500 animate-pulse' : 'bg-slate-350 dark:bg-slate-650'
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-none truncate">
                      {user.name}
                    </h4>
                    <p className="text-[10px] text-slate-450 dark:text-slate-550 font-semibold mt-1 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-450 border border-rose-500/20">
                    {user.topikGoal}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500">
                    {user.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Hoạt Động Hệ Thống Gần Đây - Hàng mới bổ sung */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6 transition-colors">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock size={18} className="text-amber-500" />
            Nhật ký hoạt động gần đây
          </h3>
          <Link
            href="/admin/audit-logs"
            className="text-xs font-bold text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 transition-colors"
          >
            Xem toàn bộ nhật ký
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <th className="pb-3.5 pl-2">Người thực hiện</th>
                <th className="pb-3.5">Hành động</th>
                <th className="pb-3.5 text-right pr-2">Thời gian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/50 text-xs">
              {recentActivities.map((act, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-850/30 transition-colors"
                >
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] flex items-center justify-center shadow-sm">
                        {act.admin.split(' ').pop()?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">
                          {act.admin}
                        </div>
                        <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-0.5 tracking-wide">
                          {act.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-semibold text-slate-650 dark:text-slate-350">
                    {act.action}
                  </td>
                  <td className="py-4 text-right text-slate-400 dark:text-slate-500 font-bold pr-2">
                    {act.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
