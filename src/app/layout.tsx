import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';

const barlow = localFont({
  src: [
    { path: './fonts/Barlow-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Barlow-Semibold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/Barlow-Extrabold.ttf', weight: '800', style: 'normal' },
  ],
  variable: '--font-barlow',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ansheltech — Portal Berita Game, Review & Guide Terkini',
  description: 'Portal berita video game terkini, ulasan mendalam dengan rating akurat, tips panduan gameplay, dan update konsol PC, PlayStation, Xbox.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${barlow.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#030e1b] text-slate-100 antialiased selection:bg-sky-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
