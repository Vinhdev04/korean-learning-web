'use client';

import React from 'react';
import { Play, Layers, CheckSquare, BarChart2, PenTool, Award } from 'lucide-react';

interface MethodSectionProps {
  /** Locale hiện tại (vn hoặc en) */
  locale: string;
}

/**
 * Component hiển thị phương pháp học (Method Section) 6 card grid 3x2.
 */
export default function MethodSection({ locale }: MethodSectionProps) {
  const isEn = locale === 'en';

  return (
    <section id="methods" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto border-t border-stone-200/40 dark:border-stone-800/60 transition-colors duration-300">
      <div className="text-center mb-16">
        <span className="text-koreanRed dark:text-red-400 block font-bold text-xs uppercase tracking-widest mb-3 font-mono">
          {isEn ? 'LEARNING METHODOLOGY' : 'Phương pháp học'}
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-charcoal dark:text-stone-100 tracking-tight">
          {isEn ? 'Study Korean More Effectively' : 'Học Tiếng Hàn Hiệu Quả Hơn'}
        </h2>
        <p className="text-sm md:text-base text-charcoal-muted dark:text-stone-400 max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
          {isEn
            ? 'Combining theory, interactive practice, and smart review to achieve the best results.'
            : 'Kết hợp học lý thuyết, luyện tập tương tác và ôn tập thông minh để đạt kết quả tốt nhất.'}
        </p>
      </div>

        <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-150/40 dark:border-stone-800/80 shadow-soft hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
            <Layers size={22} />
          </div>
          <h3 className="text-lg font-bold text-charcoal dark:text-stone-100 mb-3">
            {isEn ? 'Smart Flashcards' : 'Flashcard Từ Vựng'}
          </h3>
          <p className="text-xs text-charcoal-muted dark:text-stone-400 leading-relaxed font-medium">
            {isEn
              ? 'Smart flashcard system with Spaced Repetition algorithm helping you remember vocabulary long-term.'
              : 'Hệ thống flashcard thông minh với thuật toán Spaced Repetition giúp ghi nhớ từ vựng lâu dài.'}
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-150/40 dark:border-stone-800/80 shadow-soft hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-6">
            <BarChart2 size={22} />
          </div>
          <h3 className="text-lg font-bold text-charcoal dark:text-stone-100 mb-3">
            {isEn ? 'Progress Tracking' : 'Theo Dõi Tiến Độ'}
          </h3>
          <p className="text-xs text-charcoal-muted dark:text-stone-400 leading-relaxed font-medium">
            {isEn
              ? 'Personal dashboard showing lessons completed, words learned, and your daily learning streak.'
              : 'Dashboard cá nhân hiển thị số bài đã học, từ vựng đã thuộc và streak học tập hàng ngày.'}
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-150/40 dark:border-stone-800/80 shadow-soft hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400 flex items-center justify-center mb-6">
            <Award size={22} />
          </div>
          <h3 className="text-lg font-bold text-charcoal dark:text-stone-100 mb-3">
            {isEn ? 'Achievement Badges' : 'Huy Hiệu Thành Tích'}
          </h3>
          <p className="text-xs text-charcoal-muted dark:text-stone-400 leading-relaxed font-medium">
            {isEn
              ? 'Gamification system to encourage study habits with fun achievements and badge collection.'
              : 'Hệ thống gamification khuyến khích duy trì thói quen học tập với huy hiệu và thành tích.'}
          </p>
        </div>

      </div>
    </section>
  );
}
