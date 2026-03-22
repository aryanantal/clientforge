import { Mail, Linkedin, Github, Download } from "lucide-react";
import { ROUTES } from "../../../../shared/constants/routes";
import Link from "next/link";

export default function HeaderSection() {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-background via-muted to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Arjun Kumar
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              Full Stack Engineer & HubSpot Specialist
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a href="mailto:hello@arjun.dev" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                hello@arjun.dev
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>

              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
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
              Results-driven Full Stack Engineer with 3+ years of experience...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}