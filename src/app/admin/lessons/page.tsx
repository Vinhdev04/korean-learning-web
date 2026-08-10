'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  PlayCircle,
  Edit3,
  Trash2,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

/**
 * Định nghĩa cấu trúc của một Bài học
 */
interface LessonItem {
  id: string;
  titleVi: string;
  titleKo: string;
  courseId: string;
  courseTitle: string;
  chapter: string;
  duration: number; // tính bằng phút
  isPreview: boolean; // có được xem thử không
  status: 'Đã xuất bản' | 'Bản nháp';
  updatedAt: string;
}

/**
 * Trang Quản lý Bài học của Admin CMS
 * Hỗ trợ bộ lọc phân cấp (Khóa học -> Chương), tìm kiếm và pop-up xác nhận xóa bài giảng.
 * @returns React Component
 */
export default function AdminLessonsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [chapterFilter, setChapterFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trạng thái của Confirm Modal Xóa bài học
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(null);

  // Mock dữ liệu danh sách bài học tiếng Hàn
  const [lessons, setLessons] = useState<LessonItem[]>([
    {
      id: 'LES-001',
      titleVi: 'Nguyên âm đơn & Phụ âm cơ bản',
      titleKo: '기본 모음 và 기본 자음',
      courseId: 'CRS-001',
      courseTitle: 'Tiếng Hàn Sơ Cấp 1',
      chapter: 'Chương 1: Bảng chữ Hangeul',
      duration: 25,
      isPreview: true,
      status: 'Đã xuất bản',
      updatedAt: '12/07/2026',
    },
    {
      id: 'LES-002',
      titleVi: 'Nguyên âm ghép & Phụ âm cuối (Patchim)',
      titleKo: '이중 모음 và 받침',
      courseId: 'CRS-001',
      courseTitle: 'Tiếng Hàn Sơ Cấp 1',
      chapter: 'Chương 1: Bảng chữ Hangeul',
      duration: 30,
      isPreview: true,
      status: 'Đã xuất bản',
      updatedAt: '13/07/2026',
    },
    {
      id: 'LES-003',
      titleVi: 'Chào hỏi & Giới thiệu bản thân',
      titleKo: '인사말 và 자기소개',
      courseId: 'CRS-001',
      courseTitle: 'Tiếng Hàn Sơ Cấp 1',
      chapter: 'Chương 2: Chào hỏi & Làm quen',
      duration: 20,
      isPreview: false,
      status: 'Đã xuất bản',
      updatedAt: '15/07/2026',
    },
    {
      id: 'LES-004',
      titleVi: 'Trường học và Nghề nghiệp',
      titleKo: '학교 và 직업',
      courseId: 'CRS-001',
      courseTitle: 'Tiếng Hàn Sơ Cấp 1',
      chapter: 'Chương 2: Chào hỏi & Làm quen',
      duration: 22,
      isPreview: false,
      status: 'Bản nháp',
      updatedAt: '18/07/2026',
    },
    {
      id: 'LES-005',
      titleVi: 'Mua sắm và Hỏi giá tiền',
      titleKo: '물건 사기 và 가격 묻기',
      courseId: 'CRS-002',
      courseTitle: 'Tiếng Hàn Sơ Cấp 2',
      chapter: 'Chương 1: Đời sống sinh hoạt',
      duration: 25,
      isPreview: true,
      status: 'Đã xuất bản',
      updatedAt: '20/07/2026',
    },
    {
      id: 'LES-006',
      titleVi: 'Đặt món tại nhà hàng',
      titleKo: '식당에서 주문하기',
      courseId: 'CRS-002',
      courseTitle: 'Tiếng Hàn Sơ Cấp 2',
      chapter: 'Chương 1: Đời sống sinh hoạt',
      duration: 28,
      isPreview: false,
      status: 'Đã xuất bản',
      updatedAt: '22/07/2026',
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
   * Bật modal xác nhận trước khi xóa bài học
   * @param lesson Bài học được chọn để xóa
   */
  const openDeleteConfirm = (lesson: LessonItem) => {
    setSelectedLesson(lesson);
    setDeleteModalOpen(true);
  };

  /**
   * Thực thi hành động xóa bài học sau khi được xác nhận từ modal
   */
  const executeDelete = () => {
    if (selectedLesson) {
      setLessons(prev => prev.filter(l => l.id !== selectedLesson.id));
      showToast(`Đã xóa bài học "${selectedLesson.titleVi}" thành công!`);
      setDeleteModalOpen(false);
      setSelectedLesson(null);
    }
  };

  // Lọc danh sách bài học dựa trên search, course dropdown và chapter dropdown
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch =
      lesson.titleVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.titleKo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCourse = courseFilter === 'All' || lesson.courseId === courseFilter;
    const matchesChapter = chapterFilter === 'All' || lesson.chapter.includes(chapterFilter);
    const matchesStatus = statusFilter === 'All' || lesson.status === statusFilter;

    return matchesSearch && matchesCourse && matchesChapter && matchesStatus;
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
      {deleteModalOpen && selectedLesson && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800/80 p-6 animate-in zoom-in-95 duration-200">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  Xác nhận xóa bài giảng?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Bạn có chắc chắn muốn xóa bài học{' '}
                  <span className="text-rose-600 font-extrabold">
                    &quot;{selectedLesson.titleVi}&quot;
                  </span>
                  ? Thao tác này sẽ xóa vĩnh viễn dữ liệu và không thể hoàn tác.
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
                Xóa bài học
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/courses"
            className="h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 flex items-center justify-center transition-colors"
            title="Quay lại danh sách khóa học"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Quản lý bài học
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Phân phối chi tiết danh sách bài giảng video lý thuyết theo chương học.
            </p>
          </div>
        </div>
        <button
          onClick={() => showToast('Tính năng Thêm bài học mới sẽ được tích hợp ở Sprint sau!')}
          className="rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-5 py-3 text-sm font-bold shadow-md shadow-orange-500/25 active:scale-95 transition-all self-start sm:self-auto"
        >
          + Thêm bài học mới
        </button>
      </div>

      {/* Hộp Công Cụ Tìm Kiếm & Bộ Lọc Phân Cấp */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Ô Tìm Kiếm */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm bài học theo tên (Việt/Hàn) hoặc mã bài giảng..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-550 transition-colors"
            />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-4">
            {/* Lọc Khóa Học */}
            <div className="relative min-w-[160px] flex-1 sm:flex-none">
              <select
                value={courseFilter}
                onChange={e => {
                  setCourseFilter(e.target.value);
                  setChapterFilter('All');
                }}
                className="w-full pl-4 pr-10 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl text-sm focus:outline-none focus:border-orange-500 dark:text-white appearance-none cursor-pointer font-semibold text-slate-655"
              >
                <option value="All">Tất cả khóa học</option>
                <option value="CRS-001">Tiếng Hàn Sơ Cấp 1</option>
                <option value="CRS-002">Tiếng Hàn Sơ Cấp 2</option>
              </select>
              <Filter className="absolute right-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Lọc Chương học */}
            <div className="relative min-w-[160px] flex-1 sm:flex-none">
              <select
                value={chapterFilter}
                onChange={e => setChapterFilter(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl text-sm focus:outline-none focus:border-orange-500 dark:text-white appearance-none cursor-pointer font-semibold text-slate-655"
              >
                <option value="All">Tất cả chương</option>
                {courseFilter === 'CRS-001' && (
                  <>
                    <option value="Chương 1">Chương 1: Bảng chữ Hangeul</option>
                    <option value="Chương 2">Chương 2: Chào hỏi & Làm quen</option>
                  </>
                )}
                {courseFilter === 'CRS-002' && (
                  <>
                    <option value="Chương 1">Chương 1: Đời sống sinh hoạt</option>
                  </>
                )}
              </select>
              <Filter className="absolute right-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Lọc Trạng Thái */}
            <div className="relative min-w-[150px] flex-1 sm:flex-none">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl text-sm focus:outline-none focus:border-orange-500 dark:text-white appearance-none cursor-pointer font-semibold text-slate-655"
              >
                <option value="All">Tất cả trạng thái</option>
                <option value="Đã xuất bản">Đã xuất bản</option>
                <option value="Bản nháp">Bản nháp</option>
              </select>
              <Filter className="absolute right-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Bảng Danh Sách Bài Học Responsive */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-[11px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                <th className="py-4 pl-6 w-16">STT</th>
                <th className="py-4">Tên bài học (Việt / Hàn)</th>
                <th className="py-4">Khóa học liên kết</th>
                <th className="py-4">Chương học</th>
                <th className="py-4 text-center">Thời lượng</th>
                <th className="py-4">Trạng thái</th>
                <th className="py-4">Cập nhật</th>
                <th className="py-4 pr-6 text-right w-36">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredLessons.length > 0 ? (
                filteredLessons.map((lesson, idx) => (
                  <tr
                    key={lesson.id}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-850/10 transition-colors"
                  >
                    <td className="py-4 pl-6 font-bold text-slate-400 dark:text-slate-500">
                      {String(idx + 1).padStart(2, '0')}
                    </td>
                    <td className="py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 dark:text-white text-sm leading-tight">
                            {lesson.titleVi}
                          </span>
                          {lesson.isPreview && (
                            <span className="text-[8px] font-extrabold uppercase px-1.5 py-0.5 bg-teal-500 text-white rounded">
                              Xem thử
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 block tracking-wide italic">
                          {lesson.titleKo}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 font-bold text-slate-700 dark:text-slate-350">
                      {lesson.courseTitle}
                    </td>
                    <td className="py-4 font-semibold text-slate-500 dark:text-slate-400">
                      {lesson.chapter}
                    </td>
                    <td className="py-4 text-center font-extrabold text-slate-800 dark:text-slate-200">
                      {lesson.duration} phút
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          lesson.status === 'Đã xuất bản'
                            ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400'
                            : 'bg-slate-100 text-slate-650 dark:bg-slate-800 dark:text-slate-350'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${lesson.status === 'Đã xuất bản' ? 'bg-teal-500' : 'bg-slate-400'}`}
                        />
                        {lesson.status}
                      </span>
                    </td>
                    <td className="py-4 font-bold text-slate-450 dark:text-slate-550">
                      {lesson.updatedAt}
                    </td>
                    <td className="py-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => showToast(`Xem thử video của bài: ${lesson.titleVi}`)}
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-orange-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          title="Xem thử video"
                        >
                          <PlayCircle size={15} />
                        </button>
                        <button
                          onClick={() => showToast(`Chỉnh sửa bài học: ${lesson.titleVi}`)}
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          title="Sửa bài giảng"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => openDeleteConfirm(lesson)}
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-450 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                          title="Xóa bài giảng"
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
                    colSpan={8}
                    className="py-10 text-center text-slate-400 dark:text-slate-500 font-bold"
                  >
                    Không tìm thấy bài giảng nào phù hợp.
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
