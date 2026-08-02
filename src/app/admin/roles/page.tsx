'use client';

import React from 'react';

/**
 * CMS Quản lý Role và Phân quyền theo Màn hình & Dữ liệu
 * @returns React Component cho trang quản lý vai trò và phân quyền của admin
 */
export default function AdminRolesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Phân quyền & Vai trò (RBAC)</h1>
        <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          + Thêm Vai trò mới
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* List of roles */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Danh sách Vai trò</h3>
          <ul className="mt-4 space-y-2">
            {['Super Admin', 'Admin Content', 'Học viên (User)'].map((role, idx) => (
              <li
                key={idx}
                className={`cursor-pointer rounded-md p-3 text-sm font-medium transition-all ${
                  idx === 0
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-gray-800 dark:text-white'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                {role}
              </li>
            ))}
          </ul>
        </div>

        {/* Permissions setup matrix (Skeleton) */}
        <div className="md:col-span-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Chi tiết Quyền hạn (Super Admin)</h3>
          
          <div className="mt-6 space-y-4">
            {[
              { screen: 'Quản lý khóa học (CMS)', permissions: ['Xem', 'Thêm', 'Sửa', 'Xóa'] },
              { screen: 'Ngân hàng câu hỏi', permissions: ['Xem', 'Thêm', 'Sửa', 'Xóa', 'Import/Export'] },
              { screen: 'Quản lý học viên', permissions: ['Xem', 'Khóa'] },
              { screen: 'Cấu hình hệ thống & Phân quyền', permissions: ['Toàn quyền'] },
            ].map((p, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{p.screen}</span>
                <div className="flex gap-2">
                  {p.permissions.map((perm, pIdx) => (
                    <span
                      key={pIdx}
                      className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-gray-800 dark:text-green-400"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              Lưu thay đổi phân quyền
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
