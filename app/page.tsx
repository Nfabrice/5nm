import { AvailabilityDrawer } from "@/components/booking/AvailabilityDrawer";
import { Providers } from "@/components/Providers";
import { ApartmentShowcase } from "@/components/site/ApartmentShowcase";
import { BookingSection } from "@/components/site/BookingSection";
import { CtaFooter } from "@/components/site/CtaFooter";
import { FeaturedApartments } from "@/components/site/FeaturedApartments";
import { Hero } from "@/components/site/Hero";
import { KigaliSection } from "@/components/site/KigaliSection";
import { Navbar } from "@/components/site/Navbar";
import { WhySection } from "@/components/site/WhySection";

export default function Home() {
  return (
    <Providers>
      <Navbar />
      <main>
        <Hero />
        <FeaturedApartments />
        <ApartmentShowcase />
        <BookingSection />
        <WhySection />
        <KigaliSection />
      </main>
      <CtaFooter />
      <AvailabilityDrawer />
    </Providers>
  );
}
