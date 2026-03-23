import { Mail, Linkedin, Github, Download } from "lucide-react";
import { ROUTES } from "../../../../shared/constants/routes";
import Link from "next/link";

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

interface ResumeHeroProps {
  profile: Profile;
}

export default function ResumeHero({ profile }: ResumeHeroProps) {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-background via-muted to-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              {profile.title}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {profile.contactInfo?.email && (
                <a href={`mailto:${profile.contactInfo.email}`} className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  {profile.contactInfo.email}
                </a>
              )}

              {profile.contactInfo?.linkedin && (
                <a href={profile.contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              )}

              {profile.contactInfo?.github && (
                <a href={profile.contactInfo.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              )}
            </div>

             <Link href={ROUTES.CONTACT} className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-black text-base hover:bg-accent hover:text-foreground transition-all"
>
              <Download className="mr-2 w-4 h-4" />
              Download PDF Resume
            </Link>
          </div>

          <div className="p-6 md:p-8 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
            <p className="text-muted-foreground leading-relaxed">
              {profile.summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
