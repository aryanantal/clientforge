import { Badge, GraduationCap } from "lucide-react";

export default function ResumeEducation() {

      const education = [
    {
      period: "2017 - 2021",
      degree: "Bachelor of Engineering (Electrical & Electronics)",
      institution: "Bikaner Technical University",
      location: "Bikaner, India",
      details: "Focus on digital systems, programming, and automation",
    },
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Education</h2>
          </div>

          {education.map((edu, index) => (
            <div key={index} className="p-6 md:p-8 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
              <div className="flex md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-primary">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.location}</p>
                </div>

                                  <div
                      className="border border-primary text-foreground p-1 rounded-sm h-max hover:bg-accent hover:text-accent-foreground"
                    >{edu.period}</div>
              </div>

              <p className="text-muted-foreground">{edu.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
