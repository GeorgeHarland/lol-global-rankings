import WebsiteTemplate from '@/templates/websiteTemplate';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Red Buff',
  description: 'Global LoL Leaderboards',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WebsiteTemplate>{children}</WebsiteTemplate>
      </body>
    </html>
  );
}
