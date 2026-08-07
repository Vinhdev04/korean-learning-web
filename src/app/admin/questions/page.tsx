'use client';

import React from 'react';

/**
 * CMS Quản lý Ngân hàng Câu hỏi
 * @returns React Component cho trang quản lý câu hỏi của admin
 */
export default function AdminQuestionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ngân hàng Câu hỏi</h1>
        <div className="flex gap-3">
          <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Import Excel
          </button>
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            + Thêm câu hỏi
          </button>
        </div>
      </div>

      {/* Filter bar (Skeleton) */}
      <div className="flex gap-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
        <select className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500">
          <option>Chọn khóa học</option>
          <option>Tiếng Hàn Sơ cấp 1</option>
        </select>
        <select className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500">
          <option>Chọn bài học</option>
          <option>Bài 1: Chào hỏi</option>
        </select>
      </div>

      {/* Table câu hỏi */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left text-sm text-gray-500">
          <thead className="bg-gray-50 dark:bg-gray-800 text-xs font-semibold uppercase text-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-4">Nội dung câu hỏi</th>
              <th className="px-6 py-4">Loại câu hỏi</th>
              <th className="px-6 py-4">Khóa học / Bài học</th>
              <th className="px-6 py-4">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 dark:bg-gray-900 bg-white">
            {[1, 2, 3].map(q => (
              <tr key={q}>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Từ nào sau đây là &quot;Cảm ơn&quot;? (감사합니다)
                </td>
                <td className="px-6 py-4">Trắc nghiệm (Quiz)</td>
                <td className="px-6 py-4 text-xs">Sơ cấp 1 / Bài 1</td>
                <td className="px-6 py-4 flex gap-3">
                  <button className="text-indigo-600 hover:text-indigo-900 font-medium">Sửa</button>
                  <button className="text-red-600 hover:text-red-950 font-medium">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
