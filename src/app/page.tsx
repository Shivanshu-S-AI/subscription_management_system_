import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { Capabilities } from "@/components/landing/capabilities";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { CTASection } from "@/components/landing/cta-section";
import SmoothScrollSection from "@/components/ui/smooth-scroll";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-body selection:bg-link-soft selection:text-link-deep">
      {/* A. Navbar */}
      <Navbar />

      {/* Main Page Flow with Lenis Smooth Scrolling and Reactive Card Stacking */}
      <div className="flex-1">
        {/* B. Hero Section */}
        <Hero />

        {/* C. Interactive Smooth Scroll Card Stacking Showcase */}
        <SmoothScrollSection id="showcase" />

        {/* D. Core Capabilities */}
        <Capabilities />

        {/* E. How It Works */}
        <HowItWorks />

        {/* F. Pricing */}
        <Pricing />

        {/* G. FAQ */}
        <FAQ />

        {/* H. Final CTA */}
        <CTASection />
      </div>

      {/* I. Footer */}
      <Footer />
    </div>
  );
}
