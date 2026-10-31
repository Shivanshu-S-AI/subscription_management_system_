import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { Capabilities } from "@/components/landing/capabilities";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { CTASection } from "@/components/landing/cta-section";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-body selection:bg-link-soft selection:text-link-deep">
      {/* A. Navbar */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* B. Hero Section */}
        <Hero />

        {/* C. Core Capabilities */}
        <Capabilities />

        {/* D. How It Works */}
        <HowItWorks />

        {/* E. Pricing */}
        <Pricing />

        {/* F. FAQ */}
        <FAQ />

        {/* G. Final CTA */}
        <CTASection />
      </main>

      {/* H. Footer */}
      <Footer />
    </div>
  );
}

