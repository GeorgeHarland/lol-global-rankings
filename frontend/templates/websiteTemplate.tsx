'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';

const WebsiteTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4">
      <Navbar />
      {children}
    </div>
  );
};

export default WebsiteTemplate;
