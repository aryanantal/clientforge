import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-accent to-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let&apos;s Work Together
          </h2>

          <p className="text-lg mb-8">
            Interested in collaborating? Let&apos;s discuss how I can help your business grow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 bg-foreground text-background font-black hover:bg-primary transition-all"
>Get in Touch</Link>

              <Link href="/projects" className="px-8 py-4 bg-muted text-foreground font-black hover:bg-secondary transition-all"

>View My Work</Link>
          </div>
        </div>
      </div>
    </section>
  );
}