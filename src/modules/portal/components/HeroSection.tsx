'use client';

import React from 'react';

import { Check } from 'lucide-react';

interface HeroSectionProps {
  /** Hàm dịch thuật */
  t: (key: string) => string;
  /** Hàm mở modal đăng ký/đăng nhập */
  openAuthModal: (mode: 'LOGIN' | 'REGISTER') => void;
}

// OLD: export default function HeroSection({ t, openAuthModal }: HeroSectionProps) {
// OLD:   return (
// OLD:     <section className="hero-seoul-sunset relative w-full min-h-[580px] flex items-center justify-center text-center px-6 py-20">
// OLD:       <div className="hero-content max-w-5xl mx-auto flex flex-col items-center animate-fade-in-up">
// OLD:
// OLD:         <div className="flex flex-col sm:flex-row gap-4 mb-14 w-full sm:w-auto justify-center">
// OLD:           <button
// OLD:             onClick={() => openAuthModal('REGISTER')}
// OLD:             className="btn-primary text-base font-bold py-4 px-10 text-center active:scale-95 shadow-lg shadow-koreanRed/20 bg-koreanRed hover:bg-koreanRed-dark text-white rounded-xl"
// OLD:           >
// OLD:             {t('hero.startBtn')}
// OLD:           </button>
// OLD:           <a href="#courses" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-base font-bold py-4 px-10 rounded-xl transition-all active:scale-95 text-center flex items-center justify-center">
// OLD:             {t('hero.browseBtn')}
// OLD:           </a>
// OLD:         </div>
// OLD:       </div>
// OLD:     </section>
// OLD:   );
// OLD: }

/**
 * Component hiển thị banner chính (Hero Section) của trang chủ.
 * Thiết kế mang phong cách hoàng hôn Seoul (Seoul Sunset Overlay) cổ kính và lãng mạn,
 * bổ sung các vòng tròn trang trí và đầy đủ thông tin tiêu đề, mô tả và checkmarks.
 *
 * @param props - Thuộc tính component
 * @returns Component HeroSection hoàn chỉnh
 */
export default function HeroSection({ t, openAuthModal }: HeroSectionProps) {
  return (
    <section className="hero-seoul-sunset relative w-full min-h-[680px] flex items-center justify-center text-center px-6 py-24 overflow-hidden">
      {/* Vòng tròn trang trí mờ ảo tạo chiều sâu mỹ thuật */}
      <div className="absolute w-28 h-28 sm:w-36 sm:h-36 border border-white/10 rounded-full left-[10%] top-[25%] animate-pulse duration-[4000ms] pointer-events-none" />
      <div className="absolute w-14 h-14 sm:w-16 sm:h-16 border border-white/10 rounded-full left-[20%] bottom-[20%] animate-pulse duration-[5000ms] pointer-events-none" />
      <div className="absolute w-20 h-20 sm:w-24 sm:h-24 border border-white/10 rounded-full right-[12%] top-[35%] animate-pulse duration-[6000ms] pointer-events-none" />

      <div className="hero-content max-w-4xl mx-auto flex flex-col items-center z-10 animate-fade-in-up">
        {/* Tagline tiếng Hàn phụ ở trên */}
        <span className="text-sm sm:text-base font-medium text-warmCream-soft/90 dark:text-stone-300 mb-4 tracking-wider uppercase">
          한국어를 배우는 가장 좋은 방법
        </span>

        {/* Tiêu đề chính lớn */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Học Tiếng Hàn Online
        </h1>

        {/* Phụ đề lớn màu cam vàng hoàng hôn rực rỡ */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FFA07A] mt-2 mb-6 tracking-wide">
          Từ Sơ Cấp Đến TOPIK II
        </h2>

        {/* Đoạn mô tả ngắn gọn, thoáng đãng */}
        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed font-light">
          Lộ trình học tiếng Hàn toàn diện với video bài giảng chi tiết, bài luyện tập tương tác và
          flashcard từ vựng thông minh.
        </p>

        {/* Các nút CTA bấm chính/phụ */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto justify-center">
          <button
            onClick={() => openAuthModal('REGISTER')}
            className="bg-koreanRed hover:bg-koreanRed-dark text-white text-base font-bold py-4 px-10 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-koreanRed/30"
          >
            {t('hero.startBtn')}
          </button>
          <a
            href="#courses"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-base font-bold py-4 px-10 rounded-xl transition-all duration-300 active:scale-95 text-center flex items-center justify-center backdrop-blur-sm"
          >
            Xem tất cả khóa học
          </a>
        </div>

        {/* Các đặc điểm checkmarks hỗ trợ trực quan */}
        <div className="grid grid-cols-2 md:flex md:flex-row md:items-center justify-center gap-x-8 gap-y-3 text-white/90 text-sm font-medium">
          <div className="flex items-center gap-2 justify-center">
            <Check size={16} className="text-emerald-400" />
            <span>Học miễn phí</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Check size={16} className="text-emerald-400" />
            <span>Video bài giảng HD</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Check size={16} className="text-emerald-400" />
            <span>Luyện tập tương tác</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Check size={16} className="text-emerald-400" />
            <span>Theo dõi tiến độ</span>
          </div>
        </div>
      </div>
    </section>
  );
}
