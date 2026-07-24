import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DailyIntel AI - Current Affairs & Exam Intelligence',
  description: 'Clean, minimal current affairs intelligence platform for UPSC CSE, CDS, CAPF, Defence & Economy. Created by Shreshth Chaudhary.',
  keywords: ['Shreshth Chaudhary', 'DailyIntel AI', 'UPSC Current Affairs', 'CDS Exam News', 'CAPF AC', 'Defence Intelligence'],
  authors: [{ name: 'Shreshth Chaudhary', url: 'https://github.com/Shreshth-Chaudhary' }],
  creator: 'Shreshth Chaudhary',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="alternate icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="author" content="Shreshth Chaudhary" />
      </head>
      <body className="antialiased selection:bg-[#7a5c48] selection:text-white">
        {children}
      </body>
    </html>
  );
}
