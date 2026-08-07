import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import { SidebarProvider } from '@/core/context/SidebarContext';
// OLD: import { ThemeProvider } from '@/core/context/ThemeContext';
import { ThemeProvider } from '@/core/context/ThemeContext';
import ClientToast from '@/components/common/ClientToast';
import './globals.css';

// Khởi tạo font chữ Plus Jakarta Sans với các biến trọng số cần thiết
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
});

// OLD: export const metadata: Metadata = { ... }
export const metadata: Metadata = {
  title: 'Hàn Quốc Học - Website Học Tiếng Hàn Trực Tuyến & Luyện thi TOPIK',
  description:
    'Nền tảng tự học tiếng Hàn trực tuyến toàn diện, học lý thuyết bài bản, xem video bài giảng chi tiết và luyện tập tương tác (Quiz, Flashcards Leitner). Chinh phục tiếng Hàn và chứng chỉ TOPIK dễ dàng.',
  keywords: [
    'học tiếng hàn',
    'tiếng hàn trực tuyến',
    'luyện thi topik',
    'topik i',
    'topik ii',
    'học tiếng hàn sơ cấp',
    'từ vựng tiếng hàn',
    'ngữ pháp tiếng hàn',
  ],
  authors: [{ name: 'Hàn Quốc Học' }],
  creator: 'Vinhdev',
  publisher: 'Hàn Quốc Học',
  metadataBase: new URL('https://hanquochoc.edu.vn'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hàn Quốc Học - Website Học Tiếng Hàn Trực Tuyến & Luyện thi TOPIK',
    description:
      'Tự học tiếng Hàn trực tuyến toàn diện, xem video bài giảng chi tiết và luyện tập tương tác thông minh.',
    url: 'https://hanquochoc.edu.vn',
    siteName: 'Hàn Quốc Học',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/images/korean_hero_illustration.png',
        width: 1200,
        height: 630,
        alt: 'Hàn Quốc Học Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hàn Quốc Học - Website Học Tiếng Hàn Trực Tuyến & Luyện thi TOPIK',
    description:
      'Nền tảng tự học tiếng Hàn trực tuyến toàn diện, xem video bài giảng chi tiết và luyện tập tương tác thông minh.',
    images: ['/images/korean_hero_illustration.png'],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
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
      {/* OLD: <body suppressHydrationWarning className="font-outfit bg-slate-50 text-slate-900 antialiased"> */}
      <body
        suppressHydrationWarning
        className={`${plusJakartaSans.variable} font-sans bg-slate-50 text-slate-900 antialiased`}
      >
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
