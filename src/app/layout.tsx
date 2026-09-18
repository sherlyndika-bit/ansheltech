import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="id" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#080c14] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
