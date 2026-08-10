'use client';

import React from 'react';

/**
 * CMS Quản lý Ngân hàng Câu hỏi
 * @returns React Component cho trang quản lý câu hỏi của admin
 */

import { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit3,
  Trash2,
  CheckCircle,
  AlertTriangle,
  FileSpreadsheet,
} from 'lucide-react';

/**
 * Interface đại diện cho một bộ câu hỏi kiểm tra/luyện tập
 */
interface QuestionSet {
  id: string;
  title: string;
  courseTitle: string;
  lessonTitle: string;
  type: 'Từ vựng' | 'Ngữ pháp' | 'Luyện nghe' | 'Luyện đọc';
  totalQuestions: number;
  duration: number; // phút
  passRate: number; // % điểm đỗ tối thiểu
}

/**
 * Trang quản lý Ngân hàng Câu hỏi của Admin CMS
 * Quản lý danh sách các đề ôn tập/bài tập, hiển thị tỉ lệ điểm đạt trực quan và lọc theo kỹ năng.
 * @returns React Component
 */
export default function AdminQuestionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trạng thái Confirm Modal Xóa bộ câu hỏi
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSet, setSelectedSet] = useState<QuestionSet | null>(null);

  // Mock dữ liệu các bộ câu hỏi ôn tập
  const [questionSets, setQuestionSets] = useState<QuestionSet[]>([
    {
      id: 'QST-001',
      title: 'Đề kiểm tra từ vựng Sơ cấp 1 - Bài 1',
      courseTitle: 'Tiếng Hàn Sơ Cấp 1',
      lessonTitle: 'Bài 1: Nguyên âm & Phụ âm',
      type: 'Từ vựng',
      totalQuestions: 10,
      duration: 15,
      passRate: 80,
    },
    {
      id: 'QST-002',
      title: 'Bài tập Ngữ pháp cấu trình Sơ cấp 1 - Bài 2',
      courseTitle: 'Tiếng Hàn Sơ Cấp 1',
      lessonTitle: 'Bài 2: Chào hỏi & Làm quen',
      type: 'Ngữ pháp',
      totalQuestions: 15,
      duration: 20,
      passRate: 70,
    },
    {
      id: 'QST-003',
      title: 'Luyện nghe phản xạ sơ cấp cơ bản',
      courseTitle: 'Tiếng Hàn Sơ Cấp 1',
      lessonTitle: 'Bài 1: Nguyên âm & Phụ âm',
      type: 'Luyện nghe',
      totalQuestions: 10,
      duration: 15,
      passRate: 50,
    },
    {
      id: 'QST-004',
      title: 'Bài thi thử đọc hiểu TOPIK I',
      courseTitle: 'Tiếng Hàn Sơ Cấp 2',
      lessonTitle: 'Bài 3: Đời sống sinh hoạt',
      type: 'Luyện đọc',
      totalQuestions: 30,
      duration: 40,
      passRate: 85,
    },
    {
      id: 'QST-005',
      title: 'Đề ôn tập Ngữ pháp TOPIK I Tổng Hợp',
      courseTitle: 'Tiếng Hàn Sơ Cấp 2',
      lessonTitle: 'Bài 4: Mua sắm hàng ngày',
      type: 'Ngữ pháp',
      totalQuestions: 20,
      duration: 25,
      passRate: 60,
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

  /**
   * Mở modal xác nhận trước khi thực hiện xóa bộ câu hỏi
   * @param set Bộ câu hỏi cần xóa
   */
  const openDeleteConfirm = (set: QuestionSet) => {
    setSelectedSet(set);
    setDeleteModalOpen(true);
  };

  /**
   * Thực hiện xóa bộ câu hỏi khỏi danh sách
   */
  const executeDelete = () => {
    if (selectedSet) {
      setQuestionSets(prev => prev.filter(q => q.id !== selectedSet.id));
      showToast(`Đã xóa bộ câu hỏi "${selectedSet.title}" thành công!`);
      setDeleteModalOpen(false);
      setSelectedSet(null);
    }
  };

  // Lọc dữ liệu dựa theo ô tìm kiếm và các dropdowns
  const filteredSets = questionSets.filter(set => {
    const matchesSearch =
      set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      set.lessonTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      set.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'All' || set.type === typeFilter;
    const matchesCourse = courseFilter === 'All' || set.courseTitle === courseFilter;

    return matchesSearch && matchesType && matchesCourse;
  });

  return (
    <div className="space-y-8 font-outfit text-slate-800 dark:text-slate-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white px-5 py-3.5 shadow-2xl border border-slate-700/50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <CheckCircle size={16} className="text-orange-500" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {deleteModalOpen && selectedSet && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800/80 p-6 animate-in zoom-in-95 duration-200">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  Xác nhận xóa bộ câu hỏi?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Bạn có chắc muốn xóa{' '}
                  <span className="text-rose-600 font-extrabold">
                    &quot;{selectedSet.title}&quot;
                  </span>
                  ? Toàn bộ các câu hỏi trắc nghiệm thuộc bộ này sẽ bị xóa khỏi hệ thống.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-850">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-350 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={executeDelete}
                className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 text-xs font-bold shadow-md shadow-rose-600/10 transition-colors"
              >
                Xóa bộ đề
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Ngân hàng câu hỏi
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Quản lý ngân hàng đề trắc nghiệm, bài tập tự luyện và thiết lập mức điểm đỗ của học
            viên.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => showToast('Đang mở chức năng nhập Excel...')}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-855 bg-slate-55 dark:bg-slate-955 px-5 py-3 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-900 active:scale-95 transition-all text-slate-700 dark:text-slate-300"
          >
            <FileSpreadsheet size={16} className="text-emerald-600" />
            <span>Nhập Excel</span>
          </button>
          <button
            onClick={() =>
              showToast('Tính năng Thêm bộ câu hỏi mới sẽ được tích hợp ở Sprint sau!')
            }
            className="rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-5 py-3 text-sm font-bold shadow-md shadow-orange-500/25 active:scale-95 transition-all"
          >
            + Thêm bộ đề mới
          </button>
        </div>
      </div>

      {/* Thanh Tìm Kiếm & Bộ Lọc Kỹ Năng */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Ô Tìm Kiếm */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bộ câu hỏi theo tên, bài học liên kết..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-550 transition-colors"
            />
          </div>

          {/* Lọc Khóa Học */}
          <div className="relative min-w-[160px]">
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

          {/* Lọc Loại Câu Hỏi */}
          <div className="relative min-w-[160px]">
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl text-sm focus:outline-none focus:border-orange-500 dark:text-white appearance-none cursor-pointer font-semibold text-slate-655"
            >
              <option value="All">Tất cả kỹ năng</option>
              <option value="Từ vựng">Từ vựng</option>
              <option value="Ngữ pháp">Ngữ pháp</option>
              <option value="Luyện nghe">Luyện nghe</option>
              <option value="Luyện đọc">Luyện đọc</option>
            </select>
            <Filter className="absolute right-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bảng Bộ Câu Hỏi Gọn Gàng - Đạt chuẩn visual density & alignment */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-[11px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                <th className="py-4 pl-6 w-16">STT</th>
                <th className="py-4">Bộ câu hỏi ôn tập</th>
                <th className="py-4">Bài học liên kết</th>
                <th className="py-4">Khóa học</th>
                <th className="py-4">Kỹ năng</th>
                <th className="py-4 text-center">Số câu</th>
                <th className="py-4 text-center">Thời gian</th>
                <th className="py-4 text-center">Chuẩn đạt (Pass rate)</th>
                <th className="py-4 pr-6 text-right w-36">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredSets.length > 0 ? (
                filteredSets.map((set, idx) => {
                  // Quyết định màu sắc tiến trình của Pass rate (DoD: trực quan)
                  const passRateColor =
                    set.passRate >= 80
                      ? 'bg-teal-50 text-teal-750 dark:bg-teal-950/20 dark:text-teal-400 border-teal-200/40'
                      : set.passRate >= 60
                        ? 'bg-orange-50 text-orange-700 dark:bg-orange-950/20 dark:text-orange-400 border-orange-200/40'
                        : 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-455 border-rose-200/40';

                  return (
                    <tr
                      key={set.id}
                      className="hover:bg-slate-50/30 dark:hover:bg-slate-850/10 transition-colors"
                    >
                      <td className="py-4 pl-6 font-bold text-slate-450 dark:text-slate-500">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="py-4">
                        <div className="font-extrabold text-slate-900 dark:text-white text-sm leading-tight">
                          {set.title}
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 mt-1 block">
                          {set.id}
                        </span>
                      </td>
                      <td className="py-4 font-semibold text-slate-600 dark:text-slate-400">
                        {set.lessonTitle}
                      </td>
                      <td className="py-4 font-bold text-slate-700 dark:text-slate-350">
                        {set.courseTitle}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[10px] font-bold ${
                            set.type === 'Từ vựng'
                              ? 'bg-orange-100 text-orange-655 dark:bg-orange-950/30 dark:text-orange-400'
                              : set.type === 'Ngữ pháp'
                                ? 'bg-purple-105 text-purple-650 dark:bg-purple-950/30 dark:text-purple-400'
                                : set.type === 'Luyện nghe'
                                  ? 'bg-blue-100 text-blue-650 dark:bg-blue-950/30 dark:text-blue-400'
                                  : 'bg-teal-100 text-teal-650 dark:bg-teal-950/30 dark:text-teal-400'
                          }`}
                        >
                          {set.type}
                        </span>
                      </td>
                      <td className="py-4 text-center font-bold text-slate-800 dark:text-slate-200">
                        {set.totalQuestions} câu
                      </td>
                      <td className="py-4 text-center font-semibold text-slate-500 dark:text-slate-455">
                        {set.duration} phút
                      </td>
                      <td className="py-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center rounded-xl px-3 py-1 text-xs font-black border ${passRateColor}`}
                        >
                          {set.passRate}%
                        </span>
                      </td>
                      <td className="py-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => showToast(`Xem danh sách câu hỏi của bộ: ${set.title}`)}
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-orange-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            title="Xem chi tiết"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => showToast(`Chỉnh sửa cấu hình bộ đề: ${set.title}`)}
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            title="Sửa câu hỏi"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => openDeleteConfirm(set)}
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-455 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                            title="Xóa bộ đề"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="py-10 text-center text-slate-400 dark:text-slate-550 font-bold"
                  >
                    Không tìm thấy bộ câu hỏi ôn tập nào phù hợp.
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
