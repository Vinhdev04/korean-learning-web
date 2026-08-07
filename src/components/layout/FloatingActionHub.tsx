'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUp, MessageSquare, X, Mail, Facebook, MessageCircle, Bot, Send
} from 'lucide-react';

interface FloatingActionHubProps {
  locale?: string;
}

export default function FloatingActionHub({ locale = 'vn' }: FloatingActionHubProps) {
  // Đồng bộ hóa locale: vn -> vi, en -> ko
  const activeLocale = locale === 'en' ? 'ko' : 'vi';
  const t = HUB_TRANSLATIONS[activeLocale];

  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'USER' | 'AI'; text: string }>>([]);

  // Khởi tạo lời chào của AI khi thay đổi ngôn ngữ
  useEffect(() => {
    setChatHistory([
      { sender: 'AI', text: t.ai.welcome }
    ]);
  }, [activeLocale]);

  // Lắng nghe scroll để hiển thị nút Back to Top
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsBackToTopVisible(true);
      } else {
        setIsBackToTopVisible(false);
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

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newHistory = [...chatHistory, { sender: 'USER' as const, text: chatMessage }];
    setChatHistory(newHistory);
    const userQuery = chatMessage;
    setChatMessage('');

    // Giả lập AI phản hồi sau 800ms
    setTimeout(() => {
      setChatHistory([
        ...newHistory,
        { sender: 'AI' as const, text: t.ai.response.replace('{query}', userQuery) }
      ]);
    }, 800);
  };

  return (
    <>
      
        <div className="relative group">
          <a
            href="https://facebook.com/hanquochoc" // Thay thế bằng link Fanpage thực tế
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/80 shadow-lg text-[#1877f2] transition-all duration-300 hover:scale-110 active:scale-95 group-hover:shadow-[#1877f2]/25 group-hover:shadow-md"
          >
            <Facebook size={22} strokeWidth={2.2} />
          </a>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 shadow-md">
            {t.tooltip.facebook}
          </span>
        </div>

        <div className="relative group">
          <a
            href="mailto:support@hanquochoc.edu.vn"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/80 shadow-lg text-[#ea4335] transition-all duration-300 hover:scale-110 active:scale-95 group-hover:shadow-[#ea4335]/25 group-hover:shadow-md"
          >
            <Mail size={22} strokeWidth={2.2} />
          </a>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 shadow-md">
            {t.tooltip.gmail}
          </span>
        </div>
      </div>

          <div className="flex-grow p-4 overflow-y-auto bg-warmCream/20 dark:bg-stone-950/20 flex flex-col gap-3 custom-scrollbar">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'USER' 
                    ? 'bg-koreanRed text-white rounded-tr-none' 
                    : 'bg-white dark:bg-stone-800 text-charcoal dark:text-stone-100 border border-stone-200/60 dark:border-stone-800/80 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

      {/* Ẩn Back to Top khi đang mở popup chat để tránh che mất hộp thoại */}
      {isBackToTopVisible && !showChatPopup && (
        <div className="fixed bottom-24 right-7 z-40 animate-in fade-in zoom-in-75 duration-350">
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-stone-900/90 dark:bg-stone-850/90 hover:bg-koreanRed dark:hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95"
            title={t.tooltip.backToTop}
            aria-label={t.tooltip.backToTop}
          >
            <ArrowUp size={20} />
          </button>
        </div>
      )}
    </>
  );
}
