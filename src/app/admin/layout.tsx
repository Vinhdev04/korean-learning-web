'use client';
import { NextIntlClientProvider } from 'next-intl';
import i18n_vi from '@/i18n/admin/vi.json';
import './admin.scss';

// OLD:
/*
import { Be_Vietnam_Pro } from 'next/font/google';
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});
...
*/



import { useSidebar } from '@/context/SidebarContext';
import AppHeader from '@/app/admin/(ui-elements)/AppHeader';
import AppSidebar from '@/app/admin/(ui-elements)/AppSidebar';
import Backdrop from '@/app/admin/(ui-elements)/Backdrop';
import React, { Suspense, useEffect } from 'react';
import useApiAuthen from '@/service/authService';
import useAxiosInterceptor from '@/hooks/useAxiosInterceptor';
import { LanguageProvider } from '@/context/LanguageContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { checkSession } = useApiAuthen();
  useAxiosInterceptor(); // kích hoạt interceptor logout
  
  useEffect(() => {
    // Chỉ check session thật nếu không phải mock token
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (token !== 'mock-admin-token') {
      checkSession();
    }
  }, []);

  const { isExpanded, isMobileOpen } = useSidebar();
  
  const mainContentMargin = isMobileOpen
    ? 'ml-0'
    : isExpanded
      ? 'lg:ml-[240px]'
      : 'lg:ml-[90px]';

  return (
    <NextIntlClientProvider
      locale="vi"
      messages={i18n_vi}
      timeZone="Asia/Ho_Chi_Minh"
      getMessageFallback={({ key }) => `${key}`}
    >
      <LanguageProvider>
        {/* OLD: <div className={`${beVietnamPro.className} dark:bg-gray-900`}> */}
        <div className="font-outfit text-slate-900 bg-slate-50 min-h-screen">
          <div className="min-h-screen xl:flex">
            <AppSidebar />
            <Backdrop />
            <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
              <AppHeader />
              <div className="mx-auto max-w-(--breakpoint-2xl) p-6 md:p-8">
                <Suspense fallback={<div className="flex h-48 items-center justify-center text-sm font-bold text-slate-500">Đang tải dữ liệu...</div>}>
                  {children}
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </LanguageProvider>
    </NextIntlClientProvider>
  );
}

