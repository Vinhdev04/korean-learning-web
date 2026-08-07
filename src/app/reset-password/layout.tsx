'use client';

import React from 'react';
import { ThemeProvider } from '@/core/context/ThemeContext';
import { NextIntlClientProvider } from 'next-intl';
import i18n_vi from '@/i18n/admin/vi.json';
import HeaderClient from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

/**
 * Layout cho trang Quên mật khẩu, bọc HeaderClient ở trên và Footer ở dưới,
 * căn giữa nội dung form ở trung tâm màn hình.
 *
 * @param props - Các thuộc tính của layout
 * @returns React Layout hoàn chỉnh
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <NextIntlClientProvider
        locale="vi"
        messages={i18n_vi}
        timeZone="Asia/Ho_Chi_Minh"
        getMessageFallback={({ key }) => `${key}`}
      >
        <div className="font-sans bg-[#faf8f5] dark:bg-stone-950 text-charcoal dark:text-stone-150 min-h-screen flex flex-col transition-colors duration-300">
          {/* Header hiển thị cố định ở phía trên */}
          <HeaderClient />

          {/* Căn giữa form khôi phục mật khẩu ở giữa màn hình */}
          <main className="flex-grow pt-28 pb-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            {children}
          </main>

          {/* Footer hiển thị ở dưới cùng */}
          <div className="relative w-full overflow-hidden bg-warmCream dark:bg-stone-950 pb-2 border-t border-stone-200/50 dark:border-stone-850/80">
            <Footer />
          </div>
        </div>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
