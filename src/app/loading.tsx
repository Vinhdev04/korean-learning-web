'use client';

import React from 'react';

/**
 * Component Loading toàn cục cho Next.js ứng dụng phong cách Seoul Sunset.
 * Tích hợp backdrop blur mờ, vòng quay tiến trình gradient và logo con dấu đỏ đập nhẹ.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-stone-50/80 dark:bg-stone-950/85 backdrop-blur-md transition-colors duration-300">
      <style>{`
        @keyframes spinner-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-heart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .animate-spinner-slow {
          animation: spinner-slow 2s linear infinite;
        }
        .animate-pulse-heart {
          animation: pulse-heart 1.5s ease-in-out infinite;
        }
      `}</style>

      <div className="relative flex items-center justify-center">
        {/* Vòng quay progress gradient viền ngoài */}
        <div className="w-24 h-24 rounded-full border-[3px] border-stone-200/50 dark:border-stone-800/40 border-t-koreanRed border-r-amber-500 animate-spinner-slow" />

        {/* Logo con dấu tròn chữ "한" màu đỏ ở giữa đập nhẹ */}
        <div className="absolute w-14 h-14 rounded-full bg-koreanRed flex items-center justify-center shadow-lg shadow-koreanRed/30 animate-pulse-heart">
          <span className="font-extrabold text-white text-xl tracking-wider select-none">한</span>
        </div>
      </div>

      {/* Dòng chữ phụ đề trạng thái */}
      <div className="mt-6 flex flex-col items-center gap-1.5">
        <span className="text-sm font-bold text-stone-700 dark:text-stone-300 tracking-wider">
          ĐANG TẢI...
        </span>
        <span className="text-xs text-stone-400 dark:text-stone-500 font-medium">
          잠시만 기다려주세요 (Chờ một chút nhé)
        </span>
      </div>
    </div>
  );
}
