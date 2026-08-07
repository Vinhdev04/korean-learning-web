'use client';

import React, { useEffect } from 'react';
import '../styles.scss';
// import vi from '../../messages/vn.json';
// import en from '../../messages/en.json';
import vi from '@/app/messages/vn.json';
import en from '@/app/messages/en.json';

// OLD: import { Be_Vietnam_Pro } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
// import HeaderClient from '../(ui-elements)/Header';
// import Footer from '../(ui-elements)/Footer';
// import FloatingChat from '../(ui-elements)/FloatingChat';
import HeaderClient from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';
import { LanguageProvider } from '@/core/context/LanguageContext';
// FloatingChat is now included inside FloatingActionHub

// OLD: const beVietnamPro = Be_Vietnam_Pro({ ... });

const supportedLocales = ['vn', 'en'] as const;
type Locale = (typeof supportedLocales)[number];

function detectLocale(pathname: string): Locale {
  const pathLocale = pathname.split('/')[1];
  return supportedLocales.includes(pathLocale as Locale) ? (pathLocale as Locale) : 'vn';
}

const messagesMap: Record<Locale, typeof vi> = {
  vn: vi,
  en: en,
};

import FloatingActionHub from '@/components/layout/FloatingActionHub';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  const locale = detectLocale(pathname);
  const messages = messagesMap[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Auto scroll to 50% when entering the website (only on home page or initial load)
  useEffect(() => {
    const hasScrolled = sessionStorage.getItem('has-scrolled-initial');
    if (!hasScrolled && pathname.endsWith(`/${locale}`)) {
      const timer = setTimeout(() => {
        const height = document.documentElement.scrollHeight;
        window.scrollTo({
          top: height / 2,
          behavior: 'smooth',
        });
        sessionStorage.setItem('has-scrolled-initial', 'true');
      }, 1500); // Wait a bit for images to load
      return () => clearTimeout(timer);
    }
  }, [pathname, locale]);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Asia/Ho_Chi_Minh"
      getMessageFallback={({ key }) => `${key}`}
    >
      <LanguageProvider initialLanguage={locale}>
        <div
          className="font-sans bg-white dark:bg-stone-950 text-charcoal dark:text-stone-150 min-h-screen transition-colors duration-300"
          suppressHydrationWarning
        >
          <div className="bg-white dark:bg-stone-950 transition-colors duration-300">
            <HeaderClient />
            <main className={isHomePage ? '' : 'pt-20'}>{children}</main>
          </div>

          <div className="relative w-full overflow-hidden bg-warmCream dark:bg-stone-950 pb-2">
            <Footer />
          </div>

          <FloatingActionHub locale={locale} />
        </div>
      </LanguageProvider>
    </NextIntlClientProvider>
  );
}
