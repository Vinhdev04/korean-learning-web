'use client';

import React from 'react';

/**
 * CMS Quản lý Khóa học, Chương học, Bài học và Video
 * @returns React Component cho trang quản lý khóa học của admin
 */
// OLD:
// export default function AdminCoursesPage() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CMS Quản lý Khóa học</h1>
//         <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
//           + Thêm khóa học
//         </button>
//       </div>
//       ...
//     </div>
//   );
// }

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  BookOpen,
  Users,
  Clock,
  Edit3,
  ArrowRight,
  AlertCircle,
  FileText,
} from 'lucide-react';

/**
 * Interface đại diện cho thông tin một Khóa học trong hệ thống
 */
interface CourseItem {
  id: string;
  title: string;
  level: 'TOPIK I' | 'TOPIK II';
  lessonsCount: number;
  studentsCount: number;
  weeksCount: number;
  status: 'Đã xuất bản' | 'Bản nháp';
  description: string;
  gradient: string;
}

/**
 * Trang Quản lý Khóa học của Admin (Course Management CMS)
 * Hiển thị danh sách khóa học dạng Lưới (Grid) bo góc, hỗ trợ tìm kiếm, lọc trình độ và quản lý chương bài học.
 * @returns React Component
 */
export default function AdminCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mock dữ liệu danh sách khóa học tiếng Hàn
  const courses: CourseItem[] = [
    {
      id: 'CRS-001',
      title: 'Tiếng Hàn Sơ Cấp 1',
      level: 'TOPIK I',
      lessonsCount: 12,
      studentsCount: 450,
      weeksCount: 8,
      status: 'Đã xuất bản',
      description:
        'Làm quen với bảng chữ cái Hangeul, các cấu trúc câu giao tiếp cơ bản nhất cho người mới bắt đầu.',
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      id: 'CRS-002',
      title: 'Tiếng Hàn Sơ Cấp 2',
      level: 'TOPIK I',
      lessonsCount: 15,
      studentsCount: 380,
      weeksCount: 10,
      status: 'Đã xuất bản',
      description:
        'Mở rộng vốn từ vựng sinh hoạt hàng ngày, học các thì thời cơ bản và hội thoại thông dụng.',
      gradient: 'from-rose-500 to-orange-500',
    },
    {
      id: 'CRS-003',
      title: 'Luyện Thi TOPIK I Sơ Cấp',
      level: 'TOPIK I',
      lessonsCount: 20,
      studentsCount: 290,
      weeksCount: 6,
      status: 'Đã xuất bản',
      description:
        'Hệ thống hóa ngữ pháp sơ cấp và giải các bộ đề thi TOPIK I thực tế từ các năm trước.',
      gradient: 'from-amber-500 to-yellow-500',
    },
    {
      id: 'CRS-004',
      title: 'Tiếng Hàn Trung Cấp 1',
      level: 'TOPIK II',
      lessonsCount: 18,
      studentsCount: 210,
      weeksCount: 12,
      status: 'Đã xuất bản',
      description:
        'Tiếp cận các chủ đề trừu tượng, cách diễn đạt phức tạp và viết văn biểu cảm cơ bản.',
      gradient: 'from-rose-600 to-pink-500',
    },
    {
      id: 'CRS-005',
      title: 'Tiếng Hàn Trung Cấp 2',
      level: 'TOPIK II',
      lessonsCount: 18,
      studentsCount: 150,
      weeksCount: 12,
      status: 'Bản nháp',
      description:
        'Hoàn thiện ngữ pháp trung cấp, luyện đọc báo chí và xem tin tức truyền hình Hàn Quốc.',
      gradient: 'from-purple-650 to-rose-500',
    },
    {
      id: 'CRS-006',
      title: 'Luyện Thi TOPIK II Đọc & Nghe',
      level: 'TOPIK II',
      lessonsCount: 24,
      studentsCount: 180,
      weeksCount: 8,
      status: 'Đã xuất bản',
      description:
        'Chiến thuật làm bài nghe hiểu và đọc hiểu TOPIK II đạt điểm cao từ cấp 3 đến cấp 6.',
      gradient: 'from-orange-600 to-pink-600',
    },
  ];

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

  // Lọc danh sách khóa học dựa trên search và level dropdown
  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = levelFilter === 'All' || course.level === levelFilter;

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-8 font-outfit text-slate-800 dark:text-slate-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white px-5 py-3.5 shadow-2xl border border-slate-700/50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <AlertCircle size={16} className="text-orange-500" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Tiêu đề & Thêm mới */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Quản lý khóa học
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Xây dựng nội dung chương trình học, bài giảng video lý thuyết và theo dõi số lượng học
            viên.
          </p>
        </div>
        <button
          onClick={() => showToast('Tính năng Thêm khóa học mới sẽ được tích hợp ở Sprint sau!')}
          className="rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-5 py-3 text-sm font-bold shadow-md shadow-orange-500/25 active:scale-95 transition-all self-start sm:self-auto"
        >
          + Thêm khóa học
        </button>
      </div>

      {/* Thanh Tìm Kiếm & Dropdown Lọc */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Tìm Kiếm */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học theo tên hoặc mã khóa học..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-550 transition-colors"
            />
          </div>

          {/* Lọc Trình độ */}
          <div className="relative min-w-[180px]">
            <select
              value={levelFilter}
              onChange={e => setLevelFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl text-sm focus:outline-none focus:border-orange-500 dark:text-white appearance-none cursor-pointer font-semibold text-slate-655"
            >
              <option value="All">Tất cả trình độ</option>
              <option value="TOPIK I">Trình độ TOPIK I</option>
              <option value="TOPIK II">Trình độ TOPIK II</option>
            </select>
            <Filter className="absolute right-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Lưới Khóa Học (Course Grid) - Bo góc rounded-2xl, shadow mịn, hover zoom nhẹ */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div
              key={course.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-orange-500/25 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Thumbnail Mock bằng Gradient */}
              <div
                className={`h-36 w-full bg-gradient-to-tr ${course.gradient} p-4 flex flex-col justify-between relative overflow-hidden`}
              >
                {/* Vết sáng phản chiếu */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px] pointer-events-none" />
                <div className="flex justify-between items-start z-10">
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 bg-black/35 text-white backdrop-blur-md rounded-md tracking-wider border border-white/10">
                    {course.id}
                  </span>
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md ${
                      course.status === 'Đã xuất bản'
                        ? 'bg-teal-500 text-white'
                        : 'bg-slate-600 text-slate-100'
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
                <div className="z-10">
                  <span className="text-[10px] font-extrabold bg-white/20 text-white backdrop-blur-md px-2 py-1 rounded-md tracking-wide">
                    {course.level}
                  </span>
                </div>
              </div>

              {/* Chi tiết nội dung khóa học */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors text-base leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-slate-450 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Các chỉ số thống kê */}
                <div className="grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-4 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 justify-center py-1 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
                    <BookOpen size={12} className="text-orange-500" />
                    <span>{course.lessonsCount} bài</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-center py-1 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
                    <Users size={12} className="text-rose-500" />
                    <span>{course.studentsCount} học viên</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-center py-1 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
                    <Clock size={12} className="text-amber-500" />
                    <span>{course.weeksCount} tuần</span>
                  </div>
                </div>

                {/* Nút thao tác chân Card */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => showToast(`Chỉnh sửa cấu hình chung khóa học: ${course.title}`)}
                    className="flex-1 py-2 rounded-xl text-slate-600 dark:text-slate-350 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200/50 dark:border-slate-800 flex items-center justify-center gap-1.5 text-xs font-bold transition-all active:scale-95"
                  >
                    <Edit3 size={13} />
                    <span>Chỉnh sửa</span>
                  </button>
                  <Link
                    href={`/admin/lessons?courseId=${course.id}`}
                    className="flex-1 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-450 border border-orange-200/20 flex items-center justify-center gap-1.5 text-xs font-bold transition-all active:scale-95"
                  >
                    <span>Bài học</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-400 dark:text-slate-500 font-bold bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 transition-colors">
            Không tìm thấy khóa học nào phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}
