// OLD:
/*
export default function HomePageClient() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-gray-50 px-4 text-center">
...
*/

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

/**
 * Component Trang chủ Client cho nền tảng Học Tiếng Hàn trực tuyến.
 * Áp dụng hệ thống thiết kế Slate & Teal học thuật, bento grids, typography Outfit cao cấp.
 */
export default function HomePageClient() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-outfit">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden px-4 pt-12 pb-20 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Hero Content (Left) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 border border-teal-200">
              <Sparkles size={12} className="animate-pulse" />
              Nền tảng thế hệ mới
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl leading-[1.1]">
              Chinh phục tiếng Hàn <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                từ con số 0
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-[50ch]">
              Lộ trình học bài bản qua video chi tiết, luyện tập trắc nghiệm tương tác và ôn tập từ vựng thông minh.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/vn/register"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-slate-950/10 hover:bg-teal-600 hover:shadow-teal-600/10 transition-all duration-300 active:scale-98"
              >
                Bắt đầu học ngay
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/vn/courses"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all duration-300 active:scale-98"
              >
                Khám phá khóa học
              </Link>
            </div>
          </div>

          {/* Hero Illustration (Right) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 shadow-2xl shadow-slate-900/5 border border-slate-200/60 p-1 group">
              <Image 
                src="/korean_hero_illustration.png"
                alt="Học tiếng Hàn trực tuyến"
                fill
                priority
                sizes="(max-w-768px) 100vw, 50vw"
                className="object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. LOGO WALL (Social Proof) */}
      <section className="border-y border-slate-200 bg-slate-100/50 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
            Đồng hành cùng mục tiêu đỗ TOPIK của học viên tại các trường lớn
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-sm font-extrabold text-slate-700">SEOUL NATIONAL UNIVERSITY</div>
            <div className="text-sm font-extrabold text-slate-700">YONSEI UNIVERSITY</div>
            <div className="text-sm font-extrabold text-slate-700">KOREA UNIVERSITY</div>
            <div className="text-sm font-extrabold text-slate-700">SOGANG UNIVERSITY</div>
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID (Core Features) */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Phương pháp học tập thông minh, toàn diện
          </h2>
          <p className="mt-4 text-slate-600">
            Tối ưu hóa thời gian và tăng cường khả năng nhớ lâu thông qua các module bổ trợ tối tân.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1: Video */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold shadow-inner">
                <PlayCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                Video bài giảng trực quan
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hệ thống video giảng dạy sinh động với phụ đề song ngữ Hàn - Việt, hỗ trợ đánh dấu chapter thông minh.
              </p>
            </div>
            <div className="mt-8 flex items-center text-teal-600 font-bold text-sm gap-1 group-hover:gap-2 transition-all">
              Học thử ngay <ChevronRight size={16} />
            </div>
          </div>

          {/* Card 2: Quiz */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold shadow-inner">
                <CheckSquare size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                Luyện tập tương tác
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hệ thống bài tập trắc nghiệm, sắp xếp câu và điền từ được chấm điểm tự động kèm giải thích chi tiết.
              </p>
            </div>
            <div className="mt-8 flex items-center text-teal-600 font-bold text-sm gap-1 group-hover:gap-2 transition-all">
              Bắt đầu luyện tập <ChevronRight size={16} />
            </div>
          </div>

          {/* Card 3: Spaced Repetition */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold shadow-inner">
                <Flame size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                Flashcard thông minh
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ứng dụng thuật toán lặp lại ngắt quãng (Spaced Repetition) giúp tối ưu hóa khả năng ghi nhớ từ vựng tiếng Hàn.
              </p>
            </div>
            <div className="mt-8 flex items-center text-teal-600 font-bold text-sm gap-1 group-hover:gap-2 transition-all">
              Xem flashcard <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. TOPIK PATHWAY */}
      <section className="py-20 bg-slate-900 text-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Lộ trình học chuẩn hóa theo TOPIK
            </h2>
            <p className="mt-4 text-slate-400">
              Định hướng học tập rõ ràng, hỗ trợ học viên đạt chứng chỉ quốc tế từ cấp 1 đến cấp 6.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Level 1-2 */}
            <div className="border border-slate-800 bg-slate-950 p-8 rounded-3xl hover:border-teal-500 transition-colors duration-300">
              <div className="text-xs font-bold text-teal-400 uppercase tracking-widest">Sơ Cấp (TOPIK I)</div>
              <h3 className="text-2xl font-bold mt-2 text-white">Cấp độ 1 & 2</h3>
              <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                Làm quen với bảng chữ cái Hangeul, học cách phát âm chuẩn Hàn. Thực hành hội thoại cơ bản đời sống: giới thiệu bản thân, đi mua sắm, gọi món ăn.
              </p>
              <ul className="mt-6 space-y-3 text-slate-400 text-xs">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-500" /> 800+ từ vựng thông dụng</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-500" /> 80 cấu trúc ngữ pháp sơ cấp</li>
              </ul>
            </div>

            {/* Level 3-4 */}
            <div className="border border-slate-800 bg-slate-950 p-8 rounded-3xl hover:border-teal-500 transition-colors duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-teal-600 text-[10px] text-white font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Phổ biến nhất
              </div>
              <div className="text-xs font-bold text-teal-400 uppercase tracking-widest">Trung Cấp (TOPIK II)</div>
              <h3 className="text-2xl font-bold mt-2 text-white">Cấp độ 3 & 4</h3>
              <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                Giao tiếp tự tin trong công việc và cuộc sống. Bắt đầu luyện kỹ năng viết luận ngắn (câu 51-54 TOPIK II), nghe hiểu các chủ đề thông dụng phức tạp hơn.
              </p>
              <ul className="mt-6 space-y-3 text-slate-400 text-xs">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-500" /> 2000+ từ vựng trung cấp</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-500" /> Kỹ năng viết luận văn án chuẩn</li>
              </ul>
            </div>

            {/* Level 5-6 */}
            <div className="border border-slate-800 bg-slate-950 p-8 rounded-3xl hover:border-teal-500 transition-colors duration-300">
              <div className="text-xs font-bold text-teal-400 uppercase tracking-widest">Cao Cấp (TOPIK II)</div>
              <h3 className="text-2xl font-bold mt-2 text-white">Cấp độ 5 & 6</h3>
              <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                Đọc hiểu sâu báo chí, phóng sự, tài liệu học thuật. Đạt năng lực nghiên cứu khoa học hoặc làm việc biên - phiên dịch chuyên nghiệp trong các doanh nghiệp Hàn.
              </p>
              <ul className="mt-6 space-y-3 text-slate-400 text-xs">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-500" /> 5000+ từ vựng cao cấp</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-500" /> Đọc hiểu xã luận, văn học Hàn Quốc</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STUDENT TESTIMONIALS */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Cảm nhận của học viên
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-slate-600 text-sm leading-relaxed italic">
              "Phương pháp lật thẻ flashcard theo thuật toán ngắt quãng giúp mình nhớ từ vựng cực kỳ nhanh. Mình vừa thi đạt TOPIK 4 chỉ sau 6 tháng học."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold">MH</div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Minh Hoàng</h4>
                <p className="text-xs text-slate-500">Đạt TOPIK 4</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-slate-600 text-sm leading-relaxed italic">
              "Các bài giảng video giải thích ngữ pháp rất dễ hiểu. Phần luyện viết câu giúp mình cải thiện điểm thi viết TOPIK đáng kể."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold">TL</div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Thúy Linh</h4>
                <p className="text-xs text-slate-500">Đạt TOPIK 3</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-slate-600 text-sm leading-relaxed italic">
              "Website thiết kế rất tinh tế và hiện đại, giúp mình tập trung cao độ khi tự học tại nhà. Giao diện mượt mà cả trên điện thoại."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold">AT</div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Anh Tuấn</h4>
                <p className="text-xs text-slate-500">Đạt TOPIK 5</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="bg-teal-600 py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Sẵn sàng chinh phục mục tiêu tiếng Hàn của bạn?
          </h2>
          <p className="text-teal-50 max-w-xl mx-auto text-base">
            Đăng ký tài khoản miễn phí ngay hôm nay và trải nghiệm các tính năng học tập tối ưu nhất.
          </p>
          <div className="pt-4">
            <Link
              href="/vn/register"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-8 py-4 text-base font-bold text-white shadow-xl hover:bg-slate-900 hover:scale-102 transition-all duration-300 active:scale-98"
            >
              Đăng ký tài khoản miễn phí
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

