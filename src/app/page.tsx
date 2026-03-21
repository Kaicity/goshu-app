import { FAQSection } from '@/components/homepage/FAQSection';
import { FeaturesSection } from '@/components/homepage/FeaturesSection';
import { HeroSection } from '@/components/homepage/HeroSection';
import { HowItWorksSection } from '@/components/homepage/HowItWorksSection';
import { PartnersSection } from '@/components/homepage/PartnersSection';
import { PricingSection } from '@/components/homepage/PricingSection';
import { SavingsSection } from '@/components/homepage/SavingsSection';
import { TeamSection } from '@/components/homepage/TeamSection';
import { TestimonialsSection } from '@/components/homepage/TestimonialsSection';
import HomepageLayout from '@/components/layout/HomepageLayout';

const HomePage = () => {
  return (
    <HomepageLayout>
      <HeroSection />
      <FeaturesSection />
      <PartnersSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <SavingsSection />
      <TeamSection />
      <FAQSection />
    </HomepageLayout>
  );
};

export default HomePage;
