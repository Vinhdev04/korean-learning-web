'use client';

import React from 'react';

/**
 * CMS Quản lý Khóa học, Chương học, Bài học và Video
 * @returns React Component cho trang quản lý khóa học của admin
 */
export default function AdminCoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CMS Quản lý Khóa học</h1>
        <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          + Thêm khóa học
        </button>
      </div>

      {/* Danh sách khóa học dạng bảng */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left text-sm text-gray-500">
          <thead className="bg-gray-50 dark:bg-gray-800 text-xs font-semibold uppercase text-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-4">Tên khóa học</th>
              <th className="px-6 py-4">Trình độ</th>
              <th className="px-6 py-4">Số bài học</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 dark:bg-gray-900 bg-white">
            {[1, 2, 3].map(course => (
              <tr key={course}>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  Tiếng Hàn Sơ cấp {course}
                </td>
                <td className="px-6 py-4">TOPIK I</td>
                <td className="px-6 py-4">12 bài</td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                    Đã xuất bản
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button className="text-indigo-600 hover:text-indigo-900 font-medium">Sửa</button>
                  <button className="text-red-600 hover:text-red-950 font-medium">Ẩn</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
