'use client';

import React from 'react';

interface HeroSectionProps {
  /** Hàm dịch thuật */
  t: (key: string) => string;
  /** Hàm mở modal đăng ký/đăng nhập */
  openAuthModal: (mode: 'LOGIN' | 'REGISTER') => void;
}

/**
 * Component hiển thị banner chính (Hero Section) của trang chủ.
 * Thiết kế mang phong cách hoàng hôn Seoul (Seoul Sunset Overlay) cổ kính và lãng mạn.
 */
export default function HeroSection({ t, openAuthModal }: HeroSectionProps) {
  return (
    <section className="hero-seoul-sunset relative w-full min-h-[580px] flex items-center justify-center text-center px-6 py-20">
      <div className="hero-content max-w-5xl mx-auto flex flex-col items-center animate-fade-in-up">
        
        <div className="flex flex-col sm:flex-row gap-4 mb-14 w-full sm:w-auto justify-center">
          <button 
            onClick={() => openAuthModal('REGISTER')}
            className="btn-primary text-base font-bold py-4 px-10 text-center active:scale-95 shadow-lg shadow-koreanRed/20 bg-koreanRed hover:bg-koreanRed-dark text-white rounded-xl"
          >
            {t('hero.startBtn')}
          </button>
          <a href="#courses" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-base font-bold py-4 px-10 rounded-xl transition-all active:scale-95 text-center flex items-center justify-center">
            {t('hero.browseBtn')}
          </a>
        </div>
      </div>
    </section>
  );
}
