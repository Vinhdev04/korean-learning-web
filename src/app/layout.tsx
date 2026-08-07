import type { Metadata } from 'next';
import Script from 'next/script';
import { SidebarProvider } from '@/core/context/SidebarContext';
import { ThemeProvider } from '@/core/context/ThemeContext';
import ClientToast from '@/components/common/ClientToast';
import './globals.css';

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
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NF82T1TMFG"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NF82T1TMFG');
          `}
        </Script>
        
        {/* Additional Google tag (gtag.js) - partner@email.chips.vn */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18032161534"
          strategy="afterInteractive"
        />
        <Script id="gtag-init-aw" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18032161534');
          `}
        </Script>
      </head>
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
