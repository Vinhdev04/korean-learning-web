'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, User } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  thumbnail: string;
  weeks: number;
  lessons: number;
  students: string;
}

interface FeaturedCoursesProps {
  /** Hàm dịch thuật */
  t: (key: string) => string;
  /** Locale hiện tại (vn hoặc en) */
  locale: string;
  /** Tab hiện tại (ALL, TOPIK1, TOPIK2) */
  activeTab: 'ALL' | 'TOPIK1' | 'TOPIK2';
  /** Hàm set active tab */
  setActiveTab: (tab: 'ALL' | 'TOPIK1' | 'TOPIK2') => void;
  /** Danh sách khóa học sau khi lọc */
  filteredCourses: Course[];
}

/**
 * Component hiển thị danh sách khóa học nổi bật (Featured Courses Section).
 * Được trang trí với các nhãn TOPIK pastel và các overlay mượt mà.
 */
export default function FeaturedCourses({
  t,
  locale,
  activeTab,
  setActiveTab,
  filteredCourses
}: FeaturedCoursesProps) {
  return (
    <section id="courses" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto transition-colors duration-300">
      <div className="text-center mb-16">
        <span className="text-koreanRed dark:text-red-400 block font-bold text-xs uppercase tracking-widest mb-3 font-mono">
          {t('courses.eyebrow')}
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-charcoal dark:text-stone-100 tracking-tight">
          {t('courses.title')}
        </h2>
        <p className="text-sm md:text-base text-charcoal-muted dark:text-stone-400 max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
          {t('courses.desc')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => {
          // Xác định màu nền pastel cho tag TOPIK dựa trên cấp độ
          const isTopik2 = course.level.includes('TOPIK II');
          const tagStyle = isTopik2
            ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400'
            : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400';
          
          // Lấy nhãn rút gọn (TOPIK I / TOPIK II)
          const cleanTag = course.level.split(' - ')[0];

          // Ánh xạ tên tiếng Hàn tương ứng của khóa học hiển thị nhỏ phía trên tiêu đề chính
          const subTitleKo = course.id === 'c1' 
            ? '한국어 초급 1' 
            : course.id === 'c2' 
              ? '한국어 초급 2' 
              : '한국어 중급 3';

          return (
            <div key={course.id} className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden shadow-soft border border-stone-150/40 dark:border-stone-800/80 group hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                <Image 
                  src={course.thumbnail} 
                  alt={course.title}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-8 z-10">
                  <span className="text-white text-[11px] font-bold">
                    {course.weeks} {t('courses.weeks')} · {course.lessons} {t('courses.lessons')}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                
                <div className="mt-auto pt-5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-charcoal-muted dark:text-stone-400 font-semibold">
                    <User size={14} className="text-stone-400" />
                    <span>{course.students} {locale === 'en' ? 'students' : 'học viên'}</span>
                  </div>
                  <Link 
                    href={`/${locale}/courses`}
                    className="px-4 py-2 bg-koreanRed-light hover:bg-koreanRed text-koreanRed hover:text-white dark:bg-koreanRed/15 dark:text-red-400 dark:hover:bg-koreanRed dark:hover:text-white rounded-xl text-xs font-bold transition-all"
                  >
                    {t('courses.details')}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-14">
        <Link 
          href={`/${locale}/courses`}
          className="inline-flex items-center gap-2 bg-koreanRed hover:bg-koreanRed-dark text-white text-sm font-extrabold py-3.5 px-8 rounded-xl transition-all active:scale-95 shadow-md shadow-koreanRed/15"
        >
          Xem tất cả khóa học
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
