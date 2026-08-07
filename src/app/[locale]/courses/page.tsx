'use client';

// OLD:
/*
export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
...
*/

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Layers, Filter, CheckCircle2 } from 'lucide-react';
import Skeleton from '@/components/common/Skeleton';

// Dữ liệu giả lập các khóa học tiếng Hàn theo chuẩn TOPIK của BA
const COURSES_DATA = [
  {
    id: 'so-cap-1',
    title: 'Tiếng Hàn Sơ cấp 1',
    level: 'TOPIK I • Cấp 1',
    levelKey: 'so-cap',
    lessons: 12,
    duration: 180,
    desc: 'Học bảng chữ cái Hangeul, nguyên âm, phụ âm, cách ghép chữ và hội thoại cơ bản như giới thiệu bản thân, chào hỏi.',
    tagColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  },
  {
    id: 'so-cap-2',
    title: 'Tiếng Hàn Sơ cấp 2',
    level: 'TOPIK I • Cấp 2',
    levelKey: 'so-cap',
    lessons: 15,
    duration: 240,
    desc: 'Mở rộng từ vựng về đời sống hàng ngày: đi mua sắm, gọi món, thời tiết, giao tiếp cơ bản tại ngân hàng, bưu điện.',
    tagColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  },
  {
    id: 'trung-cap-1',
    title: 'Tiếng Hàn Trung cấp 1',
    level: 'TOPIK II • Cấp 3',
    levelKey: 'trung-cap',
    lessons: 18,
    duration: 320,
    desc: 'Sử dụng các cấu trúc ngữ pháp liên kết phức tạp. Học cách diễn đạt cảm xúc, thảo luận các chủ đề xã hội thông thường.',
    tagColor: 'bg-teal-50 text-teal-700 border border-teal-200',
  },
  {
    id: 'trung-cap-2',
    title: 'Tiếng Hàn Trung cấp 2',
    level: 'TOPIK II • Cấp 4',
    levelKey: 'trung-cap',
    lessons: 20,
    duration: 360,
    desc: 'Luyện kỹ năng viết luận (câu 51-54 TOPIK II). Đọc hiểu báo chí, phóng sự ngắn và giao tiếp lưu loát trong công việc.',
    tagColor: 'bg-teal-50 text-teal-700 border border-teal-200',
  },
  {
    id: 'cao-cap',
    title: 'Tiếng Hàn Cao cấp chuyên sâu',
    level: 'TOPIK II • Cấp 5 & 6',
    levelKey: 'cao-cap',
    lessons: 24,
    duration: 480,
    desc: 'Nghiên cứu các bài đọc học thuật, chính trị, kinh tế. Luyện giải đề thi TOPIK II đạt điểm tối đa nghe và đọc hiểu.',
    tagColor: 'bg-slate-900 text-slate-100 border border-slate-700',
  },
];

export default function CoursesPage() {
  const [filter, setFilter] = useState<'all' | 'so-cap' | 'trung-cap' | 'cao-cap'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Giả lập hiệu ứng loading Skeleton khi người dùng chuyển đổi bộ lọc cấp độ hoặc load trang lần đầu
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 500ms delay để tạo cảm giác shimmer mượt mà
    return () => clearTimeout(timer);
  }, [filter]);

  // Lọc khóa học theo tab đang chọn
  const filteredCourses =
    filter === 'all' ? COURSES_DATA : COURSES_DATA.filter(course => course.levelKey === filter);

  // Component render placeholder Skeleton cho card khóa học tiếng Hàn
  const CourseCardSkeleton = () => (
    <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 shadow-sm">
      <div>
        {/* Cấp độ Badge Skeleton */}
        <Skeleton variant="text" className="w-24 h-6 rounded-xl" />

        {/* Title Skeleton */}
        <Skeleton variant="text" className="w-3/4 h-7 mt-5 rounded-md" />

        {/* Description Skeleton */}
        <div className="space-y-2.5 mt-4">
          <Skeleton variant="text" className="w-full h-4 rounded-md" />
          <Skeleton variant="text" className="w-5/6 h-4 rounded-md" />
        </div>

        {/* Meta information Skeleton */}
        <div className="mt-8 flex items-center gap-6 border-t border-slate-100 dark:border-stone-850 pt-4">
          <Skeleton variant="text" className="w-20 h-4 rounded-md" />
          <Skeleton variant="text" className="w-24 h-4 rounded-md" />
        </div>
      </div>

      {/* Action CTA Button Skeleton */}
      <div className="mt-8">
        <Skeleton variant="rect" className="w-full h-11 rounded-xl" />
      </div>
    </div>
  );

  // OLD: return ( ... )
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 font-sans min-h-screen text-charcoal dark:text-stone-150 transition-colors duration-300">
      {/* Page Header */}
      <div className="text-center md:text-left md:flex md:items-end md:justify-between border-b border-slate-200 dark:border-stone-850 pb-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-stone-100 sm:text-4xl">
            Danh sách khóa học tiếng Hàn
          </h1>
          <p className="mt-3 text-slate-600 dark:text-stone-400">
            Lộ trình đào tạo chuẩn hóa quốc tế giúp bạn chinh phục các cấp độ TOPIK I và TOPIK II
            một cách bài bản nhất.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-slate-100 dark:border-stone-850/60 pb-4">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-stone-400 text-sm font-semibold mr-4">
          <Filter size={16} />
          Bộ lọc cấp độ:
        </div>
        {[
          { key: 'all', label: 'Tất cả' },
          { key: 'so-cap', label: 'Sơ cấp (Cấp 1 & 2)' },
          { key: 'trung-cap', label: 'Trung cấp (Cấp 3 & 4)' },
          { key: 'cao-cap', label: 'Cao cấp (Cấp 5 & 6)' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition-all duration-300 active:scale-98 ${
              filter === tab.key
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/10'
                : 'bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 text-slate-600 dark:text-stone-350 hover:bg-slate-50 dark:hover:bg-stone-850'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid Danh sách khóa học */}
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? // Hiển thị 6 card Skeleton lấp lánh khi đang trong trạng thái loading
            Array.from({ length: 6 }).map((_, index) => <CourseCardSkeleton key={index} />)
          : filteredCourses.map(course => (
              <div
                key={course.id}
                className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 shadow-sm hover:shadow-md hover:border-teal-500/20 dark:hover:border-teal-500/30 transition-all duration-300 group"
              >
                <div>
                  {/* Cấp độ Badge */}
                  <div className="flex justify-between items-center">
                    <span
                      className={`inline-flex items-center rounded-xl px-3 py-1 text-xs font-bold ${course.tagColor}`}
                    >
                      {course.level}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-4 text-xl font-bold text-slate-950 dark:text-stone-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-stone-400 leading-relaxed min-h-[72px]">
                    {course.desc}
                  </p>

                  {/* Meta information */}
                  <div className="mt-6 flex items-center gap-6 border-t border-slate-100 dark:border-stone-850 pt-4 text-xs text-slate-500 dark:text-stone-400 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Layers size={14} className="text-teal-500" />
                      <span>{course.lessons} bài học</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-teal-500" />
                      <span>{course.duration} phút video</span>
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="mt-8">
                  <Link
                    href={`/vn/courses/${course.id}`}
                    className="block w-full text-center rounded-xl bg-slate-950 dark:bg-stone-800 hover:bg-teal-600 dark:hover:bg-teal-600 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 active:scale-98"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
