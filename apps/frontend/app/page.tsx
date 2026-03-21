import CTASection from "./modules/home/CTASection";
import HeroSection from "./modules/home/heroSecion";
import ProcessSection from "./modules/home/processSection";
import ProjectsSection from "./modules/home/projectsSection";
import ServicesSection from "./modules/home/servicesSection";
import StatsSection from "./modules/home/statsSection";
import TestimonialsSection from "./modules/home/testimonialsSection";

export default function Home() {
  return (
    <div className="w-full bg-background">
      <HeroSection />
      <StatsSection />
      <ProjectsSection />
      <ProcessSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
