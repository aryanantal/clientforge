import { Award } from "lucide-react";

interface Certification {
  _id?: string;
  name: string;
  issuer?: string;
  date?: string;
  order?: number;
  isActive?: boolean;
}

interface ResumeCertificationsProps {
  certifications: Certification[];
}

// Default certifications data - only used if we want to show defaults
// But now we only show if there are certifications in the database
const defaultCertifications: string[] = [];

export default function ResumeCertifications({ certifications }: ResumeCertificationsProps) {
  // Only show if there are certifications in the database
  if (!certifications || certifications.length === 0) {
    return null;
  }

  const displayCertifications = certifications.map(c => c.name);

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Certifications & Training</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {displayCertifications.map((cert, index) => (
              <div key={index} className="p-4 hover:border-primary transition-all duration-300 bg-card text-card-foreground flex items-center gap-3 rounded-xl border">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">{cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
