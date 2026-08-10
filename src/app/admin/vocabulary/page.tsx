'use client';

import React from 'react';
import {
  Search,
  Filter,
  Upload,
  Plus,
  Edit3,
  Trash2,
  AlertCircle,
  FileSpreadsheet,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useVocabManagement } from '@/modules/admin/hooks/useVocabManagement';

/**
 * Trang quản lý Kho từ vựng tiếng Hàn (Vocabulary Repository CMS)
 * Hiển thị mini-stats, bảng từ vựng Hangeul cỡ lớn, và mock nhập dữ liệu Excel có màn hình xem trước (preview).
 * @returns React Component
 */
export default function AdminVocabularyPage() {
  const {
    searchQuery,
    setSearchQuery,
    courseFilter,
    setCourseFilter,
    showImportPreview,
    setShowImportPreview,
    importing,
    vocabList,
    mockExcelData,
    filteredVocab,
    handleStartImport,
    handleConfirmSaveImport,
    handleDeleteVocab,
  } = useVocabManagement();

  return (
    <div className="space-y-8 font-outfit text-slate-800 dark:text-slate-200">
      {/* Tiêu đề & Công Cụ Nút bấm */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Kho từ vựng hệ thống
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Quản lý cơ sở dữ liệu từ vựng tiếng Hàn kèm phiên âm IPA, nghĩa dịch và liên kết bài
            giảng.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
          {/* Nút Nhập Excel */}
          <button
            onClick={handleStartImport}
            disabled={importing}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-855 bg-slate-55 dark:bg-slate-955 px-5 py-3 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-900 active:scale-95 disabled:opacity-50 transition-all text-slate-750 dark:text-slate-300"
          >
            <Upload size={16} className="text-orange-500" />
            <span>{importing ? 'Đang đọc file...' : 'Nhập Excel'}</span>
          </button>

          <button
            onClick={() => toast.info('Tính năng Thêm từ vựng mới sẽ được tích hợp ở Sprint sau!')}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-5 py-3 text-sm font-bold shadow-md shadow-orange-500/25 active:scale-95 transition-all"
          >
            <Plus size={16} />
            <span>Thêm từ vựng</span>
          </button>
        </div>
      </div>

      {/* 1. Chỉ số thống kê nhanh (Mini Stats) - Đúng Seoul Sunset Style */}
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: 'Tổng Từ Vựng',
            value: vocabList.length,
            color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20',
          },
          {
            label: 'Liên Kết Khóa Học',
            value: 2,
            color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20',
          },
          {
            label: 'Bài Học Có Từ',
            value: 4,
            color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20',
          },
          {
            label: 'Độ Dài Trung Bình',
            value: '3.8 ký tự',
            color: 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/20',
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center gap-4 transition-colors"
          >
            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center font-extrabold text-sm ${stat.color}`}
            >
              {idx + 1}
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                {stat.label}
              </span>
              <span className="text-xl font-extrabold text-slate-800 dark:text-white">
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Hộp thoại Xem trước dữ liệu Nhập Excel (DoD) */}
      {showImportPreview && (
        <div className="rounded-3xl border border-orange-200 dark:border-orange-900 bg-orange-50/20 dark:bg-orange-950/10 p-6 shadow-sm space-y-4 border-dashed animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
                <FileSpreadsheet size={20} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Xem trước dữ liệu nhập từ Excel
                </h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">
                  Vui lòng kiểm tra kỹ các trường thông tin trước khi xác nhận lưu chính thức.
                </p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => setShowImportPreview(false)}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-bold hover:bg-slate-50 text-slate-655"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmSaveImport}
                className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-xs font-bold shadow-md shadow-orange-500/10"
              >
                Xác nhận lưu
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-orange-200/50 dark:border-orange-900/30 bg-white dark:bg-slate-950">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-orange-100 dark:border-orange-900 text-[10px] font-extrabold text-orange-500 dark:text-orange-400 uppercase tracking-wider bg-orange-500/5">
                  <th className="py-3 pl-4">Từ vựng (Hàn)</th>
                  <th className="py-3">Phiên âm</th>
                  <th className="py-3">Ý nghĩa (Việt)</th>
                  <th className="py-3">Bài học liên kết</th>
                  <th className="py-3 pr-4">Khóa học</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100/40 dark:divide-orange-900/20 font-medium">
                {mockExcelData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-orange-500/[0.02]">
                    <td className="py-3.5 pl-4 text-base font-black text-slate-900 dark:text-white">
                      {item.word}
                    </td>
                    <td className="py-3.5 font-mono italic text-slate-500 dark:text-slate-450">
                      {item.pronunciation}
                    </td>
                    <td className="py-3.5 font-bold text-slate-700 dark:text-slate-300">
                      {item.meaning}
                    </td>
                    <td className="py-3.5 text-slate-650 dark:text-slate-350">
                      {item.lessonTitle}
                    </td>
                    <td className="py-3.5 pr-4 text-slate-400 dark:text-slate-500 font-bold">
                      {item.courseTitle}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Thanh Tìm Kiếm & Bộ Lọc */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm từ vựng theo chữ Hangeul, phiên âm hoặc ý nghĩa dịch..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-550 transition-colors"
            />
          </div>

          <div className="relative min-w-[200px]">
            <select
              value={courseFilter}
              onChange={e => setCourseFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl text-sm focus:outline-none focus:border-orange-500 dark:text-white appearance-none cursor-pointer font-semibold text-slate-655"
            >
              <option value="All">Tất cả khóa học</option>
              <option value="Tiếng Hàn Sơ Cấp 1">Tiếng Hàn Sơ Cấp 1</option>
              <option value="Tiếng Hàn Sơ Cấp 2">Tiếng Hàn Sơ Cấp 2</option>
            </select>
            <Filter className="absolute right-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 4. Bảng Dữ Liệu Từ Vựng (Hàn to đậm, IPA, Việt) */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-[11px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                <th className="py-4 pl-6 w-16">STT</th>
                <th className="py-4 text-base">Từ vựng</th>
                <th className="py-4">Phiên âm</th>
                <th className="py-4">Ý nghĩa dịch</th>
                <th className="py-4">Bài học liên kết</th>
                <th className="py-4">Khóa học liên kết</th>
                <th className="py-4 pr-6 text-right w-28">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredVocab.length > 0 ? (
                filteredVocab.map((vocab, idx) => (
                  <tr
                    key={vocab.id}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-850/10 transition-colors"
                  >
                    <td className="py-4.5 pl-6 font-bold text-slate-400 dark:text-slate-500">
                      {String(idx + 1).padStart(2, '0')}
                    </td>
                    <td className="py-4.5 font-black text-xl text-slate-950 dark:text-white pl-2">
                      {vocab.word}
                    </td>
                    <td className="py-4.5 font-mono italic text-slate-500 dark:text-slate-450">
                      {vocab.pronunciation}
                    </td>
                    <td className="py-4.5 font-bold text-slate-700 dark:text-slate-250 text-sm">
                      {vocab.meaning}
                    </td>
                    <td className="py-4.5 font-semibold text-slate-550 dark:text-slate-400">
                      {vocab.lessonTitle}
                    </td>
                    <td className="py-4.5 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">
                      {vocab.courseTitle}
                    </td>
                    <td className="py-4.5 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => toast.info(`Chỉnh sửa từ vựng: ${vocab.word}`)}
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          title="Sửa từ vựng"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteVocab(vocab.id)}
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-455 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                          title="Xóa từ vựng"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 text-center text-slate-400 dark:text-slate-550 font-bold"
                  >
                    Không tìm thấy từ vựng nào trong kho dữ liệu.
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
