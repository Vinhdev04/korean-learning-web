'use client';

import React from 'react';
import CountUpNumber from '@/components/common/CountUpNumber';

interface StatsSectionProps {
  /** Hàm dịch thuật */
  t: (key: string) => string;
}

/**
 * Component hiển thị các chỉ số thống kê (Stats Section) trên trang chủ.
 */
export default function StatsSection({ t }: StatsSectionProps) {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-warmCream dark:bg-stone-950 transition-colors duration-300 relative z-10">
      <div className="max-w-[1440px] mx-auto bg-white dark:bg-stone-900 rounded-3xl border border-stone-150/40 dark:border-stone-800/80 shadow-soft p-10 md:p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center">
          
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-extrabold text-koreanRed dark:text-red-400 tracking-tight">
              <CountUpNumber value={8900} suffix="+" />
            </div>
            <div className="text-xs md:text-sm text-charcoal-muted dark:text-stone-400 font-bold uppercase tracking-wider">
              {t('stats.students')}
            </div>
          </div>

          <div className="space-y-2 border-l border-stone-100 dark:border-stone-800/80">
            <div className="text-4xl md:text-5xl font-extrabold text-koreanRed dark:text-red-400 tracking-tight">
              <CountUpNumber value={250} suffix="+" />
            </div>
            <div className="text-xs md:text-sm text-charcoal-muted dark:text-stone-400 font-bold uppercase tracking-wider">
              {t('stats.videos')}
            </div>
          </div>

          <div className="space-y-2 border-l border-stone-100 dark:border-stone-800/80">
            <div className="text-4xl md:text-5xl font-extrabold text-koreanRed dark:text-red-400 tracking-tight">
              <CountUpNumber value={12000} suffix="+" />
            </div>
            <div className="text-xs md:text-sm text-charcoal-muted dark:text-stone-400 font-bold uppercase tracking-wider">
              {t('stats.flashcards')}
            </div>
          </div>

          <div className="space-y-2 border-l border-stone-100 dark:border-stone-800/80">
            <div className="text-4xl md:text-5xl font-extrabold text-koreanRed dark:text-red-400 tracking-tight">
              <CountUpNumber value={95} suffix="%" />
            </div>
            <div className="text-xs md:text-sm text-charcoal-muted dark:text-stone-400 font-bold uppercase tracking-wider">
              {t('stats.satisfaction')}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
