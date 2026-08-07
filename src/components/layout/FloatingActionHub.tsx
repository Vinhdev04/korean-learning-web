'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, X, Mail, Facebook, MessageCircle, Bot, Send } from 'lucide-react';

// Khai báo kiểu dữ liệu cho bản dịch
interface Translations {
  tooltip: {
    zalo: string;
    facebook: string;
    messenger: string;
    gmail: string;
    chatAI: string;
    backToTop: string;
  };
  ai: {
    title: string;
    online: string;
    welcome: string;
    placeholder: string;
    response: string;
  };
}

// Bộ từ điển dịch thuật cho FloatingActionHub
const HUB_TRANSLATIONS: Record<'vi' | 'ko', Translations> = {
  vi: {
    tooltip: {
      zalo: 'Trò chuyện qua Zalo',
      facebook: 'Ghé thăm Fanpage',
      messenger: 'Nhắn tin Messenger',
      gmail: 'Gửi Email hỗ trợ',
      chatAI: 'Trợ lý AI học tập',
      backToTop: 'Về đầu trang',
    },
    ai: {
      title: 'Trợ Lý Học Tiếng Hàn AI',
      online: 'Đang trực tuyến · Sẵn sàng trợ giúp',
      welcome:
        'Xin chào! Mình là trợ lý AI học tiếng Hàn. Bạn cần mình giải thích từ vựng, ngữ pháp hay dịch câu nào không?',
      placeholder: 'Hỏi AI về từ vựng, ngữ pháp...',
      response:
        "Cảm ơn bạn đã hỏi về '{query}'. Đây là giả lập trợ lý AI trả lời, cơ sở dữ liệu Supabase & MongoDB sẽ kết nối realtime sau này.",
    },
  },
  ko: {
    tooltip: {
      zalo: 'Zalo로 채팅하기',
      facebook: '팬페이지 방문',
      messenger: '메신저 보내기',
      gmail: '지원 이메일 보내기',
      chatAI: 'AI 학습 도우미',
      backToTop: '맨 위로',
    },
    ai: {
      title: 'AI 한국어 학습 도우미',
      online: '온라인 · 지원 준비 완료',
      welcome: '안녕하세요! 한국어 학습 AI 도우미입니다. 어휘, 문법 설명이나 번역이 필요하신가요?',
      placeholder: '어휘, 문법에 대해 AI에게 물어보세요...',
      response:
        "'{query}'에 대한 질문 감사합니다. AI 답변 시뮬레이션입니다. Supabase & MongoDB 데이터베이스가 연동될 예정입니다.",
    },
  },
};

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
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'USER' | 'AI'; text: string }>>(
    []
  );

  // Khởi tạo lời chào của AI khi thay đổi ngôn ngữ
  useEffect(() => {
    setChatHistory([{ sender: 'AI', text: t.ai.welcome }]);
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
        { sender: 'AI' as const, text: t.ai.response.replace('{query}', userQuery) },
      ]);
    }, 800);
  };

  return (
    <>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(194, 26, 49, 0.7), 0 10px 25px -5px rgba(194, 26, 49, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(194, 26, 49, 0), 0 10px 25px -5px rgba(194, 26, 49, 0.4);
            transform: scale(1.06);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite ease-in-out;
        }

        @keyframes hover-wiggle {
          0%, 100% { transform: rotate(0deg) scale(1.1); }
          25% { transform: rotate(4deg) scale(1.1); }
          75% { transform: rotate(-4deg) scale(1.1); }
        }
        .hover-wiggle:hover {
          animation: hover-wiggle 0.35s ease-in-out infinite;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      `}</style>

      {/* 1. CÁC NÚT LIÊN HỆ MẠNG XÃ HỘI (FLOATING RIGHT PANEL) */}
      <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-3.5">
        {/* Zalo Button */}
        <div className="relative group">
          <a
            href="https://zalo.me/0909090909"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/80 shadow-lg text-[#0068ff] transition-all duration-300 hover-wiggle active:scale-95 group-hover:shadow-[#0068ff]/25 group-hover:shadow-md"
          >
            {/* OLD: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"> */}
            {/* OLD:   <path d="M12 2C6.477 2 2 6.03 2 11c0 2.278 1.054 4.364 2.808 5.922-.164.577-.663 2.188-.707 2.336-.086.291.077.295.163.238.687-.457 2.355-1.564 3.013-1.956C8.283 17.828 10.07 18 12 18c5.523 0 10-4.03 10-9s-4.477-7-10-7zm0 13c-4.418 0-8-3.134-8-7s3.582-7 8-7 8 3.134 8 7-3.582 7-8 7z" /> */}
            {/* OLD: </svg> */}
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path
                d="M12 2C6.48 2 2 6.02 2 11c0 2.28 1.05 4.38 2.81 5.92-.16.58-.66 2.19-.7 2.34-.09.3.08.3.16.24.69-.46 2.36-1.57 3.02-1.96.65.17 1.34.26 2.03.26 5.52 0 10-4.02 10-9S17.52 2 12 2z"
                fill="currentColor"
              />
              <path
                d="M14.5 13.5H9.5v-1.1l3.1-3.6H9.7v-1.1h4.6v1.1l-3.1 3.6h3.3v1.1z"
                fill="white"
              />
            </svg>
          </a>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 shadow-md">
            {t.tooltip.zalo}
          </span>
        </div>

        {/* Facebook Button */}
        <div className="relative group">
          <a
            href="https://facebook.com/hanquochoc"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/80 shadow-lg text-[#1877f2] transition-all duration-300 hover-wiggle active:scale-95 group-hover:shadow-[#1877f2]/25 group-hover:shadow-md"
          >
            <Facebook size={22} strokeWidth={2.2} />
          </a>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 shadow-md">
            {t.tooltip.facebook}
          </span>
        </div>

        {/* Messenger Button */}
        <div className="relative group">
          <a
            href="https://m.me/hanquochoc"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/80 shadow-lg text-[#00B2FF] transition-all duration-300 hover-wiggle active:scale-95 group-hover:shadow-[#00B2FF]/25 group-hover:shadow-md"
          >
            <MessageCircle size={22} strokeWidth={2.2} />
          </a>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 shadow-md">
            {t.tooltip.messenger}
          </span>
        </div>

        {/* Gmail Button */}
        <div className="relative group">
          <a
            href="mailto:support@hanquochoc.edu.vn"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/80 shadow-lg text-[#ea4335] transition-all duration-300 hover-wiggle active:scale-95 group-hover:shadow-[#ea4335]/25 group-hover:shadow-md"
          >
            <Mail size={22} strokeWidth={2.2} />
          </a>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 shadow-md">
            {t.tooltip.gmail}
          </span>
        </div>
      </div>

      {/* 2. NÚT CHAT AI FLOATING BUBBLE (DƯỚI CÙNG GÓC PHẢI) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={() => setShowChatPopup(!showChatPopup)}
          className="w-14 h-14 rounded-full bg-koreanRed hover:bg-koreanRed-dark text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse-glow"
          title={t.tooltip.chatAI}
          aria-label={t.tooltip.chatAI}
        >
          {showChatPopup ? <X size={24} /> : <Bot size={24} />}
        </button>
      </div>

      {/* 3. AI CHAT POPUP DIALOUGE (TRÊN NÚT BUBBLE) */}
      {showChatPopup && (
        <div className="fixed bottom-24 right-6 w-[360px] h-[480px] bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl z-40 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-koreanRed p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="font-bold text-sm">한</span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-none">{t.ai.title}</h4>
                <span className="text-[10px] text-white/80 font-medium block mt-1">
                  {t.ai.online}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowChatPopup(false)}
              className="text-white/80 hover:text-white"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow p-4 overflow-y-auto bg-warmCream/20 dark:bg-stone-950/20 flex flex-col gap-3 custom-scrollbar">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'USER'
                      ? 'bg-koreanRed text-white rounded-tr-none'
                      : 'bg-white dark:bg-stone-800 text-charcoal dark:text-stone-100 border border-stone-200/60 dark:border-stone-800/80 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Form Input */}
          <form
            onSubmit={handleSendChatMessage}
            className="p-3 border-t border-stone-100 dark:border-stone-800 flex gap-2"
          >
            <input
              type="text"
              value={chatMessage}
              onChange={e => setChatMessage(e.target.value)}
              placeholder={t.ai.placeholder}
              className="flex-grow px-4 py-2 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:border-koreanRed dark:bg-stone-950 dark:text-white"
            />
            <button
              type="submit"
              className="p-2 bg-koreanRed text-white rounded-xl hover:bg-koreanRed/90 active:scale-95 transition-all flex items-center justify-center"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* 4. NÚT BACK TO TOP (XẾP THẲNG HÀNG TRÊN NÚT BUBBLE) */}
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
