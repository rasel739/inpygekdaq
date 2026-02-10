import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import Navbar from '@/components/layouts/navbar';
import { ThemeSwitcher } from '@/lib/theme-switcher';
import Footer from '@/components/layouts/footer';
import { MovieProvider } from '@/lib/movie-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Movie Discovery App - Discover Your Next Favorite Movie',
    template: '%s | Movie Discovery App',
  },
  description:
    'Discover top-rated movies, explore genres, and build your personal watchlist. Powered by TMDB.',
  keywords: ['movies', 'films', 'movie discovery', 'watchlist', 'TMDB'],
  authors: [{ name: 'Movie Discovery App' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Movie Discovery App',
    title: 'Movie Discovery App - Discover Your Next Favorite Movie',
    description: 'Discover top-rated movies, explore genres, and build your personal watchlist.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movie Discovery App - Discover Your Next Favorite Movie',
    description: 'Discover top-rated movies, explore genres, and build your personal watchlist.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeSwitcher>
          <MovieProvider>
            <div className='flex min-h-screen flex-col'>
              <Navbar />
              <main className='flex-1'>{children}</main>
              <Footer />
            </div>
          </MovieProvider>
        </ThemeSwitcher>
      </body>
    </html>
  );
}
