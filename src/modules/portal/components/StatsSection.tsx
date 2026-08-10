'use client';

import React from 'react';
import CountUpNumber from '@/components/common/CountUpNumber';
import { motion } from 'framer-motion';

interface StatsSectionProps {
  /** Hàm dịch thuật */
  t: (key: string) => string;
}

// OLD: export default function StatsSection({ t }: StatsSectionProps) {
// OLD:   return (
// OLD:     <section className="py-16 px-6 md:px-12 lg:px-20 bg-warmCream dark:bg-stone-950 transition-colors duration-300 relative z-10">
// OLD:       <div className="max-w-[1440px] mx-auto bg-white dark:bg-stone-900 rounded-3xl border border-stone-150/40 dark:border-stone-800/80 shadow-soft p-10 md:p-12">
// OLD:         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center">
// OLD:           <div className="space-y-2">
// OLD:             <div className="text-4xl md:text-5xl font-extrabold text-koreanRed dark:text-red-400 tracking-tight">
// OLD:               <CountUpNumber value={8900} suffix="+" />
// OLD:             </div>
// OLD:             <div className="text-xs md:text-sm text-charcoal-muted dark:text-stone-400 font-bold uppercase tracking-wider">
// OLD:               {t('stats.students')}
// OLD:             </div>
// OLD:           </div>
// OLD:           ...
// OLD:         </div>
// OLD:       </div>
// OLD:     </section>
// OLD:   );
// OLD: }

/**
 * Component hiển thị các chỉ số thống kê (Stats Section) trên trang chủ.
 * SỬA ĐỔI: Tích hợp chuyển động stagger khi phần tử cuộn vào màn hình (whileInView) bằng Framer Motion.
 *
 * @param props - Thuộc tính component
 * @returns Component StatsSection hoàn chỉnh
 */
export default function StatsSection({ t }: StatsSectionProps) {
  // Biến cấu hình animation stagger cho stats cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // delay 100ms giữa các card con
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-warmCream dark:bg-stone-950 transition-colors duration-300 relative z-10">
      <div className="max-w-[1440px] mx-auto bg-white dark:bg-stone-900 rounded-3xl border border-stone-150/40 dark:border-stone-800/80 shadow-soft p-10 md:p-12">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="space-y-2" variants={itemVariants}>
            <div className="text-4xl md:text-5xl font-extrabold text-koreanRed dark:text-red-400 tracking-tight">
              <CountUpNumber value={8900} suffix="+" />
            </div>
            <div className="text-xs md:text-sm text-charcoal-muted dark:text-stone-400 font-bold uppercase tracking-wider">
              {t('stats.students')}
            </div>
          </motion.div>

          <motion.div
            className="space-y-2 border-l border-stone-100 dark:border-stone-800/80"
            variants={itemVariants}
          >
            <div className="text-4xl md:text-5xl font-extrabold text-koreanRed dark:text-red-400 tracking-tight">
              <CountUpNumber value={250} suffix="+" />
            </div>
            <div className="text-xs md:text-sm text-charcoal-muted dark:text-stone-400 font-bold uppercase tracking-wider">
              {t('stats.videos')}
            </div>
          </motion.div>

          <motion.div
            className="space-y-2 border-l border-stone-100 dark:border-stone-800/80"
            variants={itemVariants}
          >
            <div className="text-4xl md:text-5xl font-extrabold text-koreanRed dark:text-red-400 tracking-tight">
              <CountUpNumber value={12000} suffix="+" />
            </div>
            <div className="text-xs md:text-sm text-charcoal-muted dark:text-stone-400 font-bold uppercase tracking-wider">
              {t('stats.flashcards')}
            </div>
          </motion.div>

          <motion.div
            className="space-y-2 border-l border-stone-100 dark:border-stone-800/80"
            variants={itemVariants}
          >
            <div className="text-4xl md:text-5xl font-extrabold text-koreanRed dark:text-red-400 tracking-tight">
              <CountUpNumber value={95} suffix="%" />
            </div>
            <div className="text-xs md:text-sm text-charcoal-muted dark:text-stone-400 font-bold uppercase tracking-wider">
              {t('stats.satisfaction')}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
