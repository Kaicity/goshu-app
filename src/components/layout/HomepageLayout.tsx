import React from 'react';
import { Header } from '../homepage/Header';
import { Footer } from '../homepage/Footer';

const HomepageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default HomepageLayout;
