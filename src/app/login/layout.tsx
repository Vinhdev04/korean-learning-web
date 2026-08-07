'use client';

/*
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
...
*/

import React from 'react';
import Link from 'next/link';
import { ThemeProvider } from '@/core/context/ThemeContext';
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
