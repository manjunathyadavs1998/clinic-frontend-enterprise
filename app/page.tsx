import { DashboardPreview } from "@/components/dashboard-preview";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Services } from "@/components/services";
import { ContactSection } from "@/components/contact-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ContactSection />
      <Services />
      {/* <DashboardPreview /> */}
      {/* <Footer /> */}
    </>
  );
}
