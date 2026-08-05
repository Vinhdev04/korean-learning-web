'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUp, MessageSquare, X, Mail, Facebook, MessageCircle, Bot, Send
} from 'lucide-react';

interface FloatingActionHubProps {
  /** Locale hiện tại từ ClientLayout (vn hoặc en) */
  locale?: string;
}

/**
 * Bản dịch ngôn ngữ cục bộ cho Chatbot và Tooltip
 */
const HUB_TRANSLATIONS = {
  vi: {
    ai: {
      title: 'Trợ Lý AI Học Tiếng Hàn',
      online: 'Đang trực tuyến',
      welcome: 'Xin chào! Mình là trợ lý AI của Hàn Quốc Học. Bạn cần mình giải đáp thắc mắc gì về ngữ pháp hay từ vựng tiếng Hàn hôm nay không?',
      placeholder: 'Hỏi từ vựng, ngữ pháp...',
      send: 'Gửi',
      response: 'Cảm ơn bạn! Câu hỏi "{query}" đang được hệ thống phân tích. Bạn có thể nhấn Đăng ký miễn phí tài khoản để thảo luận trực tiếp với giáo viên bản xứ nhé!',
    },
    tooltip: {
      backToTop: 'Quay lại đầu trang',
      chatAI: 'Trợ lý AI tiếng Hàn',
      zalo: 'Chat Zalo hỗ trợ',
      facebook: 'Ghé thăm Fanpage',
      messenger: 'Liên hệ qua Messenger',
      gmail: 'Gửi Email góp ý',
    }
  },
  ko: {
    ai: {
      title: 'AI 한국어 튜터',
      online: '온라인',
      welcome: '안녕하세요! 한국어학당 AI 튜터입니다. 오늘 한국어 문법이나 어휘에 대해 궁금한 점이 있으신가요?',
      placeholder: '어휘, 문법 질문하기...',
      send: '전송',
      response: '감사합니다! "{query}" 질문을 분석 중입니다. 원어민 선생님과 직접 소통하고 싶으시면 무료 회원가입을 완료해 주세요!',
    },
    tooltip: {
      backToTop: '맨 위로 이동',
      chatAI: 'AI 한국어 튜터',
      zalo: 'Zalo 지원 채팅',
      facebook: '팬페이지 방문',
      messenger: '메신저 문의',
      gmail: '이메일 문의',
    }
  }
};

/**
 * Component Floating Action Hub quản lý tập trung các nút nổi:
 * 1. Nút cuộn lên đầu trang (Back to Top)
 * 2. Nút bóng Chat AI & Popup tư vấn AI
 * 3. Thanh liên hệ nổi dọc ở giữa lề bên phải (Zalo, Facebook, Gmail, Messenger)
 * 
 * @param props - Các thuộc tính truyền vào component
 * @returns Khối các phần tử nổi trên giao diện
 */
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
      {/* ─── 1. THANH LIÊN HỆ NỔI DỌC (STICKY CONTACT SIDEBAR) ─── */}
      <div 
        className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50 animate-in fade-in slide-in-from-right-5 duration-500"
        aria-label="Contact channels"
      >
        {/* Zalo Button */}
        <div className="relative group">
          <a
            href="https://zalo.me/0900000000" // Thay thế bằng số Zalo thực tế của bạn
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/80 shadow-lg text-[#0068ff] transition-all duration-300 hover:scale-110 active:scale-95 group-hover:shadow-[#0068ff]/25 group-hover:shadow-md"
          >
            {/* Custom SVG Icon Zalo */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M12 2C6.477 2 2 5.92 2 10.77c0 2.82 1.54 5.31 3.97 6.91-.18.73-.66 2.66-.76 3.09-.15.65.25.61.53.42.22-.15 3.48-2.37 4.9-3.32.44.06.89.1 1.36.1 5.523 0 10-3.92 10-8.77S17.523 2 12 2zm3.3 11.23c-.45.45-1.07.67-1.87.67s-1.42-.22-1.87-.67c-.45-.45-.67-1.09-.67-1.92s.22-1.47.67-1.92c.45-.45 1.07-.67 1.87-.67s1.42.22 1.87.67c.45.45.67 1.09.67 1.92s-.22 1.47-.67 1.92zm.05-3.3c-.22-.22-.52-.33-.92-.33s-.7.11-.92.33c-.22.22-.33.55-.33.98s.11.77.33.98c.22.22.52.33.92.33s.7-.11.92-.33c.22-.22.33-.55.33-.98s-.11-.76-.33-.98z"/>
            </svg>
          </a>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 shadow-md">
            {t.tooltip.zalo}
          </span>
        </div>

        {/* Facebook Button */}
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

        {/* Messenger Button */}
        <div className="relative group">
          <a
            href="https://m.me/hanquochoc" // Thay thế bằng link Messenger thực tế
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/80 shadow-lg text-[#00B2FF] transition-all duration-300 hover:scale-110 active:scale-95 group-hover:shadow-[#00B2FF]/25 group-hover:shadow-md"
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
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/80 shadow-lg text-[#ea4335] transition-all duration-300 hover:scale-110 active:scale-95 group-hover:shadow-[#ea4335]/25 group-hover:shadow-md"
          >
            <Mail size={22} strokeWidth={2.2} />
          </a>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 shadow-md">
            {t.tooltip.gmail}
          </span>
        </div>
      </div>

      {/* ─── 2. NÚT CHAT AI FLOATING BUBBLE (DƯỚI CÙNG GÓC PHẢI) ─── */}
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

      {/* ─── 3. AI CHAT POPUP DIALOUGE (TRÊN NÚT BUBBLE) ─── */}
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
                <span className="text-[10px] text-white/80 font-medium block mt-1">{t.ai.online}</span>
              </div>
            </div>
            <button onClick={() => setShowChatPopup(false)} className="text-white/80 hover:text-white" aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages */}
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

          {/* Form Input */}
          <form onSubmit={handleSendChatMessage} className="p-3 border-t border-stone-100 dark:border-stone-800 flex gap-2">
            <input 
              type="text" 
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
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

      {/* ─── 4. NÚT BACK TO TOP (XẾP THẲNG HÀNG TRÊN NÚT BUBBLE) ─── */}
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
