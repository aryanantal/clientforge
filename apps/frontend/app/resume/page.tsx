import ResumeHero from "../modules/resume/ResumeHero";
import ResumeExperience from "../modules/resume/ResumeExperience";
import ResumeEducation from "../modules/resume/ResumeEducation";
import ResumeSkills from "../modules/resume/ResumeSkills";
import ResumeCTA from "../modules/resume/ResumeCTA";

export const metadata = {
  title: "Resume | Aryan Antal",
  description: "View my professional resume and work experience",
};

export default function Resume() {
  return (
    <div className="w-full bg-background">
      <ResumeHero />
      <ResumeExperience />
      <ResumeEducation />
      <ResumeSkills />
      <ResumeCTA />
    </div>
  );
}
