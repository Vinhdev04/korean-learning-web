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
  }
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
                <h4 className="font-extrabold text-xs sm:text-sm text-charcoal dark:text-stone-100 truncate w-full">{top3.name}</h4>
                <span className="text-[9px] text-charcoal-muted dark:text-stone-500 font-bold mt-1 block">{top3.level}</span>
                
                <div className="mt-4 flex items-center gap-1 bg-[#E2F5EC] dark:bg-emerald-950/20 text-[#2F9E6C] px-3 py-1 rounded-xl w-fit">
                  <Flame size={12} className="fill-current text-emerald-600 dark:text-emerald-400" />
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
