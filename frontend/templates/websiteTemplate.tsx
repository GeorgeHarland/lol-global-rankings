'use client';

import Link from 'next/link';

const WebsiteTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto p-4">
      <Link href="/">
        <p className="text-2xl font-bold hover:text-gray-400">Red Buff</p>
      </Link>
      <br />
      <hr />
      <br />
      {children}
    </div>
  );
};

export default WebsiteTemplate;
