'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, HelpCircle } from 'lucide-react';

/**
 * Component trang 404 (Không tìm thấy trang) được thiết kế cao cấp theo phong cách Seoul Sunset.
 * Tích hợp đa ngôn ngữ Việt - Hàn, nút điều hướng linh hoạt và hiệu ứng chuyển động trôi nổi.
 */
export default function NotFound() {
  // Hàm quay lại trang lịch sử trước đó
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 text-charcoal dark:text-stone-200 px-6 py-24 relative overflow-hidden transition-colors duration-300">
      {/* Khối CSS keyframes cho hiệu ứng lơ lửng và bóng mờ */}
      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(2deg);
          }
        }
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(12px) rotate(-3deg);
          }
        }
        .animate-float-slow {
          animation: float-slow 6s infinite ease-in-out;
        }
        .animate-float-delayed {
          animation: float-delayed 8s infinite ease-in-out;
        }
      `}</style>

      {/* Trang trí background: Các đốm sáng gradient phong cách Seoul Sunset */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-red-400/10 dark:bg-red-900/10 blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-amber-400/10 dark:bg-amber-900/5 blur-[120px] pointer-events-none animate-pulse" />

      {/* Grid trang trí nét đứt tinh tế */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10">
        {/* Biểu tượng dấu hỏi chấm phong cách học thuật bay lơ lửng */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-3xl bg-warmCream dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/80 flex items-center justify-center shadow-lg text-koreanRed animate-float-slow">
            <HelpCircle size={40} className="stroke-[1.5]" />
          </div>
        </div>

        {/* Số 404 lớn cách điệu */}
        <h1 className="text-[110px] sm:text-[140px] font-extrabold leading-none tracking-tight select-none bg-gradient-to-br from-koreanRed via-red-500 to-amber-500 bg-clip-text text-transparent">
          404
        </h1>

        {/* Thông điệp tiếng Hàn dễ thương */}
        <p className="text-lg sm:text-xl font-bold text-stone-700 dark:text-stone-300 mt-2 tracking-wide font-sans">
          길을 잃으셨나요?{' '}
          <span className="text-xs font-medium text-stone-400/80 dark:text-stone-500 block sm:inline">
            (Bạn bị lạc đường rồi sao?)
          </span>
        </p>

        {/* Tiêu đề lỗi tiếng Việt */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-4 leading-tight">
          Không tìm thấy trang yêu cầu
        </h2>

        {/* Mô tả chi tiết */}
        <p className="text-stone-500 dark:text-stone-400 mt-3 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Đường dẫn bạn truy cập có thể đã bị thay đổi, xóa bỏ hoặc không tồn tại. Vui lòng kiểm tra
          lại địa chỉ URL.
        </p>

        {/* Các nút hành động CTA điều hướng ngược xuôi */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Nút Về Trang Chủ */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-koreanRed hover:bg-koreanRed-dark text-white px-8 py-3.5 text-sm font-bold shadow-lg shadow-koreanRed/20 hover:shadow-koreanRed/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <Home size={16} />
            <span>Về trang chủ</span>
          </Link>

          {/* Nút Quay Lại Trang Trước */}
          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-850 px-8 py-3.5 text-sm font-bold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <ArrowLeft size={16} />
            <span>Quay lại trang trước</span>
          </button>
        </div>

        {/* Decor vật thể nhỏ bay bên góc dưới */}
        <div className="absolute -bottom-10 -left-10 w-16 h-16 rounded-full bg-gradient-to-br from-koreanRed/20 to-amber-500/20 blur-md animate-float-delayed pointer-events-none" />
      </div>
    </section>
  );
}
