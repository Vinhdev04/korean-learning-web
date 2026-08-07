'use client';

import React from 'react';
import Image from 'next/image';
import { Flame } from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  name: string;
  level: string;
  score: number;
  avatar: string;
}

interface LeaderboardPodiumProps {
  /** Tab hiện tại (WEEK, MONTH, ALLTIME) */
  leaderboardTab: 'WEEK' | 'MONTH' | 'ALLTIME';
  /** Hàm set active tab */
  setLeaderboardTab: (tab: 'WEEK' | 'MONTH' | 'ALLTIME') => void;
  /** Dữ liệu gốc danh sách xếp hạng */
  leaderboardData: LeaderboardUser[];
}

/**
 * Component hiển thị Bảng xếp hạng Podium Top 3 nằm ngang.
 */
export default function LeaderboardPodium({
  leaderboardTab,
  setLeaderboardTab,
  leaderboardData,
}: LeaderboardPodiumProps) {
  // Tính toán hệ số nhân điểm sinh động dựa theo tab
  const factor = leaderboardTab === 'WEEK' ? 1 : leaderboardTab === 'MONTH' ? 4 : 12;
  const currentLeaderboard = leaderboardData.map(u => ({
    ...u,
    score: u.score * factor,
  }));

  const top1 = currentLeaderboard.find(u => u.rank === 1)!;
  const top2 = currentLeaderboard.find(u => u.rank === 2)!;
  const top3 = currentLeaderboard.find(u => u.rank === 3)!;

  return (
    <section
      id="leaderboard"
      className="py-24 px-6 md:px-12 lg:px-20 bg-warmCream/60 dark:bg-stone-900 border-t border-stone-200/40 dark:border-stone-800 transition-colors duration-300"
    >
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
            Cùng nhau học tập và leo hạng! Điểm số được tính dựa trên bài học hoàn thành, điểm quiz
            và streak hàng ngày.
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

        {/* Cột hiển thị Podium 3 vị trí danh giá */}
        <div className="lg:col-span-7">
          <div className="flex flex-row items-end justify-center gap-4 sm:gap-6 pt-10 pb-6 w-full">
            {/* Top 2 - Bên trái */}
            <div className="flex-1 max-w-[190px] flex flex-col items-center">
              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-150/40 dark:border-stone-800/80 shadow-soft p-5 w-full flex flex-col items-center text-center transform hover:-translate-y-1 transition-all duration-300">
                <div className="relative mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-stone-100 dark:border-stone-800">
                    <Image src={top2.avatar} alt={top2.name} fill className="object-cover" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-orange-400 text-white font-extrabold text-xs flex items-center justify-center border-2 border-white dark:border-stone-900">
                    2
                  </span>
                </div>
                <h4 className="font-extrabold text-xs sm:text-sm text-charcoal dark:text-stone-100 truncate w-full">
                  {top2.name}
                </h4>
                <span className="text-[9px] text-charcoal-muted dark:text-stone-500 font-bold mt-1 block">
                  {top2.level}
                </span>

                <div className="mt-4 flex items-center gap-1 bg-[#E2F5EC] dark:bg-emerald-950/20 text-[#2F9E6C] px-3 py-1 rounded-xl w-fit">
                  <Flame
                    size={12}
                    className="fill-current text-emerald-600 dark:text-emerald-400"
                  />
                  <span className="text-xs font-extrabold">{top2.score} điểm</span>
                </div>
              </div>
            </div>

            {/* Top 1 - Giữa */}
            <div className="flex-1 max-w-[210px] flex flex-col items-center">
              <div className="bg-white dark:bg-stone-900 rounded-2xl border-2 border-[#2F9E6C] shadow-soft-lg p-6 w-full flex flex-col items-center text-center transform hover:-translate-y-1.5 transition-all duration-300 min-h-[260px] justify-center relative">
                <span className="absolute -top-3.5 bg-[#2F9E6C] text-white text-[9px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-10">
                  Quán Quân
                </span>
                <div className="relative mb-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#2F9E6C]">
                    <Image src={top1.avatar} alt={top1.name} fill className="object-cover" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#2F9E6C] text-white font-extrabold text-xs flex items-center justify-center border-2 border-white dark:border-stone-900">
                    1
                  </span>
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-charcoal dark:text-stone-100 truncate w-full">
                  {top1.name}
                </h4>
                <span className="text-[10px] text-charcoal-muted dark:text-stone-500 font-bold mt-1 block">
                  {top1.level}
                </span>

                <div className="mt-4 flex items-center gap-1 bg-[#E2F5EC] dark:bg-emerald-950/20 text-[#2F9E6C] px-3.5 py-1.5 rounded-xl w-fit">
                  <Flame
                    size={14}
                    className="fill-current text-emerald-600 dark:text-emerald-400"
                  />
                  <span className="text-xs font-extrabold">{top1.score} điểm</span>
                </div>
              </div>
            </div>

            {/* Top 3 - Bên phải */}
            <div className="flex-1 max-w-[190px] flex flex-col items-center">
              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-150/40 dark:border-stone-800/80 shadow-soft p-5 w-full flex flex-col items-center text-center transform hover:-translate-y-1 transition-all duration-300">
                <div className="relative mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-stone-100 dark:border-stone-800">
                    <Image src={top3.avatar} alt={top3.name} fill className="object-cover" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white font-extrabold text-xs flex items-center justify-center border-2 border-white dark:border-stone-900">
                    3
                  </span>
                </div>
                <h4 className="font-extrabold text-xs sm:text-sm text-charcoal dark:text-stone-100 truncate w-full">
                  {top3.name}
                </h4>
                <span className="text-[9px] text-charcoal-muted dark:text-stone-500 font-bold mt-1 block">
                  {top3.level}
                </span>

                <div className="mt-4 flex items-center gap-1 bg-[#E2F5EC] dark:bg-emerald-950/20 text-[#2F9E6C] px-3 py-1 rounded-xl w-fit">
                  <Flame
                    size={12}
                    className="fill-current text-emerald-600 dark:text-emerald-400"
                  />
                  <span className="text-xs font-extrabold">{top3.score} điểm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
