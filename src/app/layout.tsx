import type { Metadata } from 'next';
import Script from 'next/script';
import { SidebarProvider } from '@/core/context/SidebarContext';
import { ThemeProvider } from '@/core/context/ThemeContext';
import ClientToast from '@/components/common/ClientToast';
import './globals.css';

/*
export const metadata: Metadata = {
  title: 'Chips JSC - Giải pháp chuyển đổi số',
  description: 'Công ty cổ phần phần mềm Chips - Cung cấp giải pháp phần mềm, ERP, Mobile App chuyên nghiệp.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};
*/

export const metadata: Metadata = {
  title: 'Website Học Tiếng Hàn Trực Tuyến - Luyện thi TOPIK',
  description: 'Nền tảng tự học tiếng Hàn trực tuyến toàn diện, học lý thuyết bài bản, xem video bài giảng chi tiết và luyện tập tương tác (Quiz, Flashcards Leitner).',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        
      <body suppressHydrationWarning className="font-outfit bg-slate-50 text-slate-900 antialiased">
        <ThemeProvider>
          <SidebarProvider>
            {children}
            <ClientToast />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
