"use client";

import ServicesHeroSection from "../modules/services/ServicesHeroSection";
import ServicesListSection from "../modules/services/ServicesListSection";
import ServicesProcessSection from "../modules/services/ServicesProcessSection";
import ServicesFAQSection from "../modules/services/ServicesFAQSection";
import ServicesCTASection from "../modules/services/ServicesCTASection";

export default function Services() {
  return (
    <div className="w-full bg-background">
      <ServicesHeroSection />
      <ServicesListSection />
      <ServicesProcessSection />
      <ServicesFAQSection />
      <ServicesCTASection />
    </div>
  );
}