import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gaming Pro Store - Professional Gaming Equipment',
  description: 'Professional gaming e-commerce site with the latest gaming gear, accessories, and equipment.',
  keywords: 'gaming, e-commerce, professional gaming, gaming gear, gaming accessories',
  authors: [{ name: 'Gaming Pro Store' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Gaming Pro Store - Professional Gaming Equipment',
    description: 'Professional gaming e-commerce site with the latest gaming gear, accessories, and equipment.',
    type: 'website',
    url: 'https://gaming-pro-store.com',
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gaming Pro Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gaming Pro Store - Professional Gaming Equipment',
    description: 'Professional gaming e-commerce site with the latest gaming gear, accessories, and equipment.',
    images: ['/assets/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0078D4" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
                border: '1px solid var(--toast-border)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}