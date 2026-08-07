'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search, CornerDownLeft } from 'lucide-react';

interface SearchModalProps {
  /** Trạng thái mở/đóng modal */
  isOpen: boolean;
  /** Hàm đóng modal */
  onClose: () => void;
}

/**
 * Component SearchModal hiển thị Command Palette tìm kiếm nâng cao (giống hình 1).
 * Hỗ trợ các thẻ gợi ý tìm kiếm phổ biến và khả năng đóng nhanh bằng phím Esc.
 *
 * @param props - Các thuộc tính của component
 * @returns React Element hiển thị ô tìm kiếm mờ ảo
 */
export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus tự động vào input khi mở modal
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Lắng nghe sự kiện bàn phím (Esc để đóng)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  // Danh sách các tag gợi ý giống hình 1
  const suggestions = ['TOPIK I', 'Ngữ pháp cơ bản', 'Chào hỏi', 'Số đếm', 'Danh từ'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-150/40 dark:border-stone-800 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Thanh tìm kiếm phía trên */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-stone-100 dark:border-stone-850">
          <Search className="text-stone-400 dark:text-stone-500 flex-shrink-0" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tìm kiếm khóa học, bài học, từ vựng..."
            className="w-full text-base bg-transparent border-none outline-none text-charcoal dark:text-stone-100 placeholder-stone-400 font-sans"
          />
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-750 transition-colors text-stone-400 dark:text-stone-500 font-sans text-xs font-semibold"
          >
            Esc
          </button>
        </div>

        {/* Khối gợi ý và tags tìm kiếm */}
        <div className="p-6">
          <h3 className="text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4 font-sans">
            Gợi ý tìm kiếm
          </h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {suggestions.map(suggestion => (
              <button
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion);
                  inputRef.current?.focus();
                }}
                className="px-4 py-2 rounded-full text-xs font-bold bg-stone-50 hover:bg-stone-100 dark:bg-stone-850 dark:hover:bg-stone-800 text-charcoal-muted dark:text-stone-300 border border-stone-150/30 dark:border-stone-800 transition-colors font-sans"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Hướng dẫn phím tắt ở footer của modal */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-850 text-xs text-stone-400 dark:text-stone-500 font-sans">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-700 font-sans font-bold text-[10px]">
                  ↑↓
                </kbd>
                <span>Chọn</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-700 font-sans font-bold text-[10px] flex items-center">
                  <CornerDownLeft size={10} className="mr-0.5" /> Enter
                </kbd>
                <span>Mở</span>
              </div>
            </div>
            <div>{query.trim() === '' ? '0 kết quả' : 'Đang tìm kiếm...'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
