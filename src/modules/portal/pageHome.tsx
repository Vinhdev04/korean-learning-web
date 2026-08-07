'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { X, Lock, Mail, User } from 'lucide-react';

// Import các sub-component trang chủ (Clean Architecture)
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturedCourses from './components/FeaturedCourses';
import MethodSection from './components/MethodSection';
import LeaderboardPodium from './components/LeaderboardPodium';
import TestimonialsSection from './components/TestimonialsSection';
import CtaSection from './components/CtaSection';

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

// Bộ từ điển dịch thuật đa ngôn ngữ dùng cho trang chủ
const TRANSLATIONS = {
  vi: {
    hero: {
      eyebrow: 'ỨNG DỤNG HỌC TIẾNG HÀN TRỰC TUYẾN',
      title: 'Tự Học Tiếng Hàn',
      subtitle: 'Từ Sơ Cấp Đến TOPIK II',
      desc: 'Nền tảng giúp bạn học tiếng Hàn trực tuyến toàn diện thông qua video bài giảng chi tiết, hệ thống luyện tập tương tác đa dạng và flashcard từ vựng thông minh.',
      startBtn: 'Bắt đầu học ngay',
      browseBtn: 'Tìm hiểu khóa học',
      checkFree: 'Học thử miễn phí',
      checkVideo: 'Bài giảng HD',
      checkPractice: 'Luyện tập tương tác',
      checkProgress: 'Theo dõi tiến trình',
    },
    stats: {
      students: 'Học viên tin tưởng',
      videos: 'Video bài giảng HD',
      flashcards: 'Flashcard từ vựng',
      satisfaction: 'Tỷ lệ hài lòng',
    },
    courses: {
      eyebrow: 'KHÓA HỌC NỔI BẬT',
      title: 'Lựa Chọn Lộ Trình Phù Hợp',
      desc: 'Bắt đầu từ bảng chữ cái Hangeul hoặc bứt phá điểm số TOPIK II với giáo trình được biên soạn trực quan, khoa học dành cho mọi cấp độ.',
      all: 'Tất cả',
      topik1: 'TOPIK I',
      topik2: 'TOPIK II',
      weeks: 'Tuần',
      lessons: 'Bài học',
      details: 'Xem chi tiết',
      viewAll: 'Xem tất cả khóa học',
      c1_title: 'Tiếng Hàn Sơ Cấp 1',
      c1_desc: 'Khóa học cơ bản cho người mới bắt đầu. Làm quen với bảng chữ cái Hangeul, cách phát âm chuẩn và các cấu trúc giao tiếp cơ bản nhất.',
      c2_title: 'Tiếng Hàn Sơ Cấp 2',
      c2_desc: 'Nâng cao vốn từ vựng và củng cố ngữ pháp căn bản. Phát triển kỹ năng nghe - nói qua các chủ đề giao tiếp đời sống hàng ngày.',
      c3_title: 'Tiếng Hàn Trung Cấp 3',
      c3_desc: 'Bứt phá lên trình độ trung cấp. Luyện tập các cấu trúc ngữ pháp phức tạp và vốn từ vựng chuyên sâu phục vụ học tập, làm việc.',
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
      eyebrow: 'CẢM NHẬN HỌC VIÊN',
      title: 'Học Viên Nói Gì Về Chúng Tôi',
      desc: 'Hàng ngàn học viên đã đạt mục tiêu TOPIK và giao tiếp trôi chảy nhờ lộ trình tự học thông minh.',
      t1_course: 'Tiếng Hàn Sơ Cấp 1 (TOPIK I)',
      t1_text: 'Từ một người hoàn toàn chưa biết gì, sau 3 tháng mình đã có thể tự tin ghép chữ, đọc và giao tiếp cơ bản với bạn bè người Hàn.',
      t2_course: 'Tiếng Hàn Trung Cấp 3 (TOPIK II)',
      t2_text: 'Hệ thống Flashcard ghi nhớ từ vựng quá đỉnh! Nhờ phương pháp Spaced Repetition mình đã nhớ được hơn 1.000 từ vựng chỉ sau 2 tháng.',
      t3_course: 'Luyện thi TOPIK II Cấp 4',
      t3_text: 'Đề thi thử phong phú sát thực tế, hệ thống tự chấm điểm viết rất chi tiết giúp mình tự tin đạt TOPIK 4 ngay lần thi đầu tiên.',
    },
    cta: {
      title: 'Bắt Đầu Hành Trình Học Tiếng Hàn Ngay Hôm Nay',
      desc: 'Đăng ký tài khoản miễn phí để truy cập 250+ video bài giảng, hàng ngàn flashcard từ vựng và lộ trình học tập cá nhân hóa 100%. Không cần thẻ tín dụng.',
      register: 'Đăng ký miễn phí',
      browse: 'Xem khóa học',
      subText: 'Hơn 8,900+ học viên đang tham gia · 100% Miễn phí học thử · Hủy bất kỳ lúc nào',
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

  // Lắng nghe scroll để hiển thị popup 50%
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
        window.removeEventListener('scroll', handleScrollForPopup);
      }
    };

    const hasShownPopup = sessionStorage.getItem('has-shown-scroll-popup');
    if (!hasShownPopup) {
      window.addEventListener('scroll', handleScrollForPopup);
    }

    return () => window.removeEventListener('scroll', handleScrollForPopup);
  }, []);

  const openAuthModal = (mode: 'LOGIN' | 'REGISTER') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <main className="flex-grow font-sans bg-warmCream dark:bg-stone-950 transition-colors duration-300 selection:bg-koreanRed-light selection:text-koreanRed overflow-x-hidden">
      
      {/* 1. Hero Banner Section */}
      <HeroSection t={t} openAuthModal={openAuthModal} />

      {/* 2. Stats Section */}
      <StatsSection t={t} />

      {/* 3. Featured Courses Section */}
      <FeaturedCourses 
        t={t} 
        locale={params?.locale === 'en' ? 'en' : 'vn'} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        filteredCourses={filteredCourses} 
      />

      {/* 4. Method Section */}
      <MethodSection locale={params?.locale === 'en' ? 'en' : 'vn'} />

      {/* 5. Leaderboard Section */}
      <LeaderboardPodium 
        leaderboardTab={leaderboardTab} 
        setLeaderboardTab={setLeaderboardTab} 
        leaderboardData={leaderboardData} 
      />

      {/* 6. Testimonials Section */}
      <TestimonialsSection t={t} testimonialsData={testimonials(t)} />

      {/* 7. CTA Section */}
      <CtaSection 
        t={t} 
        locale={params?.locale === 'en' ? 'en' : 'vn'} 
        openAuthModal={openAuthModal} 
      />

      {/* 9. Auth Modal Popup */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-100 dark:border-stone-800 p-8 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-charcoal dark:hover:text-stone-150 p-1"
              aria-label="Đóng modal"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-extrabold text-charcoal dark:text-stone-100">
                {authMode === 'REGISTER' ? t('auth.titleRegister') : t('auth.titleLogin')}
              </h3>
              <p className="text-xs text-charcoal-muted dark:text-stone-400 mt-2 font-medium">
                {authMode === 'REGISTER' ? t('auth.descRegister') : t('auth.descLogin')}
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setShowAuthModal(false); }} className="space-y-4">
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
