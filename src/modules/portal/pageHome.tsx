

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
// import CountUpNumber from '@/components/common/CountUpNumber';
// import { 
//   Flame, BookOpen, ChevronRight, Check, X, ArrowUp, 
//   MessageSquare, Star, Lock, Mail, Compass, ArrowRight, User,
//   Play, Layers, CheckSquare, BarChart2, PenTool, Award
// } from 'lucide-react';
import { X, Lock, Mail, User } from 'lucide-react';

// Import các sub-component trang chủ (Clean Architecture)
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturedCourses from './components/FeaturedCourses';
import MethodSection from './components/MethodSection';
import LeaderboardPodium from './components/LeaderboardPodium';
import TestimonialsSection from './components/TestimonialsSection';
import CtaSection from './components/CtaSection';

export default function HomePageClient() {
  const params = useParams();
  
  // Mặc định đồng bộ locale từ route Next.js (vn -> vi, en/ko -> ko)
  const initialLocale = params?.locale === 'en' ? 'ko' : 'vi';
  const [locale, setLocale] = useState<'vi' | 'ko'>(initialLocale);
  
  const [activeTab, setActiveTab] = useState<'ALL' | 'TOPIK1' | 'TOPIK2'>('ALL');
  const [leaderboardTab, setLeaderboardTab] = useState<'WEEK' | 'MONTH' | 'ALLTIME'>('WEEK');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('REGISTER');
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'USER' | 'AI'; text: string }>>([]);
  const [showPromoPopup, setShowPromoPopup] = useState(false);

  // Hàm dịch dựa trên locale cục bộ
  const t = (path: string): string => {
    const keys = path.split('.');
    let result: any = TRANSLATIONS[locale];
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        return path;
      }
    }
    return result;
  };

  // Đồng bộ hóa ngôn ngữ từ params nếu URL thay đổi
  useEffect(() => {
    if (params?.locale === 'en') {
      setLocale('ko');
    } else {
      setLocale('vi');
    }
  }, [params?.locale]);

  // Khởi tạo lời chào của AI đầu tiên tương thích ngôn ngữ
  useEffect(() => {
    setChatHistory([
      { sender: 'AI', text: t('ai.welcome') }
    ]);
  }, [locale]);

  // Lọc danh sách khóa học dựa trên tab hoạt động
  const filteredCourses = mockCourses(t).filter(course => {
    if (activeTab === 'TOPIK1') return course.level.includes('TOPIK I');
    if (activeTab === 'TOPIK2') return course.level.includes('TOPIK II');
    return true;
  });

  // Lắng nghe scroll để hiển thị nút Scroll Top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lắng nghe scroll để hiển thị popup 50% (chỉ 1 lần duy nhất trong 1 phiên làm việc)
  useEffect(() => {
    const handleScrollForPopup = () => {
      const hasShownPopup = sessionStorage.getItem('has-shown-scroll-popup');
      if (hasShownPopup) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = (scrollTop / docHeight) * 100;
      if (scrollPercent >= 50) {
        setShowPromoPopup(true);
        sessionStorage.setItem('has-shown-scroll-popup', 'true');
        // Hủy lắng nghe scroll ngay khi đã hiển thị để tối ưu hiệu năng
        window.removeEventListener('scroll', handleScrollForPopup);
      }
    };

    const hasShownPopup = sessionStorage.getItem('has-shown-scroll-popup');
    if (!hasShownPopup) {
      window.addEventListener('scroll', handleScrollForPopup);
    }

    return () => window.removeEventListener('scroll', handleScrollForPopup);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openAuthModal = (mode: 'LOGIN' | 'REGISTER') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newHistory = [...chatHistory, { sender: 'USER' as const, text: chatMessage }];
    setChatHistory(newHistory);
    const userQuery = chatMessage;
    setChatMessage('');

    setTimeout(() => {
      setChatHistory([
        ...newHistory,
        { sender: 'AI' as const, text: t('ai.response').replace('{query}', userQuery) }
      ]);
    }, 800);
  };

  return (
    <main className="flex-grow font-sans bg-warmCream dark:bg-stone-950 transition-colors duration-300 selection:bg-koreanRed-light selection:text-koreanRed overflow-x-hidden">

      {showPromoPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-100 dark:border-stone-800 p-8 text-center animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowPromoPopup(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-charcoal dark:hover:text-stone-150 p-1"
              aria-label="Đóng popup"
            >
              <X size={20} />
            </button>

            {
function mockCourses(t: (key: string) => string): Course[] {
  return [
    {
      id: 'c1',
      title: t('courses.c1_title'),
      description: t('courses.c1_desc'),
      level: 'TOPIK I - Cấp 1',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
      weeks: 12,
      lessons: 30,
      students: '3.250'
    },
    {
      id: 'c2',
      title: t('courses.c2_title'),
      description: t('courses.c2_desc'),
      level: 'TOPIK I - Cấp 2',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
      weeks: 14,
      lessons: 32,
      students: '2.180'
    },
    {
      id: 'c3',
      title: t('courses.c3_title'),
      description: t('courses.c3_desc'),
      level: 'TOPIK II - Cấp 3',
      thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      weeks: 16,
      lessons: 36,
      students: '1.540'
    }
  ];
}

/**
 * Dữ liệu mock bảng xếp hạng
 */
const leaderboardData = [
  { rank: 1, name: 'Vũ Thị Linh', level: 'TOPIK II Cấp 3', score: 485, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
  { rank: 2, name: 'Phạm Thanh Mai', level: 'TOPIK I Cấp 2', score: 420, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
  { rank: 3, name: 'Đặng Minh Tâm', level: 'TOPIK I Cấp 2', score: 375, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80' }
];

/**
 * Dữ liệu mock testimonial
 */
function testimonials(t: (key: string) => string) {
  return [
    {
      name: 'Nguyễn Thị Minh Anh',
      course: t('testimonials.t1_course'),
      text: t('testimonials.t1_text'),
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'
    },
    {
      name: 'Trần Văn Hùng',
      course: t('testimonials.t2_course'),
      text: t('testimonials.t2_text'),
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
    },
    {
      name: 'Lê Thị Hồng Nhung',
      course: t('testimonials.t3_course'),
      text: t('testimonials.t3_text'),
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
    }
  ];
}
