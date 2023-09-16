'use client';

const WebsiteTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto p-4">
      Navbar or something
      <br />
      {children}
    </div>
  );
};

export default WebsiteTemplate;
