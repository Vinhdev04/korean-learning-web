/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata, Viewport } from 'next';
import { safeFetch } from '@/lib/safeFetch';
import HomePageClient from '@/modules/portal/pageHome';

async function getSEO(language: number | undefined) {
  return await safeFetch(`get-seo?language=${language}`, 'get-home-seo');
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale } = await params;
  const siteTitle = 'Website Học Tiếng Hàn Trực Tuyến - Luyện thi TOPIK';
  const siteDesc = 'Nền tảng tự học tiếng Hàn trực tuyến toàn diện. Học lý thuyết bài bản, luyện tập tương tác (Quiz, Flashcards Leitner) và xem video bài giảng chi tiết.';

  return {
    title: siteTitle,
    description: siteDesc,
    openGraph: {
      title: siteTitle,
      description: siteDesc,
      url: locale === 'vn' ? '/' : `/${locale}`,
      type: 'website',
      siteName: 'Korean Learning',
      images: [
        {
          url: '/korean_hero_illustration.png',
          width: 1200,
          height: 630,
          alt: 'Korean Learning Website',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDesc,
      images: ['/korean_hero_illustration.png'],
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#0D9488', // Teal 600
};

export default function HomePage() {
  return <HomePageClient />;
}
