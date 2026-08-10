'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Shield,
  ShieldAlert,
  Monitor,
  Globe,
  Clock,
  CheckCircle2,
  UserCheck,
} from 'lucide-react';

/**
 * Interface đại diện cho một bản ghi nhật ký thao tác (Audit Log)
 */
interface AuditLogItem {
  id: string;
  user: {
    name: string;
    email: string;
    avatarColor: string;
    initial: string;
  };
  action: string;
  description: string;
  category: 'security' | 'action' | 'delete' | 'update';
  ipAddress: string;
  device: string;
  timestamp: string;
}

/**
 * Trang Nhật ký thao tác hệ thống (Audit Logs CMS)
 * Ghi lại các lịch sử thao tác quan trọng của nhân sự quản trị để phục vụ công tác giám sát bảo mật.
 * @returns React Component
 */
export default function AdminAuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [userFilter, setUserFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mock dữ liệu nhật ký thao tác bảo mật
  const [logs] = useState<AuditLogItem[]>([
    {
      id: 'AUD-001',
      user: {
        name: 'Vinh Admin',
        email: 'vinhadmin@korean.com',
        avatarColor: 'bg-orange-500/10 text-orange-600',
        initial: 'V',
      },
      action: 'Đăng nhập hệ thống',
      description: 'Đăng nhập thành công vào trang quản trị CMS.',
      category: 'security',
      ipAddress: '192.168.1.15',
      device: 'Chrome / Windows 11',
      timestamp: '10/08/2026 14:32:15',
    },
    {
      id: 'AUD-002',
      user: {
        name: 'Trần Minh Super',
        email: 'minh.super@korean.com',
        avatarColor: 'bg-rose-500/10 text-rose-600',
        initial: 'M',
      },
      action: 'Cập nhật cấu hình SMTP',
      description: 'Thay đổi SMTP Host từ localhost sang smtp.gmail.com.',
      category: 'update',
      ipAddress: '113.190.23.45',
      device: 'Safari / macOS Sonoma',
      timestamp: '10/08/2026 13:15:20',
    },
    {
      id: 'AUD-003',
      user: {
        name: 'Nguyễn Văn Minh',
        email: 'minhnv@gmail.com',
        avatarColor: 'bg-amber-500/10 text-amber-600',
        initial: 'M',
      },
      action: 'Xóa bài học liên kết',
      description: 'Xóa bài giảng "Từ vựng nâng cao TOPIK II".',
      category: 'delete',
      ipAddress: '171.244.18.99',
      device: 'Firefox / Linux Mint',
      timestamp: '09/08/2026 17:40:02',
    },
    {
      id: 'AUD-004',
      user: {
        name: 'Vinh Admin',
        email: 'vinhadmin@korean.com',
        avatarColor: 'bg-orange-500/10 text-orange-600',
        initial: 'V',
      },
      action: 'Xuất Excel Danh sách học viên',
      description: 'Xuất báo cáo 450 học viên thuộc lớp Sơ cấp 1.',
      category: 'action',
      ipAddress: '192.168.1.15',
      device: 'Chrome / Windows 11',
      timestamp: '09/08/2026 10:05:44',
    },
    {
      id: 'AUD-005',
      user: {
        name: 'Hệ thống tự động',
        email: 'system@korean.edu.vn',
        avatarColor: 'bg-slate-500/10 text-slate-600',
        initial: 'S',
      },
      action: 'Đăng nhập thất bại',
      description: 'Thử nhập sai mật khẩu quá 5 lần từ địa chỉ IP lạ.',
      category: 'security',
      ipAddress: '203.113.155.8',
      device: 'Unknown Device / Android',
      timestamp: '08/08/2026 23:59:12',
    },
    {
      id: 'AUD-006',
      user: {
        name: 'Trần Minh Super',
        email: 'minh.super@korean.com',
        avatarColor: 'bg-rose-500/10 text-rose-600',
        initial: 'M',
      },
      action: 'Thay đổi phân quyền vai trò',
      description: 'Chỉnh sửa ma trận quyền của vai trò "Admin".',
      category: 'update',
      ipAddress: '113.190.23.45',
      device: 'Safari / macOS Sonoma',
      timestamp: '08/08/2026 15:30:11',
    },
  ]);

  /**
   * Hiển thị thông báo nhanh trong 3 giây
   * @param message Nội dung thông báo
   */
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Lọc dữ liệu nhật ký thao tác
  const filteredLogs = logs.filter(log => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.includes(searchQuery);

    const matchesCategory = categoryFilter === 'All' || log.category === categoryFilter;
    const matchesUser = userFilter === 'All' || log.user.name === userFilter;

    return matchesSearch && matchesCategory && matchesUser;
  });

  return (
    <div className="space-y-8 font-outfit text-slate-800 dark:text-slate-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white px-5 py-3.5 shadow-2xl border border-slate-700/50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 size={16} className="text-orange-500" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Nhật ký thao tác hệ thống
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Xem lịch sử hoạt động bảo mật, cấu hình, thêm sửa xóa dữ liệu của đội ngũ quản trị viên.
          </p>
        </div>
        <button
          onClick={() => showToast('Đang xuất tệp nhật ký thao tác dạng CSV...')}
          className="rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-5 py-3 text-sm font-bold shadow-md shadow-orange-500/25 active:scale-95 transition-all self-start sm:self-auto"
        >
          Xuất tệp CSV
        </button>
      </div>

      {/* Bộ Lọc Nhật Ký */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Ô Tìm Kiếm */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo hành động, địa chỉ IP hoặc mô tả chi tiết..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-550 transition-colors"
            />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-4">
            {/* Lọc Nhân sự */}
            <div className="relative min-w-[160px] flex-1 sm:flex-none">
              <select
                value={userFilter}
                onChange={e => setUserFilter(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl text-sm focus:outline-none focus:border-orange-500 dark:text-white appearance-none cursor-pointer font-semibold text-slate-655"
              >
                <option value="All">Tất cả nhân sự</option>
                <option value="Vinh Admin">Vinh Admin</option>
                <option value="Trần Minh Super">Trần Minh Super</option>
                <option value="Nguyễn Văn Minh">Nguyễn Văn Minh</option>
                <option value="Hệ thống tự động">Hệ thống tự động</option>
              </select>
              <Filter className="absolute right-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Lọc Nhóm Thao Tác */}
            <div className="relative min-w-[160px] flex-1 sm:flex-none">
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl text-sm focus:outline-none focus:border-orange-500 dark:text-white appearance-none cursor-pointer font-semibold text-slate-655"
              >
                <option value="All">Tất cả thao tác</option>
                <option value="security">Bảo mật (Đăng nhập)</option>
                <option value="update">Cập nhật cấu hình</option>
                <option value="delete">Hành động xóa</option>
                <option value="action">Thao tác dữ liệu khác</option>
              </select>
              <Filter className="absolute right-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Bảng Nhật Ký Audit logs */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-[11px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                <th className="py-4 pl-6 w-16">STT</th>
                <th className="py-4">Nhân sự</th>
                <th className="py-4">Hành động thực thi</th>
                <th className="py-4">Địa chỉ IP</th>
                <th className="py-4">Thiết bị truy cập</th>
                <th className="py-4 pr-6 w-44">Thời gian thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log, idx) => (
                  <tr
                    key={log.id}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-850/10 transition-colors"
                  >
                    <td className="py-4 pl-6 font-bold text-slate-400 dark:text-slate-500">
                      {String(idx + 1).padStart(2, '0')}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-sm ${log.user.avatarColor}`}
                        >
                          {log.user.initial}
                        </div>
                        <div>
                          <span className="block font-bold text-xs text-slate-800 dark:text-slate-200">
                            {log.user.name}
                          </span>
                          <span className="block text-[9px] text-slate-400">{log.user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 dark:text-white text-xs leading-tight">
                            {log.action}
                          </span>
                          <span
                            className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[8px] font-extrabold ${
                              log.category === 'security'
                                ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400'
                                : log.category === 'delete'
                                  ? 'bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400'
                                  : log.category === 'update'
                                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400'
                                    : 'bg-slate-100 text-slate-650 dark:bg-slate-800 dark:text-slate-350'
                            }`}
                          >
                            {log.category}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-450 dark:text-slate-400 font-semibold block leading-relaxed">
                          {log.description}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 font-bold text-slate-700 dark:text-slate-350">
                        <Globe size={11} className="text-slate-400" />
                        {log.ipAddress}
                      </span>
                    </td>
                    <td className="py-4 text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1 font-semibold">
                        <Monitor size={11} className="text-slate-400" />
                        <span>{log.device}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-6 text-slate-450 dark:text-slate-550 font-bold">
                      <div className="flex items-center gap-1.5">
                        <Clock size={11} className="text-slate-400" />
                        <span>{log.timestamp}</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-slate-400 dark:text-slate-550 font-bold"
                  >
                    Không tìm thấy bản ghi nhật ký thao tác nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
