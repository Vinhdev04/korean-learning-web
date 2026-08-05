'use client';

import React, { useState, useEffect } from 'react';

/**
 * Component Floating Action Hub cho dự án Học Tiếng Hàn
 * @returns Nút cuộn lên đầu trang (Back to Top)
 */
export default function FloatingActionHub() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      // OLD: className="fixed bottom-6 right-6 z-50 rounded-full bg-indigo-600 p-3 text-white shadow-lg transition-all hover:bg-indigo-700"
      className="fixed bottom-6 right-6 z-50 rounded-full bg-korean-red p-3 text-white shadow-lg transition-all hover:bg-korean-red-hover active:scale-95"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

// OLD: [Toàn bộ code cũ của FloatingActionHub đã được rút gọn thành nút Back-to-Top đơn giản]
