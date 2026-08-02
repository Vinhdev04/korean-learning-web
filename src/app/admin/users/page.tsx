'use client';

import React from 'react';

/**
 * CMS Quản lý Người dùng / Học viên
 * @returns React Component cho trang quản lý người dùng của admin
 */
export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý Học viên</h1>
        <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          + Tạo tài khoản mới
        </button>
      </div>

      {/* Danh sách người dùng */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left text-sm text-gray-500">
          <thead className="bg-gray-50 dark:bg-gray-800 text-xs font-semibold uppercase text-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-4">Họ & Tên</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Vai trò (Role)</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 dark:bg-gray-900 bg-white">
            {[
              { name: 'Nguyễn Văn A', email: 'vana@gmail.com', role: 'Học viên', status: 'Hoạt động' },
              { name: 'Trần Thị B', email: 'thib@gmail.com', role: 'Biên tập viên', status: 'Hoạt động' },
              { name: 'Lê Văn C', email: 'vanc@gmail.com', role: 'Quản trị viên', status: 'Bị khóa' },
            ].map((user, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      user.status === 'Hoạt động'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button className="text-indigo-600 hover:text-indigo-900 font-medium">Sửa</button>
                  <button className="text-red-600 hover:text-red-950 font-medium">Khóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
