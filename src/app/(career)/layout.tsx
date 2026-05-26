import Banner from '@/components/layout/customer/Banner';
import Footer from '@/components/layout/customer/Footer';
import Header from '@/components/layout/customer/Header';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col max-h-screen w-full">
      {/* <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/15 via-background to-background" /> */}
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
