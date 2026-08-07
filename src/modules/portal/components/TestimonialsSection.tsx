'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface TestimonialItem {
  name: string;
  course: string;
  text: string;
  avatar: string;
}

interface TestimonialsSectionProps {
  }
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
  );
}
