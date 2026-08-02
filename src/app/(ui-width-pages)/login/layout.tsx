'use client';

// OLD: import GridShape from '@/components/common/GridShape';
// OLD: import ThemeTogglerTwo from '@/components/common/ThemeTogglerTwo';
// OLD: import { ThemeProvider } from '@/context/ThemeContext';
// OLD: import { NextIntlClientProvider } from 'next-intl';
// OLD: import i18n_vi from '@/i18n/admin/vi.json';
// OLD: import Link from 'next/link';
// OLD: import React from 'react';
// OLD:
/*
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
...
*/

import React from 'react';
import Link from 'next/link';
import { ThemeProvider } from '@/context/ThemeContext';
import { NextIntlClientProvider } from 'next-intl';
import i18n_vi from '@/i18n/admin/vi.json';
import ThemeTogglerTwo from '@/components/common/ThemeTogglerTwo';
import GridShape from '@/components/common/GridShape';
import { BookOpen } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-6 bg-slate-50 z-1 sm:p-0 font-outfit">
      <ThemeProvider>
        <NextIntlClientProvider
          locale="vi"
          messages={i18n_vi}
          timeZone="Asia/Ho_Chi_Minh"
          getMessageFallback={({ key }) => `${key}`}
        >
          <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col sm:p-0 bg-slate-50">
            
            {/* Left side panel for brand introduction */}
            <div className="lg:w-1/2 w-full h-full bg-slate-900 lg:grid items-center hidden relative overflow-hidden">
              {/* Decorative shapes */}
              <div className="absolute inset-0 opacity-10">
                <GridShape />
              </div>
              
              <div className="relative items-center justify-center flex z-1 px-8 text-center">
                <div className="flex flex-col items-center max-w-md space-y-6">
                  
                  {/* Edu Icon */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-xl shadow-teal-600/20 animate-pulse">
                    <BookOpen size={32} />
                  </div>

                  <div className="space-y-3">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                      KOREAN LEARNING
                    </h1>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                      Nền tảng học tiếng Hàn thông minh thế hệ mới. Học lý thuyết bài bản, ôn tập flashcard Leitner và video bài giảng chi tiết.
                    </p>
                  </div>

                  <div className="pt-8 border-t border-slate-800 w-full text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} KOREAN LEARNING. All rights reserved.</p>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Right side login form */}
            {children}

            <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
              <ThemeTogglerTwo />
            </div>
          </div>
        </NextIntlClientProvider>
      </ThemeProvider>
    </div>
  );
}