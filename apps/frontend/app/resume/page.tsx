"use client";

import { useEffect, useState } from "react";
import { API } from "@/../shared/constants/api";
import ResumeHero from "../modules/resume/ResumeHero";
import ResumeExperience from "../modules/resume/ResumeExperience";
import ResumeEducation from "../modules/resume/ResumeEducation";
import ResumeSkills from "../modules/resume/ResumeSkills";
import ResumeCertifications from "../modules/resume/ResumeCertifications";
import ResumeProjects from "../modules/resume/ResumeProjects";
import ResumeCTA from "../modules/resume/ResumeCTA";

interface ContactInfo {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  location?: string;
}

interface Profile {
  name: string;
  title: string;
  summary: string;
  avatar?: string;
  contactInfo: ContactInfo;
}

interface Achievement {
  description: string;
}

interface Experience {
  _id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: Achievement[];
  order: number;
  isActive: boolean;
}

interface Education {
  _id: string;
  period: string;
  degree: string;
  institution: string;
  location: string;
  details: string;
  order: number;
  isActive: boolean;
}

interface Skill {
  name: string;
}

interface SkillCategory {
  _id: string;
  category: string;
  skills: Skill[];
  order: number;
  isActive: boolean;
}

interface Certification {
  _id: string;
  name: string;
  issuer: string;
  date: string;
  order: number;
  isActive: boolean;
}

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  tags?: string[];
}

interface Resume {
  _id: string;
  profile: Profile;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  certifications: Certification[];
  featuredProjects: Project[];
}

// Default data in case API is not available
const defaultResume: Resume = {
  _id: "",
  profile: {
    name: "Arjun Kumar",
    title: "Full Stack Engineer & HubSpot Specialist",
    summary: "Results-driven Full Stack Engineer with 3+ years of experience in building scalable web applications.",
    contactInfo: {
      email: "hello@arjun.dev",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  experience: [],
  education: [],
  skills: [],
  certifications: [],
  featuredProjects: [],
};

export default function Resume() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resumeRes = await fetch(`${API.BASE_URL}${API.RESUME}`);
        const resumeData = await resumeRes.json();
        if (resumeData.success) {
          setResume(resumeData.data);
        } else {
          setResume(defaultResume);
        }
      } catch (err) {
        console.error("Error fetching resume:", err);
        setResume(defaultResume);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin border-4 border-foreground border-t-primary w-12 h-12 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background">
      <ResumeHero 
        profile={resume?.profile || defaultResume.profile} 
      />
      <ResumeExperience 
        experience={resume?.experience || []} 
      />
      <ResumeEducation 
        education={resume?.education || []} 
      />
      <ResumeSkills 
        skills={resume?.skills || []} 
      />
      {/* Use featured projects from resume, not all projects */}
      <ResumeProjects 
        projects={resume?.featuredProjects || []} 
      />
      {/* Only show certifications if there are certifications in DB */}
      {resume?.certifications && resume.certifications.length > 0 && (
        <ResumeCertifications 
          certifications={resume.certifications} 
        />
      )}
      <ResumeCTA />
    </div>
  );
}
