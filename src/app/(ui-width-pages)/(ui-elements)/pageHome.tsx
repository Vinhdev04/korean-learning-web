

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import CountUpNumber from '@/components/common/CountUpNumber';
import { 
  Flame, BookOpen, ChevronRight, Check, X, ArrowUp, 
  MessageSquare, Star, Lock, Mail, Compass, ArrowRight, User,
  Play, Layers, CheckSquare, BarChart2, PenTool, Award
} from 'lucide-react';

/**
 * Định nghĩa cấu trúc dữ liệu khóa học
 */
interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  thumbnail: string;
  weeks: number;
  lessons: number;
  students: string;
}

/**
 * Hệ thống từ khóa đa ngôn ngữ Việt - Hàn cho trang chủ
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
      t3_text: 'Đạt TOPIK II cấp 4 nhờ luyện thi trên nền tảng này. Các bài luyện tập mô phỏng đề thi thực tế rất hữu ích. Đặc biệt là phần luyện nghe và viết luận.',
    },
    cta: {
      title: 'Bắt Đầu Hành Trình Học Tiếng Hàn Ngay Hôm Nay',
      desc: 'Đăng ký miễn phí và tiếp cận ngay hơn 250 bài học video, hàng nghìn flashcard từ vựng và hệ thống luyện tập tương tác. Không cần thẻ tín dụng.',
      register: 'Đăng ký miễn phí',
      browse: 'Xem khóa học',
      subText: 'Hơn 8.900 học viên đang học · Học miễn phí 100% · Hủy bất cứ lúc nào',
    },
    auth: {
      registerTitle: 'Đăng ký tài khoản miễn phí',
      registerDesc: 'Bắt đầu hành trình chinh phục tiếng Hàn ngay hôm nay.',
      loginTitle: 'Đăng nhập học viên',
      loginDesc: 'Chào mừng bạn quay lại học tập!',
      fullName: 'Họ và tên',
      email: 'Địa chỉ Email',
      password: 'Mật khẩu',
      submitRegister: 'Đăng ký học ngay',
      submitLogin: 'Đăng nhập',
      hasAccount: 'Bạn đã có tài khoản?',
      noAccount: 'Bạn chưa có tài khoản?',
      loginNow: 'Đăng nhập ngay',
      registerNow: 'Đăng ký ngay',
    },
    ai: {
      title: 'Trợ Lý AI Học Tiếng Hàn',
      online: 'Đang trực tuyến',
      welcome: 'Xin chào! Mình là trợ lý AI của Hàn Quốc Học. Bạn cần mình giải đáp thắc mắc gì về ngữ pháp hay từ vựng tiếng Hàn hôm nay không?',
      placeholder: 'Hỏi từ vựng, ngữ pháp...',
      send: 'Gửi',
      response: 'Cảm ơn bạn! Câu hỏi "{query}" đang được hệ thống phân tích. Bạn có thể nhấn Đăng ký miễn phí tài khoản để thảo luận trực tiếp với giáo viên bản xứ nhé!',
    },
    promo: {
      badge: '🎁 QUÀ TẶNG THÀNH VIÊN MỚI',
      title: 'Học Thử Tiếng Hàn Miễn Phí!',
      desc: 'Đăng ký tài khoản hôm nay để mở khóa trọn bộ 250+ bài học video chất lượng cao, 12.000+ flashcard từ vựng thông minh và theo dõi lộ trình học cá nhân hóa 100%.',
      btn: 'Đăng ký học ngay',
      cancel: 'Để sau',
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
      c2_desc: '보다 복잡한 문법 구조로 한국어 기초를 다지고, 자주 쓰이는 어휘를 확장하며 말하기/듣기 능력을 키웁니다.',
      c3_title: '중급 한국어 3',
      c3_desc: '사회 생활 및 업무에서 자연스럽게 한국어로 소통하는 능력을 기릅니다. 중급 문법 và 전문 어휘를 학습합니다.',
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
    auth: {
      registerTitle: '무료 회원가입',
      registerDesc: '오늘부터 한국어 마스터를 향한 도전을 시작해보세요.',
      loginTitle: '학생 로그인',
      loginDesc: '공부를 계속하기 위해 로그인하세요!',
      fullName: '이름',
      email: '이메일 주소',
      password: '비밀번호',
      submitRegister: '지금 시작하기',
      submitLogin: '로그인',
      hasAccount: '이미 계정이 있으신가요?',
      noAccount: '아직 계정이 없으신가요?',
      loginNow: '지금 로그인',
      registerNow: '지금 회원가입',
    },
    ai: {
      title: 'AI 한국어 튜터',
      online: '온라인',
      welcome: '안녕하세요! 한국어학당 AI 튜터입니다. 오늘 한국어 문법이나 어휘에 대해 궁금한 점이 있으신가요?',
      placeholder: '어휘, 문법 질문하기...',
      send: '전송',
      response: '감사합니다! "{query}" 질문을 분석 중입니다. 원어민 선생님과 직접 소통하고 싶으시면 무료 회원가입을 완료해 주세요!',
    },
    promo: {
      badge: '🎁 신규 회원 혜택',
      title: '한국어 무료 체험 학습!',
      desc: '지금 회원가입하고 250개 이상의 고품질 비디오 강의, 12,000개 이상의 스마트 단어 플래시카드 및 100% 개인 맞춤형 학습 로드맵을 잠금 해제하세요.',
      btn: '지금 가입하기',
      cancel: '나중에',
    }
  }
};

/**
 * Component Trang chủ Client (phong cách Korean Red / Seoul Sunset).
 */
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
      
      {/* 1. Hero Section */}
      <section className="hero-seoul-sunset relative w-full min-h-[580px] flex items-center justify-center text-center px-6 py-20">
        <div className="hero-content max-w-5xl mx-auto flex flex-col items-center animate-fade-in-up">
          {/* OLD:
          <span className="text-amber-300 dark:text-amber-400 font-bold tracking-[0.2em] text-xs uppercase mb-5 font-mono">
            {t('hero.eyebrow')}
          </span>
          */}
          <span className="text-amber-400/90 font-semibold tracking-wide text-xs md:text-sm uppercase mb-4 font-mono">
            한국어를 배우는 가장 좋은 방법
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-none mb-3">
            {t('hero.title')}
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-200 dark:text-amber-300 mb-8">
            {t('hero.subtitle')}
          </h2>
          <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mb-10 font-medium">
            {t('hero.desc')}
          </p>

          {/* Hero CTAs */}
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
      <section className="relative px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto -mt-12 z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          <div className="card-soft flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-soft-lg transform hover:-translate-y-1 transition-all duration-300">
            {/* OLD: <span className="text-3xl md:text-5xl font-extrabold text-koreanRed dark:text-red-500 tracking-tight">8.900+</span> */}
            <span className="text-3xl md:text-5xl font-extrabold text-koreanRed dark:text-red-500 tracking-tight">
              <CountUpNumber value={8900} suffix="+" />
            </span>
            <span className="text-xs md:text-sm font-semibold text-charcoal-muted dark:text-stone-400 mt-2.5">{t('stats.students')}</span>
          </div>
          <div className="card-soft flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-soft-lg transform hover:-translate-y-1 transition-all duration-300">
            {/* OLD: <span className="text-3xl md:text-5xl font-extrabold text-koreanRed dark:text-red-500 tracking-tight">250+</span> */}
            <span className="text-3xl md:text-5xl font-extrabold text-koreanRed dark:text-red-500 tracking-tight">
              <CountUpNumber value={250} suffix="+" />
            </span>
            <span className="text-xs md:text-sm font-semibold text-charcoal-muted dark:text-stone-400 mt-2.5">{t('stats.videos')}</span>
          </div>
          <div className="card-soft flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-soft-lg transform hover:-translate-y-1 transition-all duration-300">
            {/* OLD: <span className="text-3xl md:text-5xl font-extrabold text-koreanRed dark:text-red-500 tracking-tight">12.000+</span> */}
            <span className="text-3xl md:text-5xl font-extrabold text-koreanRed dark:text-red-500 tracking-tight">
              <CountUpNumber value={12000} suffix="+" />
            </span>
            <span className="text-xs md:text-sm font-semibold text-charcoal-muted dark:text-stone-400 mt-2.5">{t('stats.flashcards')}</span>
          </div>
          <div className="card-soft flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-soft-lg transform hover:-translate-y-1 transition-all duration-300">
            {/* OLD: <span className="text-3xl md:text-5xl font-extrabold text-koreanRed dark:text-red-500 tracking-tight">95%</span> */}
            <span className="text-3xl md:text-5xl font-extrabold text-koreanRed dark:text-red-500 tracking-tight">
              <CountUpNumber value={95} suffix="%" />
            </span>
            <span className="text-xs md:text-sm font-semibold text-charcoal-muted dark:text-stone-400 mt-2.5">{t('stats.satisfaction')}</span>
          </div>
        </div>
      </section>

      {/* 3. Featured Courses Section */}
      <section id="courses" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-koreanRed dark:text-red-400 block font-bold text-xs uppercase tracking-widest mb-3 font-mono">
            {t('courses.eyebrow')}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-charcoal dark:text-stone-100 tracking-tight">
            {t('courses.title')}
          </h2>
          <p className="text-sm md:text-base text-charcoal-muted dark:text-stone-400 max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
            {t('courses.desc')}
          </p>

          {/* Tabs Filter */}
          <div className="flex justify-center items-center gap-3 mt-10">
            <button 
              onClick={() => setActiveTab('ALL')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'ALL' 
                  ? 'bg-koreanRed text-white shadow-md shadow-koreanRed/15' 
                  : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-charcoal dark:text-stone-300 hover:bg-stone-50'
              }`}
            >
              {t('courses.all')}
            </button>
            <button 
              onClick={() => setActiveTab('TOPIK1')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'TOPIK1' 
                  ? 'bg-koreanRed text-white shadow-md shadow-koreanRed/15' 
                  : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-charcoal dark:text-stone-300 hover:bg-stone-50'
              }`}
            >
              {t('courses.topik1')}
            </button>
            <button 
              onClick={() => setActiveTab('TOPIK2')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'TOPIK2' 
                  ? 'bg-koreanRed text-white shadow-md shadow-koreanRed/15' 
                  : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-charcoal dark:text-stone-300 hover:bg-stone-50'
              }`}
            >
              {t('courses.topik2')}
            </button>
          </div>
        </div>

        {/* Grid Courses */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            // Xác định màu nền pastel cho tag TOPIK dựa trên cấp độ
            const isTopik2 = course.level.includes('TOPIK II');
            const tagStyle = isTopik2
              ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400'
              : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400';
            
            // Lấy nhãn rút gọn (TOPIK I / TOPIK II)
            const cleanTag = course.level.split(' - ')[0];

            // Ánh xạ tên tiếng Hàn tương ứng của khóa học hiển thị nhỏ phía trên tiêu đề chính
            const subTitleKo = course.id === 'c1' 
              ? '한국어 초급 1' 
              : course.id === 'c2' 
                ? '한국어 초급 2' 
                : '한국어 중급 3';

            return (
              <div key={course.id} className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden shadow-soft border border-stone-150/40 dark:border-stone-800/80 group hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                {/* OLD:
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <Image 
                    src={course.thumbnail} 
                    alt={course.title}
                    fill
                    sizes="(max-w-768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-koreanRed text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide">
                    {course.level}
                  </span>
                </div>
                */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <Image 
                    src={course.thumbnail} 
                    alt={course.title}
                    fill
                    sizes="(max-w-768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Tag TOPIK màu pastel góc trên trái */}
                  <span className={`absolute top-4 left-4 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide shadow-sm ${tagStyle}`}>
                    {cleanTag}
                  </span>
                  {/* Lớp overlay đen mờ ở cạnh dưới thumbnail hiển thị thời gian học */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-8 z-10">
                    <span className="text-white text-[11px] font-bold">
                      {course.weeks} {t('courses.weeks')} · {course.lessons} {t('courses.lessons')}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  {/* Tiêu đề tiếng Hàn nhỏ mờ */}
                  <span className="text-[10px] text-charcoal-light dark:text-stone-500 font-bold tracking-wider uppercase mb-1 block">
                    {subTitleKo}
                  </span>
                  <h3 className="text-lg font-bold text-charcoal dark:text-stone-100 group-hover:text-koreanRed transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-charcoal-muted dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed font-medium">
                    {course.description}
                  </p>
                  
                  {/* OLD:
                  <div className="mt-6 flex items-center justify-between border-t border-stone-100 dark:border-stone-800 pt-4 text-[11px] font-bold text-charcoal-muted dark:text-stone-400">
                    <span>{course.weeks} {t('courses.weeks')} · {course.lessons} {t('courses.lessons')}</span>
                    <span>{course.students} học viên</span>
                  </div>
                  <div className="mt-4 pt-1">
                    <Link 
                      href={`/vn/courses`}
                      className="w-full bg-stone-50 dark:bg-stone-950 text-charcoal dark:text-stone-200 border border-stone-200 dark:border-stone-800 py-3 rounded-xl text-xs font-bold text-center block hover:bg-koreanRed hover:text-white hover:border-koreanRed transition-all"
                    >
                      {t('courses.details')}
                    </Link>
                  </div>
                  */}
                  
                  {/* Chân card: hiển thị số học viên bên trái và nút xem chi tiết đỏ nhạt bên phải */}
                  <div className="mt-auto pt-5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-charcoal-muted dark:text-stone-400 font-semibold">
                      <User size={14} className="text-stone-400" />
                      <span>{course.students} học viên</span>
                    </div>
                    <Link 
                      href={`/${locale}/courses`}
                      className="px-4 py-2 bg-koreanRed-light hover:bg-koreanRed text-koreanRed hover:text-white dark:bg-koreanRed/15 dark:text-red-400 dark:hover:bg-koreanRed dark:hover:text-white rounded-xl text-xs font-bold transition-all"
                    >
                      {t('courses.details')}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* OLD:
        <div className="text-center mt-14">
          <Link 
            href={`/vn/courses`}
            className="inline-flex items-center gap-2 text-koreanRed dark:text-red-400 font-bold text-sm hover:underline"
          >
            {t('courses.viewAll')}
            <ChevronRight size={16} />
          </Link>
        </div>
        */}
        <div className="text-center mt-14">
          <Link 
            href={`/${locale}/courses`}
            className="inline-flex items-center gap-2 bg-koreanRed hover:bg-koreanRed-dark text-white text-sm font-extrabold py-3.5 px-8 rounded-xl transition-all active:scale-95 shadow-md shadow-koreanRed/15"
          >
            Xem tất cả khóa học
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 3.5. Method Section (Phương pháp học) - Bổ sung mới theo thiết kế */}
      <section id="methods" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto border-t border-stone-200/40 dark:border-stone-800/60 transition-colors duration-300">
        <div className="text-center mb-16">
          <span className="text-koreanRed dark:text-red-400 block font-bold text-xs uppercase tracking-widest mb-3 font-mono">
            Phương pháp học
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-charcoal dark:text-stone-100 tracking-tight">
            Học Tiếng Hàn Hiệu Quả Hơn
          </h2>
          <p className="text-sm md:text-base text-charcoal-muted dark:text-stone-400 max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
            Kết hợp học lý thuyết, luyện tập tương tác và ôn tập thông minh để đạt kết quả tốt nhất.
          </p>
        </div>

        {/* Grid Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-150/40 dark:border-stone-800/80 shadow-soft hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/20 text-koreanRed flex items-center justify-center mb-6">
              <Play size={22} fill="currentColor" />
            </div>
            <h3 className="text-lg font-bold text-charcoal dark:text-stone-100 mb-3">
              Video Bài Giảng HD
            </h3>
            <p className="text-xs text-charcoal-muted dark:text-stone-400 leading-relaxed font-medium">
              Hơn 250 video bài giảng chất lượng cao với phụ đề song ngữ Hàn - Việt, giảng viên bản ngữ.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-150/40 dark:border-stone-800/80 shadow-soft hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
              <Layers size={22} />
            </div>
            <h3 className="text-lg font-bold text-charcoal dark:text-stone-100 mb-3">
              Flashcard Từ Vựng
            </h3>
            <p className="text-xs text-charcoal-muted dark:text-stone-400 leading-relaxed font-medium">
              Hệ thống flashcard thông minh với thuật toán Spaced Repetition giúp ghi nhớ từ vựng lâu dài.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-150/40 dark:border-stone-800/80 shadow-soft hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
              <CheckSquare size={22} />
            </div>
            <h3 className="text-lg font-bold text-charcoal dark:text-stone-100 mb-3">
              Bài Luyện Tập Tương Tác
            </h3>
            <p className="text-xs text-charcoal-muted dark:text-stone-400 leading-relaxed font-medium">
              Trắc nghiệm, điền từ, sắp xếp câu và luyện nghe với chấm điểm tự động và giải thích chi tiết.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-150/40 dark:border-stone-800/80 shadow-soft hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-6">
              <BarChart2 size={22} />
            </div>
            <h3 className="text-lg font-bold text-charcoal dark:text-stone-100 mb-3">
              Theo Dõi Tiến Độ
            </h3>
            <p className="text-xs text-charcoal-muted dark:text-stone-400 leading-relaxed font-medium">
              Dashboard cá nhân hiển thị số bài đã học, từ vựng đã thuộc và streak học tập hàng ngày.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-150/40 dark:border-stone-800/80 shadow-soft hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-6">
              <PenTool size={22} />
            </div>
            <h3 className="text-lg font-bold text-charcoal dark:text-stone-100 mb-3">
              Ghi Chú & Workspace
            </h3>
            <p className="text-xs text-charcoal-muted dark:text-stone-400 leading-relaxed font-medium">
              Tạo ghi chú nhanh trong lúc học, sắp xếp bộ sưu tập theo chủ đề với giao diện kanban.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-150/40 dark:border-stone-800/80 shadow-soft hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400 flex items-center justify-center mb-6">
              <Award size={22} />
            </div>
            <h3 className="text-lg font-bold text-charcoal dark:text-stone-100 mb-3">
              Huy Hiệu Thành Tích
            </h3>
            <p className="text-xs text-charcoal-muted dark:text-stone-400 leading-relaxed font-medium">
              Hệ thống gamification khuyến khích duy trì thói quen học tập với huy hiệu và thành tích.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Leaderboard Section */}
      <section id="leaderboard" className="py-24 px-6 md:px-12 lg:px-20 bg-warmCream/60 dark:bg-stone-900 border-t border-stone-200/40 dark:border-stone-800 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            {/* Nhãn xanh lá pastel theo ảnh thiết kế */}
            <span className="inline-flex items-center gap-1 bg-[#E2F5EC] text-[#2F9E6C] px-3.5 py-1.5 rounded-full text-xs font-bold">
              🏆 Bảng Xếp Hạng
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-charcoal dark:text-stone-100 tracking-tight leading-tight">
              Học Viên Xuất Sắc
            </h2>
            <p className="text-sm text-charcoal-muted dark:text-stone-400 leading-relaxed font-medium">
              Cùng nhau học tập và leo hạng! Điểm số được tính dựa trên bài học hoàn thành, điểm quiz và streak hàng ngày.
            </p>

            {/* Time Filter Tabs */}
            <div className="flex gap-2 p-1 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 rounded-2xl w-fit">
              <button 
                onClick={() => setLeaderboardTab('WEEK')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  leaderboardTab === 'WEEK' 
                    ? 'bg-koreanRed text-white shadow-sm' 
                    : 'text-charcoal-muted dark:text-stone-400 hover:text-charcoal'
                }`}
              >
                Tuần
              </button>
              <button 
                onClick={() => setLeaderboardTab('MONTH')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  leaderboardTab === 'MONTH' 
                    ? 'bg-koreanRed text-white shadow-sm' 
                    : 'text-charcoal-muted dark:text-stone-400 hover:text-charcoal'
                }`}
              >
                Tháng
              </button>
              <button 
                onClick={() => setLeaderboardTab('ALLTIME')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  leaderboardTab === 'ALLTIME' 
                    ? 'bg-koreanRed text-white shadow-sm' 
                    : 'text-charcoal-muted dark:text-stone-400 hover:text-charcoal'
                }`}
              >
                Mọi lúc
              </button>
            </div>
          </div>

          {/* Thiết kế lại góc phải thành dạng Podium Top 3 hoành tráng */}
          <div className="lg:col-span-7">
            {/* OLD:
            <div className="bg-white dark:bg-stone-950 rounded-3xl border border-stone-200/50 dark:border-stone-800/80 shadow-2xl p-6 md:p-8 space-y-4">
              {leaderboardData.map((user, idx) => (
                <div key={user.rank} ...>
              ))}
            </div>
            */}
            {(() => {
              // Nhân hệ số điểm tương ứng để tạo sự thay đổi sinh động khi chuyển tab
              const factor = leaderboardTab === 'WEEK' ? 1 : leaderboardTab === 'MONTH' ? 4 : 12;
              const currentLeaderboard = leaderboardData.map(u => ({
                ...u,
                score: u.score * factor
              }));
              
              const top1 = currentLeaderboard.find(u => u.rank === 1)!;
              const top2 = currentLeaderboard.find(u => u.rank === 2)!;
              const top3 = currentLeaderboard.find(u => u.rank === 3)!;

              return (
                <div className="flex flex-row items-end justify-center gap-4 sm:gap-6 pt-10 pb-6 w-full">
                  {/* Top 2 - Nằm bên trái */}
                  <div className="flex-1 max-w-[190px] flex flex-col items-center">
                    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-150/40 dark:border-stone-800/80 shadow-soft p-5 w-full flex flex-col items-center text-center transform hover:-translate-y-1 transition-all duration-300">
                      {/* Avatar container */}
                      <div className="relative mb-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-stone-100 dark:border-stone-800">
                          <Image src={top2.avatar} alt={top2.name} fill className="object-cover" />
                        </div>
                        {/* Huy hiệu số 2 màu cam ở góc */}
                        <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-orange-400 text-white font-extrabold text-xs flex items-center justify-center border-2 border-white dark:border-stone-900">
                          2
                        </span>
                      </div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-charcoal dark:text-stone-100 truncate w-full">{top2.name}</h4>
                      <span className="text-[9px] text-charcoal-muted dark:text-stone-500 font-bold mt-1 block">{top2.level}</span>
                      
                      {/* Điểm ngọn lửa màu xanh lá cây theo ảnh thiết kế */}
                      <div className="mt-4 flex items-center gap-1 bg-[#E2F5EC] dark:bg-emerald-950/20 text-[#2F9E6C] px-3 py-1 rounded-xl w-fit">
                        <Flame size={12} className="fill-current text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xs font-extrabold">{top2.score} điểm</span>
                      </div>
                    </div>
                  </div>

                  {/* Top 1 - Nằm ở giữa, cao hơn và có viền xanh lá */}
                  <div className="flex-1 max-w-[210px] flex flex-col items-center">
                    <div className="bg-white dark:bg-stone-900 rounded-2xl border-2 border-[#2F9E6C] shadow-soft-lg p-6 w-full flex flex-col items-center text-center transform hover:-translate-y-1.5 transition-all duration-300 min-h-[260px] justify-center relative">
                      {/* Ribbon / Crown placeholder */}
                      <span className="absolute -top-3.5 bg-[#2F9E6C] text-white text-[9px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-10">
                        Quán Quân
                      </span>
                      {/* Avatar container */}
                      <div className="relative mb-4">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#2F9E6C]">
                          <Image src={top1.avatar} alt={top1.name} fill className="object-cover" />
                        </div>
                        {/* Huy hiệu số 1 màu xanh lá ở góc */}
                        <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#2F9E6C] text-white font-extrabold text-xs flex items-center justify-center border-2 border-white dark:border-stone-900">
                          1
                        </span>
                      </div>
                      <h4 className="font-extrabold text-sm sm:text-base text-charcoal dark:text-stone-100 truncate w-full">{top1.name}</h4>
                      <span className="text-[10px] text-charcoal-muted dark:text-stone-500 font-bold mt-1 block">{top1.level}</span>
                      
                      {/* Điểm ngọn lửa màu xanh lá cây */}
                      <div className="mt-4 flex items-center gap-1 bg-[#E2F5EC] dark:bg-emerald-950/20 text-[#2F9E6C] px-3.5 py-1.5 rounded-xl w-fit">
                        <Flame size={14} className="fill-current text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xs font-extrabold">{top1.score} điểm</span>
                      </div>
                    </div>
                  </div>

                  {/* Top 3 - Nằm bên phải */}
                  <div className="flex-1 max-w-[190px] flex flex-col items-center">
                    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-150/40 dark:border-stone-800/80 shadow-soft p-5 w-full flex flex-col items-center text-center transform hover:-translate-y-1 transition-all duration-300">
                      {/* Avatar container */}
                      <div className="relative mb-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-stone-100 dark:border-stone-800">
                          <Image src={top3.avatar} alt={top3.name} fill className="object-cover" />
                        </div>
                        {/* Huy hiệu số 3 màu đỏ ở góc */}
                        <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white font-extrabold text-xs flex items-center justify-center border-2 border-white dark:border-stone-900">
                          3
                        </span>
                      </div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-charcoal dark:text-stone-100 truncate w-full">{top3.name}</h4>
                      <span className="text-[9px] text-charcoal-muted dark:text-stone-500 font-bold mt-1 block">{top3.level}</span>
                      
                      {/* Điểm ngọn lửa màu xanh lá cây */}
                      <div className="mt-4 flex items-center gap-1 bg-[#E2F5EC] dark:bg-emerald-950/20 text-[#2F9E6C] px-3 py-1 rounded-xl w-fit">
                        <Flame size={12} className="fill-current text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xs font-extrabold">{top3.score} điểm</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 md:px-12 lg:px-20 bg-white dark:bg-stone-900 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-koreanRed dark:text-red-400 block font-bold text-xs uppercase tracking-widest mb-3 font-mono">
              {t('testimonials.eyebrow')}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-charcoal dark:text-stone-100 tracking-tight">
              {t('testimonials.title')}
            </h2>
            <p className="text-sm text-charcoal-muted dark:text-stone-400 max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
              {t('testimonials.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials(t).map((item, idx) => (
              <div key={idx} className="card-soft flex flex-col justify-between h-full bg-white dark:bg-stone-950 border border-stone-150/40 dark:border-stone-800/80 p-8 shadow-soft">
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-amber-400 mb-6">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <p className="text-xs md:text-sm text-charcoal-muted dark:text-stone-300 leading-relaxed font-semibold italic">
                    "{item.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3.5 mt-8 border-t border-stone-100 dark:border-stone-800/80 pt-5">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-charcoal dark:text-stone-100">{item.name}</h4>
                    <span className="text-[10px] text-koreanRed dark:text-red-400 font-bold mt-0.5 block">{item.course}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="bg-koreanRed py-20 px-6 md:px-12 lg:px-20 text-white text-center relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter leading-tight mb-5">
            {t('cta.title')}
          </h2>
          <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-2xl mb-8 font-medium">
            {t('cta.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mb-6">
            <button 
              onClick={() => openAuthModal('REGISTER')}
              className="bg-white text-koreanRed border border-white hover:bg-warmCream text-sm font-extrabold py-4 px-10 rounded-xl transition-all active:scale-95"
            >
              {t('cta.register')}
            </button>
            <Link 
              href={`/vn/courses`}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-extrabold py-4 px-10 rounded-xl transition-all active:scale-95 block text-center"
            >
              {t('cta.browse')}
            </Link>
          </div>
          <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">
            {t('cta.subText')}
          </span>
        </div>
      </section>

      {/* 7. Scroll Top Button (Chat Popup Bubble handled by FloatingActionHub) */}
      {/* OLD:
      {showScrollTop && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
          <button 
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-charcoal dark:bg-stone-850 text-white hover:bg-koreanRed dark:hover:bg-red-500 flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 animate-in fade-in zoom-in-50"
            title="Quay lại đầu trang"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      )}
      */}

      {/* 8. AI Chat Floating Bubble & Popup (Tích hợp cục bộ) */}
      {/* OLD:
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button 
          onClick={() => setShowChatPopup(!showChatPopup)}
          className="w-14 h-14 rounded-full bg-koreanRed text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse-glow"
          title="Trợ lý AI tiếng Hàn"
        >
          {showChatPopup ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>

      {showChatPopup && (
        <div className="fixed bottom-24 right-6 w-[360px] h-[480px] bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl z-40 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
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
              className="px-4 bg-koreanRed text-white rounded-xl text-sm font-semibold hover:bg-koreanRed/90 active:scale-95 transition-all"
            >
              {t('ai.send')}
            </button>
          </form>
        </div>
      )}
      */}

      {/* 9. Authentication & Registration Modal Popup */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-100 dark:border-stone-800 p-8 flex flex-col animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-charcoal dark:hover:text-stone-150 p-1"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-extrabold text-charcoal dark:text-stone-100">
                {authMode === 'REGISTER' ? t('auth.registerTitle') : t('auth.loginTitle')}
              </h3>
              <p className="text-xs text-charcoal-muted dark:text-stone-400 mt-2">
                {authMode === 'REGISTER' ? t('auth.registerDesc') : t('auth.loginDesc')}
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setShowAuthModal(false); alert('Mockup Submit!'); }} className="flex flex-col gap-4">
              {authMode === 'REGISTER' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-charcoal dark:text-stone-300 uppercase tracking-wider">{t('auth.fullName')}</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-3.5 text-stone-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="Nguyễn Văn A" 
                      className="w-full pl-11 pr-4 py-3 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:border-koreanRed dark:bg-stone-950 dark:text-white"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-charcoal dark:text-stone-300 uppercase tracking-wider">{t('auth.email')}</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-3.5 text-stone-400" />
                  <input 
                    type="email" 
                    required
                    placeholder="email@example.com" 
                    className="w-full pl-11 pr-4 py-3 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:border-koreanRed dark:bg-stone-950 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-charcoal dark:text-stone-300 uppercase tracking-wider">{t('auth.password')}</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-3.5 text-stone-400" />
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••" 
                    className="w-full pl-11 pr-4 py-3 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:border-koreanRed dark:bg-stone-950 dark:text-white"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full btn-primary py-3.5 text-sm font-bold mt-4 shadow-lg shadow-koreanRed/15 active:scale-95"
              >
                {authMode === 'REGISTER' ? t('auth.submitRegister') : t('auth.submitLogin')}
              </button>
            </form>

            <div className="text-center mt-6">
              <span className="text-xs text-charcoal-muted dark:text-stone-400">
                {authMode === 'REGISTER' ? t('auth.hasAccount') : t('auth.noAccount')}
                <button 
                  onClick={() => setAuthMode(authMode === 'REGISTER' ? 'LOGIN' : 'REGISTER')}
                  className="text-koreanRed dark:text-red-400 font-bold hover:underline ml-1.5 focus:outline-none"
                >
                  {authMode === 'REGISTER' ? t('auth.loginNow') : t('auth.registerNow')}
                </button>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 10. Promo Modal Popup (Scroll 50% Triggered) */}
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

            {/* Icon/Badge nổi bật */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-koreanRed/10 text-koreanRed dark:bg-red-500/10 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
              {t('promo.badge')}
            </div>

            <h3 className="text-2xl font-extrabold text-charcoal dark:text-stone-100 leading-tight">
              {t('promo.title')}
            </h3>
            
            <p className="text-sm text-charcoal-muted dark:text-stone-400 mt-4 mb-8 leading-relaxed font-medium">
              {t('promo.desc')}
            </p>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setShowPromoPopup(false);
                  openAuthModal('REGISTER');
                }}
                className="w-full py-4 bg-koreanRed hover:bg-koreanRed-dark text-white rounded-xl text-base font-bold shadow-lg shadow-koreanRed/20 active:scale-95 transition-all"
              >
                {t('promo.btn')}
              </button>
              <button 
                onClick={() => setShowPromoPopup(false)}
                className="w-full py-3 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-charcoal dark:text-stone-300 rounded-xl text-sm font-semibold transition-all"
              >
                {t('promo.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

/**
 * Tạo dữ liệu mock các khóa học
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
