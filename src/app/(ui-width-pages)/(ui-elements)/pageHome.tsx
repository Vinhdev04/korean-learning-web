/* OLD:
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  PlayCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  CheckSquare, 
  Flame, 
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function HomePageClient() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-outfit">
      ...
    </main>
  );
}
*/

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Flame, BookOpen, ChevronRight, 
  User, Award, Check, MessageSquare, Star, 
  Mail, Compass, ArrowRight, Sun, Moon, Globe, X
} from 'lucide-react';

/**
 * Cấu trúc dữ liệu cho một khóa học hiển thị trên trang chủ
 */
interface Course {
  id: string; // Mã định danh duy nhất của khóa học
  title: string; // Tiêu đề khóa học (Tiếng Việt/Hàn tùy locale)
  description: string; // Mô tả ngắn gọn về nội dung và mục tiêu khóa học
  level: string; // Cấp độ TOPIK tương ứng
  thumbnail: string; // URL hình ảnh thu nhỏ đại diện
  weeks: number; // Lộ trình học tính bằng tuần
  lessons: number; // Tổng số bài học
  students: string; // Số lượng học viên đã đăng ký học
}

/**
 * Hệ thống từ khóa đa ngôn ngữ Việt - Hàn phục vụ dịch nội dung trang chủ
 */
const TRANSLATIONS = {
  vi: {
    hero: {
      eyebrow: 'KOREAN LEARNING APPLICATION',
      title: 'Học Tiếng Hàn Online',
      subtitle: 'Từ Sơ Cấp Đến TOPIK II',
      desc: 'Lộ trình học tiếng Hàn toàn diện với video bài giảng chi tiết, bài luyện tập tương tác và flashcard từ vựng thông minh.',
      startBtn: 'Bắt đầu học ngay',
      browseBtn: 'Xem tất cả khóa học',
      checkFree: 'Học miễn phí',
      checkVideo: 'Video bài giảng HD',
      checkPractice: 'Luyện tập tương tác',
      checkProgress: 'Theo dõi tiến độ',
    },
    stats: {
      students: 'Học viên đang học',
      videos: 'Bài học video',
      flashcards: 'Flashcard từ vựng',
      satisfaction: 'Học viên hài lòng',
    },
    courses: {
      eyebrow: 'Khóa học nổi bật',
      title: 'Chọn Lộ Trình Phù Hợp Với Bạn',
      desc: 'Từ người mới bắt đầu đến trình độ thi TOPIK II, chúng tôi có đầy đủ khóa học cho mọi cấp độ với nội dung biên soạn trực quan nhất.',
      all: 'Tất cả',
      topik1: 'TOPIK I',
      topik2: 'TOPIK II',
      weeks: 'tuần',
      lessons: 'bài',
      details: 'Xem chi tiết',
      viewAll: 'Xem tất cả khóa học',
      c1_title: 'Tiếng Hàn Sơ Cấp 1',
      c1_desc: 'Khóa học dành cho người mới bắt đầu học tiếng Hàn. Làm quen với bảng chữ cái Hangeul, phát âm chuẩn và giao tiếp cơ bản hàng ngày.',
      c2_title: 'Tiếng Hàn Sơ Cấp 2',
      c2_desc: 'Củng cố nền tảng tiếng Hàn với cấu trúc ngữ pháp phức tạp hơn, mở rộng từ vựng thông dụng và phát triển kỹ năng nghe - nói phản xạ.',
      c3_title: 'Tiếng Hàn Trung Cấp 3',
      c3_desc: 'Nâng cao khả năng giao tiếp tiếng Hàn tự nhiên trong đời sống xã hội và công việc. Làm quen ngữ pháp trung cấp, từ vựng chuyên sâu.',
    },
    leaderboard: {
      badge: '🏆 Bảng Xếp Hạng',
      title: 'Học Viên Xuất Sắc',
      desc: 'Cùng nhau học tập và leo hạng! Điểm số được tính dựa trên bài học hoàn thành, điểm quiz và streak hàng ngày.',
      week: 'Tuần',
      month: 'Tháng',
      allTime: 'Mọi lúc',
      points: 'điểm',
    },
    testimonials: {
      eyebrow: 'Cảm nhận học viên',
      title: 'Học Viên Nói Gì Về Chúng Tôi',
      desc: 'Hàng nghìn học viên đã tin tưởng và đạt được mục tiêu học tiếng Hàn của mình.',
      t1_course: 'Tiếng Hàn Sơ Cấp 1 (TOPIK I)',
      t1_text: 'Mình bắt đầu từ con số 0, không biết gì về tiếng Hàn. Sau 3 tháng học trên nền tảng này, mình đã có thể đọc và viết Hangeul, giao tiếp cơ bản. Video bài giảng rất dễ hiểu!',
      t2_course: 'Tiếng Hàn Trung Cấp 3 (TOPIK II)',
      t2_text: 'Mình đang chuẩn bị đi du học Hàn Quốc. Khóa học trung cấp giúp mình nâng cao vốn từ vựng và ngữ pháp rất nhiều. Hệ thống flashcard ôn tập hàng ngày giúp nhớ từ rất lâu.',
      t3_course: 'Tiếng Hàn Cao Cấp 5 (TOPIK II)',
      t3_text: 'Đã đạt TOPIK II cấp 4 nhờ luyện thi trên nền tảng này. Các bài luyện tập mô phỏng đề thi thực tế rất hữu ích. Đặc biệt là phần luyện nghe và viết luận.',
    },
    cta: {
      title: 'Bắt Đầu Hành Trình Học Tiếng Hàn Ngay Hôm Tây',
      desc: 'Đăng ký miễn phí và tiếp cận ngay hơn 250 bài học video, hàng nghìn flashcard từ vựng và hệ thống luyện tập tương tác. Không cần thẻ tín dụng.',
      register: 'Đăng ký miễn phí',
      browse: 'Xem khóa học',
      subText: 'Hơn 8.900 học viên đang học · Học miễn phí 100% · Hủy bất cứ lúc nào',
    },
    ai: {
      title: 'Trợ Lý AI Học Tiếng Hàn',
      online: 'Đang trực tuyến',
      welcome: 'Xin chào! Mình là trợ lý AI của Hàn Quốc Học. Bạn cần mình giải đáp thắc mắc gì về ngữ pháp hay từ vựng tiếng Hàn hôm nay không?',
      placeholder: 'Hỏi từ vựng, ngữ pháp...',
      send: 'Gửi',
      response: 'Cảm ơn bạn! Câu hỏi "{query}" đang được hệ thống phân tích. Bạn có thể nhấn Đăng ký miễn phí tài khoản để thảo luận trực tiếp với giáo viên bản xứ nhé!',
    }
  },
  ko: {
    hero: {
      eyebrow: 'KOREAN LEARNING APPLICATION',
      title: '온라인 한국어 학습',
      subtitle: '초급부터 TOPIK II까지',
      desc: '상세한 비디오 강의, 대화형 연습 문제, 스마트 단어 플래시카드를 통한 포괄적인 한국어 학습 로드맵입니다.',
      startBtn: '지금 학습 시작',
      browseBtn: '모든 강의 보기',
      checkFree: '무료 학습',
      checkVideo: 'HD 비디오 강의',
      checkPractice: '대화형 실습',
      checkProgress: '학습 진도 추적',
    },
    stats: {
      students: '수강생 수',
      videos: '비디오 강의 수',
      flashcards: '어휘 플래시카드',
      satisfaction: '학생 만족도',
    },
    courses: {
      eyebrow: '추천 강좌',
      title: '나에게 맞는 로드맵 선택',
      desc: '초급자부터 TOPIK II 시험 대비까지, 가장 직관적인 내용으로 구성된 모든 레벨 của 강좌가 준비되어 있습니다.',
      all: '전체',
      topik1: 'TOPIK I',
      topik2: 'TOPIK II',
      weeks: '주',
      lessons: '강',
      details: '상세 보기',
      viewAll: '모든 강좌 보기',
      c1_title: '초급 한국어 1',
      c1_desc: '한국어를 처음 시작하는 학습자를 위한 강좌입니다. 한글 자모음, 정확한 발음, 일상 생활 기본 대화를 배웁니다.',
      c2_title: '초급 한국어 2',
      c2_desc: '보다 복잡한 문법 구조로 한국어 기초를 다지고, 자주 쓰이는 어휘를 확장하며 말하기/듣기 능력을 kiêu갑니다.',
      c3_title: '중급 한국어 3',
      c3_desc: '사회 생활 및 업무에서 자연스럽게 한국어로 소통하는 능력을 기릅니다. 중급 문법과 전문 어휘를 학습합니다.',
    },
    leaderboard: {
      badge: '🏆 명예의 전당',
      title: '우수 학생 랭킹',
      desc: '함께 공부하고 랭킹을 올리세요! 점수는 완료한 학습, 퀴즈 점수, 일일 스트릭을 기반으로 계산됩니다.',
      week: '주간',
      month: '월간',
      allTime: '전체',
      points: '점',
    },
    testimonials: {
      eyebrow: '수강생 한마디',
      title: '학생들의 솔직한 후기',
      desc: '수천 명의 학생들이 우리 플랫폼을 믿고 한국어 학습 목표를 달성했습니다.',
      t1_course: '초급 한국어 1 (TOPIK I)',
      t1_text: '한글도 모르고 시작했는데, 3개월 만에 쓰고 읽는 것은 물론 일상 회화도 가능해졌습니다. 비디오 강의가 정말 이해하기 쉽습니다!',
      t2_course: '중급 한국어 3 (TOPIK II)',
      t2_text: '한국 유학을 준비 중입니다. 중급 강좌를 통해 어휘와 문법 실력이 몰라보게 늘었습니다. 플래시카드 시스템 덕분에 단어를 오래 기억합니다.',
      t3_course: '고급 한국어 5 (TOPIK II)',
      t3_text: '이 사이트에서 모의고사를 풀고 TOPIK II 4급을 취득했습니다. 실제 시험과 유사한 연습 vấn đề이 큰 도움이 되었습니다. 특히 듣기와 쓰기 영역이 좋습니다.',
    },
    cta: {
      title: '오늘 바로 한국어 학습 여정을 시작하세요',
      desc: '무료로 가입하고 250개 이상의 비디오 강의, 수만 개의 단어 플래시카드, 대화형 학습 시스템을 즉시 이용하세요. 신용카드가 필요 없습니다.',
      register: '무료 회원가입',
      browse: '강좌 살펴보기',
      subText: '8,900명 이상의 학생 학습 중 · 100% 무료 · 언제든지 취소 가능',
    },
    ai: {
      title: 'AI 한국어 튜터',
      online: '온라인',
      welcome: '안녕하세요! 한국어학당 AI 튜터입니다. 오늘 한국어 문법이나 어휘에 대해 궁금한 점이 있으신가요?',
      placeholder: '어휘, 문법 질문하기...',
      send: '전송',
      response: '감사합니다! "{query}" 질문을 분석 중입니다. 원어민 선생님과 직접 소통하고 싶으시면 무료 회원가입을 완료해 주세요!',
    }
  }
};

/**
 * Component Client render giao diện chính của Trang chủ.
 * Kế thừa phong cách Red & Cream Hàn Quốc Học siêu đẹp từ dự án Web.
 */
export default function HomePageClient() {
  // Trạng thái ngôn ngữ hiện tại của trang chủ ('vi': Tiếng Việt, 'ko': Tiếng Hàn)
  const [locale, setLocale] = useState<'vi' | 'ko'>('vi');
  
  // Tab khóa học đang hoạt động ('ALL', 'TOPIK1', 'TOPIK2')
  const [activeTab, setActiveTab] = useState<'ALL' | 'TOPIK1' | 'TOPIK2'>('ALL');
  
  // Tab bảng xếp hạng đang chọn ('WEEK', 'MONTH', 'ALLTIME')
  const [leaderboardTab, setLeaderboardTab] = useState<'WEEK' | 'MONTH' | 'ALLTIME'>('WEEK');
  
  // Trạng thái ẩn/hiện popup chat với AI hỗ trợ học tập
  const [showChatPopup, setShowChatPopup] = useState(false);
  
  // Tin nhắn người dùng nhập vào ô chat AI
  const [chatMessage, setChatMessage] = useState('');
  
  // Lịch sử tin nhắn hội thoại giữa người dùng và AI
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'USER' | 'AI'; text: string }>>([]);

  /**
   * Hàm dịch nhanh dựa trên locale nội bộ của component
   * @param path - Đường dẫn tới từ khóa dịch (ví dụ: 'hero.title')
   * @returns Chuỗi bản dịch tương ứng
   */
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

  // Đồng bộ ngôn ngữ từ localStorage khi mount component
  useEffect(() => {
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale === 'vi' || storedLocale === 'ko') {
      setLocale(storedLocale);
    }
  }, []);

  // Khởi tạo lời chào của AI khi thay đổi ngôn ngữ
  useEffect(() => {
    setChatHistory([
      { sender: 'AI', text: t('ai.welcome') }
    ]);
  }, [locale]);

  /**
   * Tạo đường dẫn định tuyến động theo locale cho các trang chức năng của App
   * @param action - Trang đích (ví dụ: 'login', 'register', 'courses')
   * @returns Đường dẫn URL đã được bọc locale tương thích (ví dụ: '/vn/login')
   */
  const getAuthLink = (action: string): string => {
    const appLocale = locale === 'vi' ? 'vn' : 'en';
    return `/${appLocale}/${action}`;
  };

  /**
   * Xử lý gửi tin nhắn tới AI Chatbot và phản hồi giả lập
   * @param e - Sự kiện Form submit
   */
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

  // Lọc khóa học theo tab hoạt động
  const filteredCourses = mockCourses(t).filter(course => {
    if (activeTab === 'TOPIK1') return course.level.includes('TOPIK I');
    if (activeTab === 'TOPIK2') return course.level.includes('TOPIK II');
    return true;
  });

  return (
    <main className="min-h-screen bg-warmCream dark:bg-stone-950 text-charcoal dark:text-stone-100 flex flex-col font-sans transition-colors duration-300 selection:bg-koreanRed-light selection:text-koreanRed overflow-x-hidden">
      
      {/* Nút chuyển đổi nhanh Ngôn ngữ (Đặt khéo léo góc trang chủ) */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full flex justify-end gap-3 pt-6 pb-2">
        <div className="flex items-center border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden p-0.5 bg-white dark:bg-stone-900 shadow-sm">
          <button 
            onClick={() => { setLocale('vi'); localStorage.setItem('locale', 'vi'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              locale === 'vi' 
                ? 'bg-koreanRed text-white shadow-sm' 
                : 'text-charcoal-muted dark:text-stone-400 hover:text-charcoal'
            }`}
          >
            VI
          </button>
          <button 
            onClick={() => { setLocale('ko'); localStorage.setItem('locale', 'ko'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              locale === 'ko' 
                ? 'bg-koreanRed text-white shadow-sm' 
                : 'text-charcoal-muted dark:text-stone-400 hover:text-charcoal'
            }`}
          >
            KO
          </button>
        </div>
      </div>

      {/* 1. Hero Section (SEOUL SUNSET BACKGROUND OVERLAY) */}
      <section className="hero-seoul-sunset relative w-full min-h-[580px] flex items-center justify-center text-center px-6 py-20">
        <div className="hero-content max-w-5xl mx-auto flex flex-col items-center animate-fade-in-up">
          <span className="hero-eyebrow text-amber-350 dark:text-amber-400 font-bold tracking-[0.2em] text-xs uppercase mb-5 font-mono">
            {t('hero.eyebrow')}
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-none mb-3">
            {t('hero.title')}
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-250 dark:text-amber-300 mb-8">
            {t('hero.subtitle')}
          </h2>
          <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mb-10 font-medium">
            {t('hero.desc')}
          </p>

          {/* Hero CTAs - Điều hướng đến route thực tế */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14 w-full sm:w-auto justify-center">
            <Link 
              href={getAuthLink('register')}
              className="btn-primary text-base font-bold py-4 px-10 text-center active:scale-95 shadow-lg shadow-koreanRed/20"
            >
              {t('hero.startBtn')}
            </Link>
            <a href="#courses" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-base font-bold py-4 px-10 rounded-xl transition-all active:scale-95 text-center flex items-center justify-center">
              {t('hero.browseBtn')}
            </a>
          </div>

          {/* Hero Checkmarks */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-white/95 text-sm font-semibold">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Check size={12} strokeWidth={3} className="text-koreanRed" />
              </div>
              <span>{t('hero.checkFree')}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Check size={12} strokeWidth={3} className="text-koreanRed" />
              </div>
              <span>{t('hero.checkVideo')}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Check size={12} strokeWidth={3} className="text-koreanRed" />
              </div>
              <span>{t('hero.checkPractice')}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Check size={12} strokeWidth={3} className="text-koreanRed" />
              </div>
              <span>{t('hero.checkProgress')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="relative px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto -mt-12 z-10 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          <div className="card-soft flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-soft-lg transform hover:-translate-y-1 transition-all duration-300">
            <span className="text-3xl md:text-5xl font-extrabold text-koreanRed dark:text-red-500 tracking-tight">8.900+</span>
            <span className="text-xs md:text-sm font-semibold text-charcoal-muted dark:text-stone-400 mt-2.5">{t('stats.students')}</span>
          </div>
          <div className="card-soft flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-soft-lg transform hover:-translate-y-1 transition-all duration-300">
            <span className="text-3xl md:text-5xl font-extrabold text-koreanRed dark:text-red-500 tracking-tight">250+</span>
            <span className="text-xs md:text-sm font-semibold text-charcoal-muted dark:text-stone-400 mt-2.5">{t('stats.videos')}</span>
          </div>
          <div className="card-soft flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-soft-lg transform hover:-translate-y-1 transition-all duration-300">
            <span className="text-3xl md:text-5xl font-extrabold text-koreanRed dark:text-red-500 tracking-tight">12.000+</span>
            <span className="text-xs md:text-sm font-semibold text-charcoal-muted dark:text-stone-400 mt-2.5">{t('stats.flashcards')}</span>
          </div>
          <div className="card-soft flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-soft-lg transform hover:-translate-y-1 transition-all duration-300">
            <span className="text-3xl md:text-5xl font-extrabold text-koreanRed dark:text-red-500 tracking-tight">95%</span>
            <span className="text-xs md:text-sm font-semibold text-charcoal-muted dark:text-stone-400 mt-2.5">{t('stats.satisfaction')}</span>
          </div>
        </div>
      </section>

      {/* 3. Featured Courses Section */}
      <section id="courses" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto w-full">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-koreanRed dark:text-red-400 block font-bold text-xs uppercase tracking-widest mb-3 font-mono">
            {t('courses.eyebrow')}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-charcoal dark:text-stone-100 tracking-tight">
            {t('courses.title')}
          </h2>
          <p className="text-sm md:text-base text-charcoal-muted dark:text-stone-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            {t('courses.desc')}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-12">
          <button 
            onClick={() => setActiveTab('ALL')}
            className={`px-7 py-3 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 ${
              activeTab === 'ALL' 
                ? 'bg-koreanRed text-white shadow-md shadow-koreanRed/15' 
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-charcoal-muted dark:text-stone-300 hover:border-koreanRed'
            }`}
          >
            {t('courses.all')}
          </button>
          <button 
            onClick={() => setActiveTab('TOPIK1')}
            className={`px-7 py-3 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 ${
              activeTab === 'TOPIK1' 
                ? 'bg-koreanRed text-white shadow-md shadow-koreanRed/15' 
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-charcoal-muted dark:text-stone-300 hover:border-koreanRed'
            }`}
          >
            {t('courses.topik1')}
          </button>
          <button 
            onClick={() => setActiveTab('TOPIK2')}
            className={`px-7 py-3 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 ${
              activeTab === 'TOPIK2' 
                ? 'bg-koreanRed text-white shadow-md shadow-koreanRed/15' 
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-charcoal-muted dark:text-stone-300 hover:border-koreanRed'
            }`}
          >
            {t('courses.topik2')}
          </button>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <article key={course.id} className="course-card group flex flex-col h-full bg-white dark:bg-stone-900 rounded-2xl shadow-soft border border-stone-100 dark:border-stone-800/60">
              <div className="course-image-container relative aspect-video bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <span className={`inline-flex self-start px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-4 ${
                  course.level.includes('TOPIK I') 
                    ? 'bg-emerald-pastel-bg text-emerald-pastel-text dark:bg-emerald-950/50 dark:text-emerald-400' 
                    : 'bg-amber-pastel-bg text-amber-pastel-text dark:bg-amber-950/50 dark:text-amber-400'
                }`}>
                  {course.level}
                </span>

                <h3 className="text-lg font-bold text-charcoal dark:text-stone-100 leading-snug group-hover:text-koreanRed dark:group-hover:text-red-400 transition-colors mb-2.5">
                  {course.title}
                </h3>
                
                <p className="text-sm text-charcoal-muted dark:text-stone-300 leading-relaxed mb-6 flex-grow">
                  {course.description}
                </p>

                <div className="flex items-center justify-between border-t border-stone-100 dark:border-stone-800 pt-4 mt-auto">
                  <div className="flex items-center gap-1.5 text-xs text-charcoal-muted dark:text-stone-400 font-semibold">
                    <BookOpen size={14} />
                    <span>{course.weeks} {t('courses.weeks')} · {course.lessons} {t('courses.lessons')}</span>
                  </div>
                  <Link 
                    href={getAuthLink('courses')}
                    className="inline-flex items-center gap-1 py-2 px-4 rounded-xl text-xs font-bold bg-warmCream dark:bg-stone-950 hover:bg-koreanRed-light dark:hover:bg-koreanRed/20 hover:text-koreanRed dark:hover:text-red-400 text-charcoal-muted dark:text-stone-300 transition-all active:scale-95"
                  >
                    <span>{t('courses.details')}</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-14">
          <Link 
            href={getAuthLink('courses')}
            className="btn-primary inline-flex items-center gap-2 py-4 px-10 text-base font-bold active:scale-95 shadow-lg shadow-koreanRed/15"
          >
            <span>{t('courses.viewAll')}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* 4. Leaderboard Section */}
      <section id="leaderboard" className="py-24 px-6 md:px-12 lg:px-20 bg-white dark:bg-stone-950 border-t border-stone-200/40 dark:border-stone-800 transition-colors duration-300 w-full">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-flex bg-emerald-pastel-bg text-emerald-pastel-text dark:bg-emerald-950/50 dark:text-emerald-400 font-bold py-1.5 px-4 rounded-full text-xs uppercase tracking-wider mb-3">
              {t('leaderboard.badge')}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-charcoal dark:text-stone-100 tracking-tight">
              {t('leaderboard.title')}
            </h2>
            <p className="text-sm md:text-base text-charcoal-muted dark:text-stone-300 mt-4 max-w-2xl mx-auto leading-relaxed">
              {t('leaderboard.desc')}
            </p>
          </div>

          {/* Leaderboard Tabs */}
          <div className="flex justify-center gap-3 mb-16">
            <button 
              onClick={() => setLeaderboardTab('WEEK')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                leaderboardTab === 'WEEK' 
                  ? 'bg-koreanRed text-white shadow-md' 
                  : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-charcoal-muted dark:text-stone-300 hover:border-koreanRed'
              }`}
            >
              {t('leaderboard.week')}
            </button>
            <button 
              onClick={() => setLeaderboardTab('MONTH')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                leaderboardTab === 'MONTH' 
                  ? 'bg-koreanRed text-white shadow-md' 
                  : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-charcoal-muted dark:text-stone-300 hover:border-koreanRed'
              }`}
            >
              {t('leaderboard.month')}
            </button>
            <button 
              onClick={() => setLeaderboardTab('ALLTIME')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                leaderboardTab === 'ALLTIME' 
                  ? 'bg-koreanRed text-white shadow-md' 
                  : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-charcoal-muted dark:text-stone-300 hover:border-koreanRed'
              }`}
            >
              {t('leaderboard.allTime')}
            </button>
          </div>

          {/* Podium layout */}
          <div className="flex flex-col md:flex-row items-end justify-center gap-6 max-w-4xl mx-auto w-full">
            {/* Vị trí thứ 2 */}
            <div className="w-full md:w-1/3 card-soft bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 text-center p-8 flex flex-col items-center order-2 md:order-1 animate-fade-in-up">
              <div className="relative mb-5">
                <img 
                  src={leaderboardData[1].avatar} 
                  alt={leaderboardData[1].name} 
                  className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-stone-800 shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  2
                </div>
              </div>
              <h3 className="font-bold text-charcoal dark:text-stone-100 text-lg mb-1">{leaderboardData[1].name}</h3>
              <span className="text-xs font-semibold text-charcoal-muted dark:text-stone-400 mb-4">{leaderboardData[1].level}</span>
              <span className="text-emerald-pastel-text dark:text-emerald-400 bg-emerald-pastel-bg dark:bg-emerald-950/40 font-bold px-4 py-1.5 rounded-lg text-sm flex items-center gap-1.5">
                🔥 {leaderboardData[1].score} {t('leaderboard.points')}
              </span>
            </div>

            {/* Vị trí thứ 1 */}
            <div className="w-full md:w-1/3 card-soft bg-white dark:bg-stone-900 border-2 border-emerald-pastel-text dark:border-emerald-500 text-center p-10 flex flex-col items-center order-1 md:order-2 shadow-soft-lg transform md:-translate-y-4 animate-fade-in-up">
              <div className="relative mb-5">
                <img 
                  src={leaderboardData[0].avatar} 
                  alt={leaderboardData[0].name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-stone-800 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 bg-emerald-pastel-text dark:bg-emerald-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md">
                  1
                </div>
              </div>
              <h3 className="font-extrabold text-charcoal dark:text-stone-100 text-xl mb-1">{leaderboardData[0].name}</h3>
              <span className="text-xs font-semibold text-charcoal-muted dark:text-stone-400 mb-4">{leaderboardData[0].level}</span>
              <span className="text-white dark:text-stone-950 bg-emerald-pastel-text dark:bg-emerald-400 font-bold px-5 py-2 rounded-lg text-sm flex items-center gap-1.5 shadow-md shadow-emerald-700/10">
                🔥 {leaderboardData[0].score} {t('leaderboard.points')}
              </span>
            </div>

            {/* Vị trí thứ 3 */}
            <div className="w-full md:w-1/3 card-soft bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 text-center p-8 flex flex-col items-center order-3 md:order-3 animate-fade-in-up">
              <div className="relative mb-5">
                <img 
                  src={leaderboardData[2].avatar} 
                  alt={leaderboardData[2].name} 
                  className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-stone-800 shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 bg-red-400 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  3
                </div>
              </div>
              <h3 className="font-bold text-charcoal dark:text-stone-100 text-lg mb-1">{leaderboardData[2].name}</h3>
              <span className="text-xs font-semibold text-charcoal-muted dark:text-stone-400 mb-4">{leaderboardData[2].level}</span>
              <span className="text-emerald-pastel-text dark:text-emerald-400 bg-emerald-pastel-bg dark:bg-emerald-950/40 font-bold px-4 py-1.5 rounded-lg text-sm flex items-center gap-1.5">
                🔥 {leaderboardData[2].score} {t('leaderboard.points')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 md:px-12 lg:px-20 bg-warmCream dark:bg-stone-950 transition-colors duration-300 w-full">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-koreanRed dark:text-red-400 block font-bold text-xs uppercase tracking-widest mb-3 font-mono">
              {t('testimonials.eyebrow')}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-charcoal dark:text-stone-100 tracking-tight">
              {t('testimonials.title')}
            </h2>
            <p className="text-sm md:text-base text-charcoal-muted dark:text-stone-300 mt-4 max-w-2xl mx-auto leading-relaxed">
              {t('testimonials.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials(t).map((tItem, idx) => (
              <div key={idx} className="card-soft p-8 bg-white dark:bg-stone-900/60 border border-stone-200/40 dark:border-stone-850 hover:border-koreanRed/20 dark:hover:border-red-500/20 flex flex-col justify-between h-full animate-fade-in-up">
                <div>
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#D97706" color="#D97706" />
                    ))}
                  </div>
                  <p className="text-charcoal-muted dark:text-stone-300 text-sm leading-relaxed italic mb-8">
                    “{tItem.text}”
                  </p>
                </div>

                <div className="flex items-center gap-3.5 border-t border-stone-200/60 dark:border-stone-800 pt-5 mt-auto">
                  <img src={tItem.avatar} alt={tItem.name} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-charcoal dark:text-stone-100 text-sm">{tItem.name}</h4>
                    <span className="text-[11px] font-semibold text-charcoal-muted dark:text-stone-400 mt-0.5 block">{tItem.course}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="bg-koreanRed py-20 px-6 md:px-12 lg:px-20 text-white text-center relative overflow-hidden w-full">
        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-2xl mb-10 font-medium">
            {t('cta.desc')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full sm:w-auto justify-center">
            <Link 
              href={getAuthLink('register')}
              className="bg-white text-koreanRed font-extrabold py-4 px-10 rounded-xl text-base transition-all hover:bg-stone-50 active:scale-95 shadow-lg shadow-black/10"
            >
              {t('cta.register')}
            </Link>
            <Link 
              href={getAuthLink('courses')}
              className="bg-koreanRed border border-white/30 hover:border-white text-white font-extrabold py-4 px-10 rounded-xl text-base transition-all active:scale-95"
            >
              {t('cta.browse')}
            </Link>
          </div>

          <span className="text-xs text-white/70 font-semibold tracking-wider block">
            {t('cta.subText')}
          </span>
        </div>
      </section>

      {/* 7. AI Assistant Chat Bubble Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button 
          onClick={() => setShowChatPopup(!showChatPopup)}
          className="w-14 h-14 rounded-full bg-koreanRed text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse-glow"
          title="Trợ lý AI tiếng Hàn"
        >
          {showChatPopup ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>

      {/* 8. AI Chat Popup Modal */}
      {showChatPopup && (
        <div className="fixed bottom-24 right-6 w-[360px] h-[480px] bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-850 shadow-2xl z-40 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-koreanRed p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="font-bold text-sm">한</span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-none">{t('ai.title')}</h4>
                <span className="text-[10px] text-white/80 font-medium block mt-1">{t('ai.online')}</span>
              </div>
            </div>
            <button onClick={() => setShowChatPopup(false)} className="text-white/80 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Messages track */}
          <div className="flex-grow p-4 overflow-y-auto bg-warmCream/20 dark:bg-stone-950/20 flex flex-col gap-3 custom-scrollbar">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'USER' 
                    ? 'bg-koreanRed text-white rounded-tr-none' 
                    : 'bg-white dark:bg-stone-800 text-charcoal dark:text-stone-100 border border-stone-200/60 dark:border-stone-850/80 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input field Form */}
          <form onSubmit={handleSendChatMessage} className="p-3 border-t border-stone-100 dark:border-stone-800 flex gap-2">
            <input 
              type="text" 
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder={t('ai.placeholder')} 
              className="flex-grow px-4 py-2 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:border-koreanRed dark:bg-stone-950 dark:text-white"
            />
            <button 
              type="submit" 
              className="px-4 bg-koreanRed text-white rounded-xl text-sm font-semibold hover:bg-koreanRed-hover active:scale-95 transition-all"
            >
              {t('ai.send')}
            </button>
          </form>
        </div>
      )}

    </main>
  );
}

/**
 * Hàm sinh dữ liệu mock cho các khóa học tương thích đa ngôn ngữ
 * @param t - Hàm dịch từ khóa
 * @returns Danh sách các khóa học đã được dịch
 */
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

// Bảng xếp hạng học viên xuất sắc (Dữ liệu tĩnh)
const leaderboardData = [
  { rank: 1, name: 'Vũ Thị Linh', level: 'TOPIK II Cấp 3', score: 485, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
  { rank: 2, name: 'Phạm Thanh Mai', level: 'TOPIK I Cấp 2', score: 420, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
  { rank: 3, name: 'Đặng Minh Tâm', level: 'TOPIK I Cấp 2', score: 375, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80' }
];

/**
 * Hàm sinh dữ liệu cảm nhận học viên tương thích đa ngôn ngữ
 * @param t - Hàm dịch từ khóa
 * @returns Danh sách các cảm nhận đã được dịch
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
