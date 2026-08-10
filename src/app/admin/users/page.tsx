'use client';

import React from 'react';

/**
 * CMS Quản lý Người dùng / Học viên
 * @returns React Component cho trang quản lý người dùng của admin
 */
// OLD:
// export default function AdminUsersPage() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý Học viên</h1>
//         <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
//           + Tạo tài khoản mới
//         </button>
//       </div>
//       ...
//     </div>
//   );
// }

import { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  UserX,
  UserCheck,
  Eye,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

/**
 * Interface đại diện cho thông tin một tài khoản người dùng trong hệ thống
 */
interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Học Viên' | 'Biên Tập Viên';
  topikLevel: string;
  createdDate: string;
  status: 'Hoạt động' | 'Đã khóa';
  avatarColor: string;
  initial: string;
}

/**
 * Trang Quản lý Người dùng & Học viên trong hệ thống Admin CMS
 * Hỗ trợ tìm kiếm, lọc theo vai trò, trạng thái, phân trang, và xuất báo cáo.
 * @returns React Component
 */
export default function AdminUsersPage() {
  // Trạng thái tìm kiếm và bộ lọc
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mock dữ liệu 10 người dùng để phân trang
  const [users, setUsers] = useState<UserAccount[]>([
    {
      id: 'USR-001',
      name: 'Nguyễn Văn Minh',
      email: 'minhnv@gmail.com',
      role: 'Admin',
      topikLevel: 'TOPIK II Cấp 3',
      createdDate: '10/05/2026',
      status: 'Hoạt động',
      avatarColor: 'bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400',
      initial: 'M',
    },
    {
      id: 'USR-002',
      name: 'Trần Thị Phương',
      email: 'phuongtt@gmail.com',
      role: 'Biên Tập Viên',
      topikLevel: 'TOPIK I Cấp 2',
      createdDate: '12/06/2026',
      status: 'Hoạt động',
      avatarColor: 'bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400',
      initial: 'P',
    },
    {
      id: 'USR-003',
      name: 'Lê Anh Tuấn',
      email: 'tuanla@gmail.com',
      role: 'Học Viên',
      topikLevel: 'TOPIK II Cấp 5',
      createdDate: '01/07/2026',
      status: 'Đã khóa',
      avatarColor: 'bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
      initial: 'T',
    },
    {
      id: 'USR-004',
      name: 'Phạm Minh Khoa',
      email: 'khoapm@gmail.com',
      role: 'Học Viên',
      topikLevel: 'TOPIK I Cấp 1',
      createdDate: '15/07/2026',
      status: 'Hoạt động',
      avatarColor: 'bg-teal-100 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400',
      initial: 'K',
    },
    {
      id: 'USR-005',
      name: 'Hoàng Mai Chi',
      email: 'chihm@gmail.com',
      role: 'Học Viên',
      topikLevel: 'TOPIK II Cấp 4',
      createdDate: '18/07/2026',
      status: 'Hoạt động',
      avatarColor: 'bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400',
      initial: 'C',
    },
    {
      id: 'USR-006',
      name: 'Đỗ Tiến Đạt',
      email: 'datdt@gmail.com',
      role: 'Học Viên',
      topikLevel: 'TOPIK II Cấp 6',
      createdDate: '22/07/2026',
      status: 'Hoạt động',
      avatarColor: 'bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
      initial: 'Đ',
    },
    {
      id: 'USR-007',
      name: 'Vinh Admin',
      role: 'Super Admin',
      email: 'vinhadmin@korean.com',
      topikLevel: 'TOPIK II Cấp 6',
      createdDate: '01/01/2026',
      status: 'Hoạt động',
      avatarColor:
        'bg-gradient-to-tr from-orange-500/10 to-rose-500/10 text-orange-600 dark:text-orange-400',
      initial: 'V',
    },
  ]);

  // Kích thước trang phân trang
  const itemsPerPage = 5;

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

  /**
   * Khóa hoặc Mở khóa tài khoản học viên dựa vào ID
   * @param id ID của tài khoản cần thay đổi trạng thái
   */
  const toggleUserStatus = (id: string) => {
    // OLD: setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Hoạt động' ? 'Đã khóa' : 'Hoạt động' } : u));
    setUsers(prevUsers =>
      prevUsers.map(u => {
        if (u.id === id) {
          const nextStatus = u.status === 'Hoạt động' ? 'Đã khóa' : 'Hoạt động';
          showToast(`Đã ${nextStatus.toLowerCase()} tài khoản học viên ${u.name} thành công!`);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  /**
   * Giả lập xuất file dữ liệu Excel danh sách học viên
   */
  const handleExportExcel = () => {
    showToast('Đang tạo và tải file Excel danh sách người dùng...');
  };

  // Tiến hành lọc dữ liệu dựa trên Search và Dropdowns
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8 font-outfit text-slate-800 dark:text-slate-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white px-5 py-3.5 shadow-2xl border border-slate-700/50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <AlertCircle size={16} className="text-orange-500" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Tiêu đề & Nút Thêm mới */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Quản lý người dùng
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Xem danh sách học viên, quản trị viên, phân quyền và trạng thái hoạt động.
          </p>
        </div>
        <button
          onClick={() => showToast('Tính năng Thêm tài khoản mới sẽ được tích hợp ở Sprint sau!')}
          className="rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-5 py-3 text-sm font-bold shadow-md shadow-orange-500/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          + Thêm tài khoản mới
        </button>
      </div>

      {/* Hộp Công Cụ Tìm Kiếm & Bộ Lọc - Đạt chuẩn high-end visual design */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Ô Tìm Kiếm */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm học viên theo tên, email hoặc mã học viên..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-550 transition-colors"
            />
          </div>

          {/* Bộ lọc vai trò */}
          <div className="flex flex-wrap sm:flex-nowrap gap-4">
            <div className="relative min-w-[150px] flex-1 sm:flex-none">
              <select
                value={roleFilter}
                onChange={e => {
                  setRoleFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-4 pr-10 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl text-sm focus:outline-none focus:border-orange-500 dark:text-white appearance-none cursor-pointer font-semibold text-slate-655"
              >
                <option value="All">Tất cả vai trò</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Admin">Admin</option>
                <option value="Biên Tập Viên">Biên Tập Viên</option>
                <option value="Học Viên">Học Viên</option>
              </select>
              <Filter className="absolute right-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Bộ lọc trạng thái */}
            <div className="relative min-w-[150px] flex-1 sm:flex-none">
              <select
                value={statusFilter}
                onChange={e => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-4 pr-10 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl text-sm focus:outline-none focus:border-orange-500 dark:text-white appearance-none cursor-pointer font-semibold text-slate-655"
              >
                <option value="All">Tất cả trạng thái</option>
                <option value="Hoạt động">Hoạt động</option>
                <option value="Đã khóa">Đã khóa</option>
              </select>
              <Filter className="absolute right-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Nút Xuất Excel */}
            <button
              onClick={handleExportExcel}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-5 py-3 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-900 active:scale-95 transition-all text-slate-700 dark:text-slate-300 w-full sm:w-auto"
            >
              <Download size={16} />
              <span>Xuất Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Màn hình Desktop: Hiển thị dạng bảng (md:block) */}
      <div className="hidden md:block overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-[11px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
              <th className="py-4 pl-6">ID & Họ Tên</th>
              <th className="py-4">Email</th>
              <th className="py-4">Vai trò</th>
              <th className="py-4">Mục tiêu TOPIK</th>
              <th className="py-4">Ngày tham gia</th>
              <th className="py-4">Trạng thái</th>
              <th className="py-4 pr-6 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map(user => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/40 dark:hover:bg-slate-850/20 transition-colors"
                >
                  <td className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-9 w-9 rounded-xl flex items-center justify-center font-extrabold shadow-sm ${user.avatarColor}`}
                      >
                        {user.initial}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-800 dark:text-slate-200 text-sm leading-none">
                          {user.name}
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 mt-1 block">
                          {user.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-semibold text-slate-600 dark:text-slate-400">
                    {user.email}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[10px] font-bold ${
                        user.role === 'Super Admin'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          : user.role === 'Admin'
                            ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                            : user.role === 'Biên Tập Viên'
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                              : 'bg-slate-100 text-slate-650 dark:bg-slate-800 dark:text-slate-350'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="font-bold text-slate-700 dark:text-slate-300 bg-amber-500/5 dark:bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/10">
                      {user.topikLevel}
                    </span>
                  </td>
                  <td className="py-4 font-bold text-slate-450 dark:text-slate-500">
                    {user.createdDate}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        user.status === 'Hoạt động'
                          ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${user.status === 'Hoạt động' ? 'bg-teal-500' : 'bg-rose-500'}`}
                      />
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => showToast(`Xem thông tin chi tiết của ${user.name}`)}
                        className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-orange-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${
                          user.status === 'Hoạt động'
                            ? 'text-slate-450 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20'
                            : 'text-teal-600 hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-teal-950/20'
                        }`}
                        title={user.status === 'Hoạt động' ? 'Khóa tài khoản' : 'Mở khóa'}
                      >
                        {user.status === 'Hoạt động' ? (
                          <UserX size={15} />
                        ) : (
                          <UserCheck size={15} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-8 text-center text-slate-400 dark:text-slate-500 font-bold"
                >
                  Không tìm thấy người dùng phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Màn hình Mobile/Tablet: Tự động chuyển thành dạng danh sách thẻ (md:hidden) */}
      <div className="block md:hidden space-y-4">
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map(user => (
            <div
              key={user.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4 transition-colors"
            >
              {/* Header card */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center font-extrabold shadow-sm ${user.avatarColor}`}
                  >
                    {user.initial}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                      {user.name}
                    </h4>
                    <span className="text-[9px] font-bold text-slate-400">{user.id}</span>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center rounded-lg px-2 py-0.5 text-[9px] font-bold ${
                    user.role === 'Super Admin'
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      : user.role === 'Admin'
                        ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                        : 'bg-slate-100 text-slate-650 dark:bg-slate-800 dark:text-slate-350'
                  }`}
                >
                  {user.role}
                </span>
              </div>

              {/* Thông tin chi tiết */}
              <div className="grid grid-cols-2 gap-y-2.5 text-[11px] border-t border-slate-100 dark:border-slate-800 pt-3">
                <div>
                  <span className="text-slate-400 block font-bold uppercase tracking-wider text-[9px]">
                    Email
                  </span>
                  <span className="font-semibold text-slate-600 dark:text-slate-400 truncate block">
                    {user.email}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold uppercase tracking-wider text-[9px]">
                    Mục tiêu TOPIK
                  </span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {user.topikLevel}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold uppercase tracking-wider text-[9px]">
                    Ngày tham gia
                  </span>
                  <span className="font-bold text-slate-500">{user.createdDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold uppercase tracking-wider text-[9px]">
                    Trạng thái
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      user.status === 'Hoạt động'
                        ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400'
                        : 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${user.status === 'Hoạt động' ? 'bg-teal-500' : 'bg-rose-500'}`}
                    />
                    {user.status}
                  </span>
                </div>
              </div>

              {/* Thao tác nút bấm chân card */}
              <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => showToast(`Xem thông tin chi tiết của ${user.name}`)}
                  className="flex-1 py-2 rounded-xl text-slate-600 dark:text-slate-350 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 flex items-center justify-center gap-1.5 text-xs font-bold transition-all active:scale-95"
                >
                  <Eye size={13} />
                  <span>Chi tiết</span>
                </button>
                <button
                  onClick={() => toggleUserStatus(user.id)}
                  className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all active:scale-95 ${
                    user.status === 'Hoạt động'
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 border border-rose-100 dark:border-rose-950/30'
                      : 'bg-teal-50 text-teal-650 dark:bg-teal-950/20 dark:text-teal-400 border border-teal-100 dark:border-teal-950/30'
                  }`}
                >
                  {user.status === 'Hoạt động' ? (
                    <>
                      <UserX size={13} />
                      <span>Khóa</span>
                    </>
                  ) : (
                    <>
                      <UserCheck size={13} />
                      <span>Mở khóa</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center text-slate-400 dark:text-slate-500 font-bold transition-colors">
            Không tìm thấy người dùng phù hợp.
          </div>
        )}
      </div>

      {/* Điều Khiển Phân Trang (Pagination) */}
      <div className="flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800/60 pt-6">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          Hiển thị từ {(currentPage - 1) * itemsPerPage + 1} đến{' '}
          {Math.min(currentPage * itemsPerPage, filteredUsers.length)} trong tổng số{' '}
          {filteredUsers.length} tài khoản
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-40 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent transition-all active:scale-90"
          >
            <ChevronLeft size={16} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`h-9 w-9 rounded-xl text-xs font-bold border transition-all active:scale-90 ${
                currentPage === i + 1
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-40 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent transition-all active:scale-90"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
