import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DailyIntel AI — AI-Powered Daily Intelligence Platform for UPSC & Defence',
  description: 'Personalized Daily Intelligence Platform that automatically collects, filters, summarizes, categorizes, and delivers high-signal news relevant for UPSC CSE, CDS, CAPF, Defence, Economy, AI & Technology.',
  keywords: ['UPSC Current Affairs', 'CDS Exam News', 'CAPF AC', 'DRDO', 'ISRO', 'RBI Repo Rate', 'Daily Intelligence', 'Defence News India'],
  authors: [{ name: 'DailyIntel AI Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bloomberg-bg text-slate-100 min-h-screen font-sans antialiased bloomberg-grid selection:bg-intel-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
