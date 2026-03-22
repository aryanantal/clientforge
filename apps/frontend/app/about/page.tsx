import AboutHero from "../modules/about/AboutHero";
import AboutPullQuote from "../modules/about/AboutPullQuote";
import AboutStory from "../modules/about/AboutStory";
import AboutSkills from "../modules/about/AboutSkills";
import AboutNumbers from "../modules/about/AboutNumbers";
import AboutCTA from "../modules/about/AboutCTA";

export default function About() {
  return (
    <div className="w-full bg-background">
      <AboutHero />
      <AboutPullQuote />
      <AboutStory />
      <AboutSkills />
      <AboutNumbers />
      <AboutCTA />
    </div>
  );
}
