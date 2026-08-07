'use client';

import React from 'react';
import Link from 'next/link';

interface CtaSectionProps {
  /** Hàm dịch thuật */
  t: (key: string) => string;
  /** Locale hiện tại (vn hoặc en) */
  locale: string;
  /** Hàm mở modal đăng ký/đăng nhập */
  openAuthModal: (mode: 'LOGIN' | 'REGISTER') => void;
}

/**
 * Component hiển thị kêu gọi hành động (CTA Section) ở cuối trang chủ.
 */
export default function CtaSection({ t, locale, openAuthModal }: CtaSectionProps) {
  return (
    <section className="bg-koreanRed py-20 px-6 md:px-12 lg:px-20 text-white text-center relative overflow-hidden">
      
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mb-6">
          <button 
            onClick={() => openAuthModal('REGISTER')}
            className="bg-white text-koreanRed border border-white hover:bg-[#FAF8F5] text-sm font-extrabold py-4 px-10 rounded-xl transition-all active:scale-95 shadow-md shadow-black/5"
          >
            Đăng ký miễn phí
          </button>
          <Link 
            href={`/${locale}/courses`}
            className="bg-[#9A1220] hover:bg-[#8F1020] text-white border border-[#B81D30]/30 text-sm font-extrabold py-4 px-10 rounded-xl transition-all active:scale-95 block text-center shadow-md shadow-black/5"
          >
            Xem khóa học
          </Link>
        </div>
        <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">
          {t('cta.subText')}
        </span>
      </div>
    </section>
  );
}
