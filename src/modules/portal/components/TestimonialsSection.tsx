'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface TestimonialItem {
  name: string;
  course: string;
  text: string;
  avatar: string;
}

interface TestimonialsSectionProps {
  /** Hàm dịch thuật */
  t: (key: string) => string;
  /** Danh sách testimonials */
  testimonialsData: TestimonialItem[];
}

/**
 * Component hiển thị các phản hồi cảm nhận học viên (Testimonials Section).
 */
export default function TestimonialsSection({ t, testimonialsData }: TestimonialsSectionProps) {
  return (
    <section
      id="testimonials"
      className="py-24 px-6 md:px-12 lg:px-20 bg-white dark:bg-stone-900 transition-colors duration-300"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-koreanRed dark:text-red-400 block font-bold text-xs uppercase tracking-widest mb-3 font-mono">
            Cảm nhận học viên
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-charcoal dark:text-stone-100 tracking-tight">
            {t('testimonials.title')}
          </h2>
          <p className="text-sm md:text-base text-charcoal-muted dark:text-stone-400 max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
            {t('testimonials.desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonialsData.map((item, idx) => (
            <div
              key={idx}
              className="card-soft flex flex-col justify-between h-full bg-white dark:bg-stone-950 border border-stone-150/40 dark:border-stone-800/80 p-8 shadow-soft"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 text-amber-400 mb-6">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-xs md:text-sm text-charcoal-muted dark:text-stone-300 leading-relaxed font-semibold italic">
                  &quot;{item.text}&quot;
                </p>
              </div>
              <div className="flex items-center gap-3.5 mt-8 border-t border-stone-100 dark:border-stone-800/80 pt-5">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-charcoal dark:text-stone-100">
                    {item.name}
                  </h4>
                  <span className="text-[10px] text-koreanRed dark:text-red-400 font-bold mt-0.5 block">
                    {item.course}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
